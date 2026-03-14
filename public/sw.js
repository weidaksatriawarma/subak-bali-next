// IMPORTANT: Bump version on each deploy to invalidate old caches
const CACHE_NAME = "subakhijau-v3"
const STATIC_ASSETS = ["/", "/manifest.json"]
const OFFLINE_URL = "/offline.html"

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([...STATIC_ASSETS, OFFLINE_URL])
    )
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  const url = new URL(event.request.url)

  // Only cache http(s) — skip chrome-extension://, blob:, data:, etc.
  if (url.protocol !== "http:" && url.protocol !== "https:") return

  // Skip API requests from caching
  if (url.pathname.startsWith("/api/")) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          // Only cache successful, non-redirected responses
          if (response.ok && !response.redirected) {
            const clone = response.clone()
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => {
          // If navigation request fails, show offline page
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL)
          }
          return new Response("Offline", { status: 503 })
        })
      return cached || fetched
    })
  )
})
