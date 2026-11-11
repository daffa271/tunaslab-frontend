import { seedCatalog } from '../data/seedCatalog.js'
import { createHarvestNotification } from './notificationService.js'

export const STORAGE_KEY = 'tunaslab.harvest-demo.v1'
export const DAY_MS = 24 * 60 * 60 * 1000
const statuses = new Set(['growing', 'completed', 'finished'])
const validTimestamp = (value) => Number.isSafeInteger(value) && value > 0 && value <= 8640000000000000

export function emptyDemoState() {
  return { selectedSeedId: null, cycle: null, notifications: [] }
}

export function getSeed(id) {
  return seedCatalog.find((seed) => seed.id === id) || null
}

export function parseDemoState(raw) {
  if (!raw) return emptyDemoState()
  try {
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object' || Array.isArray(data)) return emptyDemoState()
    const selectedSeedId = getSeed(data.selectedSeedId)?.id || null
    const saved = data.cycle
    const validCycle = saved && typeof saved === 'object' && getSeed(saved.selectedSeedId)
      && Number.isInteger(saved.harvestDays) && saved.harvestDays > 0 && saved.harvestDays <= 365
      && validTimestamp(saved.startedAt)
      && validTimestamp(saved.harvestAt) && saved.harvestAt >= saved.startedAt
      && statuses.has(saved.status) && typeof saved.notificationTriggered === 'boolean'
    const cycle = validCycle ? {
      selectedSeedId: saved.selectedSeedId,
      harvestDays: saved.harvestDays,
      startedAt: saved.startedAt,
      harvestAt: saved.harvestAt,
      status: saved.status,
      notificationTriggered: saved.notificationTriggered,
    } : null
    const seenNotifications = new Set()
    const notifications = Array.isArray(data.notifications) ? data.notifications.filter((item) => {
      const valid = item && typeof item.id === 'string' && typeof item.seedName === 'string'
        && typeof item.title === 'string' && typeof item.message === 'string'
        && validTimestamp(item.triggeredAt) && !seenNotifications.has(item.id)
      if (valid) seenNotifications.add(item.id)
      return valid
    }).map(({ id, seedName, triggeredAt, title, message }) => ({ id, seedName, triggeredAt, title, message })) : []
    if (cycle?.status === 'completed' && cycle.notificationTriggered && !notifications.some((item) => item.id === `${cycle.startedAt}-${cycle.selectedSeedId}`)) cycle.notificationTriggered = false
    return { selectedSeedId: cycle?.selectedSeedId || selectedSeedId, cycle, notifications }
  } catch {
    return emptyDemoState()
  }
}

export function readDemoStorage(storage) {
  try {
    return { data: parseDemoState(storage.getItem(STORAGE_KEY)), unavailable: false }
  } catch {
    return { data: emptyDemoState(), unavailable: true }
  }
}

export function writeDemoStorage(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

export function getRemainingTime(harvestAt, now) {
  const totalSeconds = Math.ceil(Math.max(0, harvestAt - now) / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function selectSeed(state, seedId) {
  if (state.cycle || !getSeed(seedId)) return state
  return { ...state, selectedSeedId: seedId }
}

export function startCycle(state, now) {
  const seed = getSeed(state.selectedSeedId)
  if (state.cycle || !seed || !Number.isSafeInteger(now) || now <= 0) return state
  return { ...state, cycle: {
    selectedSeedId: seed.id,
    harvestDays: seed.harvestDays,
    startedAt: now,
    harvestAt: now + seed.harvestDays * DAY_MS,
    status: 'growing',
    notificationTriggered: false,
  } }
}

export function completeAtHarvest(state, now, force = false) {
  const cycle = state.cycle
  if (!cycle || cycle.status === 'finished' || (cycle.status === 'growing' && !force && now < cycle.harvestAt)) return state
  if (cycle.status === 'completed' && cycle.notificationTriggered) return state
  const seed = getSeed(cycle.selectedSeedId)
  if (!seed) return state
  const notification = createHarvestNotification(cycle, seed, now)
  const alreadyRecorded = state.notifications.some((item) => item.id === notification.id)
  return {
    ...state,
    cycle: { ...cycle, status: 'completed', notificationTriggered: true },
    notifications: alreadyRecorded ? state.notifications : [notification, ...state.notifications],
  }
}

export function finishCycle(state) {
  if (state.cycle?.status !== 'completed') return state
  return { ...state, cycle: { ...state.cycle, status: 'finished' } }
}

export function clearCycle(state) {
  return { ...state, selectedSeedId: null, cycle: null }
}
