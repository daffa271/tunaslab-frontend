import { useCallback, useEffect, useRef, useState } from 'react'
import { clearCycle, completeAtHarvest, emptyDemoState, finishCycle, getRemainingTime, getSeed, parseDemoState, readDemoStorage, selectSeed, startCycle, STORAGE_KEY, writeDemoStorage } from '../services/harvestCycleService.js'

function readStoredState() {
  if (typeof window === 'undefined') return { data: emptyDemoState(), unavailable: false }
  try {
    return readDemoStorage(window.localStorage)
  } catch {
    return { data: emptyDemoState(), unavailable: true }
  }
}

export default function useHarvestCountdown() {
  const [initial] = useState(readStoredState)
  const [data, setData] = useState(initial.data)
  const [storageUnavailable, setStorageUnavailable] = useState(initial.unavailable)
  const [now, setNow] = useState(() => Date.now())
  const dataRef = useRef(data)

  const commit = useCallback((next) => {
    if (next === dataRef.current) return
    dataRef.current = next
    setData(next)
    try {
      setStorageUnavailable(!writeDemoStorage(window.localStorage, next))
    } catch {
      setStorageUnavailable(true)
    }
  }, [])

  useEffect(() => {
    if (!data.cycle || data.cycle.status === 'finished' || (data.cycle.status === 'completed' && data.cycle.notificationTriggered)) return undefined
    function tick() {
      const currentTime = Date.now()
      setNow(currentTime)
      commit(completeAtHarvest(dataRef.current, currentTime))
    }
    const timer = window.setInterval(tick, 1000)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [data.cycle, commit])

  useEffect(() => {
    function syncFromOtherTab(event) {
      if (event.key !== STORAGE_KEY && event.key !== null) return
      const next = parseDemoState(event.newValue)
      dataRef.current = next
      setData(next)
      setNow(Date.now())
    }
    window.addEventListener('storage', syncFromOtherTab)
    return () => window.removeEventListener('storage', syncFromOtherTab)
  }, [])

  const cycle = data.cycle
  return {
    ...data,
    selectedSeed: getSeed(data.selectedSeedId),
    remaining: cycle ? getRemainingTime(cycle.harvestAt, now) : null,
    storageUnavailable,
    selectSeed: (id) => commit(selectSeed(dataRef.current, id)),
    startCycle: () => {
      const currentTime = Date.now()
      setNow(currentTime)
      commit(startCycle(dataRef.current, currentTime))
    },
    finishCycle: () => commit(finishCycle(completeAtHarvest(dataRef.current, Date.now()))),
    clearCycle: () => commit(clearCycle(dataRef.current)),
    ...(import.meta.env.DEV ? { simulateCompletion: () => commit(completeAtHarvest(dataRef.current, Date.now(), true)) } : {}),
  }
}
