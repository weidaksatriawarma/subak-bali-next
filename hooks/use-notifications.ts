"use client"

import { useCallback, useSyncExternalStore } from "react"
import type { AppNotification } from "@/lib/notifications"

const STORAGE_KEY = "subakhijau-notifications"
const MAX_NOTIFICATIONS = 30

function getStoredNotifications(): AppNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveNotifications(notifications: AppNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  } catch {
    // Ignore storage errors
  }
}

let listeners: (() => void)[] = []
let cachedNotifications: AppNotification[] | null = null

function getSnapshot(): AppNotification[] {
  if (cachedNotifications === null) {
    cachedNotifications = getStoredNotifications()
  }
  return cachedNotifications
}

const EMPTY_ARRAY: AppNotification[] = []

function getServerSnapshot(): AppNotification[] {
  return EMPTY_ARRAY
}

function subscribe(listener: () => void): () => void {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function emitChange(next: AppNotification[]) {
  cachedNotifications = next
  saveNotifications(next)
  listeners.forEach((l) => l())
}

export function useNotifications() {
  const notifications = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const addNotification = useCallback(
    (notification: AppNotification) => {
      const next = [notification, ...notifications].slice(0, MAX_NOTIFICATIONS)
      emitChange(next)
    },
    [notifications]
  )

  const markAsRead = useCallback(
    (id: string) => {
      emitChange(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
    },
    [notifications]
  )

  const markAllAsRead = useCallback(() => {
    emitChange(notifications.map((n) => ({ ...n, read: true })))
  }, [notifications])

  const clearAll = useCallback(() => {
    emitChange([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    unreadCount,
  }
}
