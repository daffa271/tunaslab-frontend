import test from 'node:test'
import assert from 'node:assert/strict'
import { seedCatalog } from '../src/features/dashboard/data/seedCatalog.js'
import { clearCycle, completeAtHarvest, DAY_MS, emptyDemoState, finishCycle, getRemainingTime, parseDemoState, readDemoStorage, selectSeed, startCycle, writeDemoStorage } from '../src/features/dashboard/services/harvestCycleService.js'

const start = 1760000000000

test('seed selection, change before starting, and configured estimates', () => {
  let state = emptyDemoState()
  assert.deepEqual(seedCatalog.map(({ harvestDays }) => harvestDays), [12, 20, 9])
  state = selectSeed(state, 'bayam-merah')
  state = selectSeed(state, 'pakcoy')
  assert.equal(state.selectedSeedId, 'pakcoy')
  assert.equal(state.cycle, null)
  assert.equal(selectSeed(state, 'unknown'), state)
})

test('start stores the target timestamp and prevents accidental replacement', () => {
  const state = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  assert.equal(state.cycle.harvestDays, 12)
  assert.equal(state.cycle.startedAt, start)
  assert.equal(state.cycle.harvestAt, start + 12 * DAY_MS)
  assert.equal(state.cycle.status, 'growing')
  assert.equal(selectSeed(state, 'bayam-merah'), state)
  assert.equal(startCycle(state, start + 1), state)
  assert.deepEqual(getRemainingTime(state.cycle.harvestAt, start), { days: 12, hours: 0, minutes: 0, seconds: 0 })
})

test('reload uses the saved target to calculate elapsed time', () => {
  const initial = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  const restored = parseDemoState(JSON.stringify(initial))
  assert.equal(restored.selectedSeedId, 'pakcoy')
  assert.deepEqual(getRemainingTime(restored.cycle.harvestAt, start + DAY_MS + 61000), { days: 10, hours: 23, minutes: 58, seconds: 59 })
  assert.deepEqual(getRemainingTime(restored.cycle.harvestAt, restored.cycle.harvestAt + 1000), { days: 0, hours: 0, minutes: 0, seconds: 0 })
})

test('expiry creates one persisted notification and supports the next cycle', () => {
  const growing = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  assert.equal(completeAtHarvest(growing, growing.cycle.harvestAt - 1), growing)
  const completed = completeAtHarvest(growing, growing.cycle.harvestAt)
  assert.equal(completed.cycle.status, 'completed')
  assert.equal(completed.cycle.notificationTriggered, true)
  assert.equal(completed.notifications.length, 1)
  assert.match(completed.notifications[0].message, /Pakcoy/)
  const restored = parseDemoState(JSON.stringify(completed))
  assert.equal(completeAtHarvest(restored, restored.cycle.harvestAt + 1000), restored)
  assert.equal(restored.notifications.length, 1)
  const finished = finishCycle(restored)
  assert.equal(finished.cycle.status, 'finished')
  const next = startCycle(selectSeed(clearCycle(finished), 'kacang-polong'), start + 20 * DAY_MS)
  assert.equal(next.cycle.harvestDays, 9)
  assert.equal(next.notifications.length, 1)
})

test('development completion is idempotent without changing catalog durations', () => {
  const growing = startCycle(selectSeed(emptyDemoState(), 'bayam-merah'), start)
  const completed = completeAtHarvest(growing, start + 1000, true)
  assert.equal(completed.cycle.harvestDays, 20)
  assert.equal(completed.cycle.harvestAt, start + 20 * DAY_MS)
  assert.equal(completed.notifications.length, 1)
  assert.equal(completeAtHarvest(completed, start + 2000, true), completed)
})

test('missing and malformed storage cannot break the dashboard', () => {
  for (const raw of [null, '', 'not json', 'null', '[]', '{"cycle":{"status":"growing"}}']) {
    assert.deepEqual(parseDemoState(raw), emptyDemoState())
  }
  const invalidDate = { selectedSeedId: 'pakcoy', cycle: { selectedSeedId: 'pakcoy', harvestDays: 12, startedAt: 1, harvestAt: Number.MAX_SAFE_INTEGER, status: 'growing', notificationTriggered: false } }
  assert.equal(parseDemoState(JSON.stringify(invalidDate)).cycle, null)
})

test('a completed cycle repairs missing notification history on the next tick', () => {
  const growing = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  const completed = completeAtHarvest(growing, growing.cycle.harvestAt)
  const damaged = parseDemoState(JSON.stringify({ ...completed, notifications: [] }))
  assert.equal(damaged.cycle.notificationTriggered, false)
  assert.equal(completeAtHarvest(damaged, growing.cycle.harvestAt + 1000).notifications.length, 1)
})

test('duplicate notification entries in saved data are safely deduplicated', () => {
  const growing = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  const completed = completeAtHarvest(growing, growing.cycle.harvestAt)
  const restored = parseDemoState(JSON.stringify({ ...completed, notifications: [...completed.notifications, ...completed.notifications] }))
  assert.equal(restored.notifications.length, 1)
  assert.equal(restored.cycle.notificationTriggered, true)
})

test('storage saves and restores the cycle; denied access degrades safely', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const state = startCycle(selectSeed(emptyDemoState(), 'pakcoy'), start)
  assert.equal(writeDemoStorage(storage, state), true)
  assert.deepEqual(readDemoStorage(storage), { data: state, unavailable: false })
  const blocked = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('quota') } }
  assert.equal(writeDemoStorage(blocked, state), false)
  assert.deepEqual(readDemoStorage(blocked), { data: emptyDemoState(), unavailable: true })
})
