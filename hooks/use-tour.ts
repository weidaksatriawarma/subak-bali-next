"use client"

import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "subakhijau-tour-completed"

let tourRunning = false
let tourListeners: (() => void)[] = []

let cachedShouldShow: boolean | null = null
let shouldShowListeners: (() => void)[] = []

function subscribeShouldShow(listener: () => void): () => void {
  shouldShowListeners = [...shouldShowListeners, listener]
  return () => {
    shouldShowListeners = shouldShowListeners.filter((l) => l !== listener)
  }
}

function getShouldShowSnapshot(): boolean {
  if (cachedShouldShow === null) {
    cachedShouldShow = !isTourCompleted()
  }
  return cachedShouldShow
}

function getServerShouldShowSnapshot(): boolean {
  return false
}

function subscribeRunning(listener: () => void): () => void {
  tourListeners = [...tourListeners, listener]
  return () => {
    tourListeners = tourListeners.filter((l) => l !== listener)
  }
}

function getRunningSnapshot(): boolean {
  return tourRunning
}

function getServerRunningSnapshot(): boolean {
  return false
}

function setRunning(value: boolean) {
  tourRunning = value
  tourListeners.forEach((l) => l())
}

function isTourCompleted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return true
  }
}

export function useTour() {
  const isRunning = useSyncExternalStore(
    subscribeRunning,
    getRunningSnapshot,
    getServerRunningSnapshot
  )

  const shouldShowTour = useSyncExternalStore(
    subscribeShouldShow,
    getShouldShowSnapshot,
    getServerShouldShowSnapshot
  )

  const startTour = useCallback(() => {
    setRunning(true)
  }, [])

  const completeTour = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // Ignore storage errors
    }
    setRunning(false)
  }, [])

  const resetTour = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }
    setRunning(true)
  }, [])

  return {
    shouldShowTour,
    isRunning,
    startTour,
    completeTour,
    resetTour,
  }
}
