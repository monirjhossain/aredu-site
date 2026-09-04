const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

const cache = new Map()
const CACHE_TTL_MS = 60_000
const DEFAULT_TIMEOUT_MS = 4000

async function request(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase()
  const cacheKey = method === 'GET' ? `${path}` : null

  if (cacheKey && cache.has(cacheKey)) {
    const hit = cache.get(cacheKey)
    if (Date.now() - hit.at < CACHE_TTL_MS) return hit.data
  }

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }

  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body,
    })

    let data = null
    const text = await response.text()
    if (text) {
      try {
        data = JSON.parse(text)
      } catch {
        data = { message: text }
      }
    }

    if (!response.ok) {
      const error = new Error((data && data.message) || `Request failed (${response.status})`)
      error.status = response.status
      error.data = data
      throw error
    }

    if (cacheKey) cache.set(cacheKey, { at: Date.now(), data })
    return data
  } finally {
    clearTimeout(timer)
  }
}

export const api = {
  get: (path, params) => {
    const qs = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
        )}`
      : ''
    return request(`${path}${qs}`)
  },
  post: (path, body) => request(path, { method: 'POST', body }),
  clearCache: () => cache.clear(),
}

export function getApiBase() {
  return API_BASE
}
