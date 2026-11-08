const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

const memory = new Map()
const MEMORY_TTL_MS = 60_000
const PERSIST_TTL_MS = 10 * 60 * 1000
const DEFAULT_TIMEOUT_MS = 12000
const STORAGE_PREFIX = 'ar_api_v1:'
const listeners = new Map()

function storageKey(path) {
  return STORAGE_PREFIX + path
}

function readPersistent(path) {
  try {
    const raw = localStorage.getItem(storageKey(path))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.at || parsed.data === undefined) return null
    if (Date.now() - parsed.at > PERSIST_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writePersistent(path, data) {
  try {
    localStorage.setItem(storageKey(path), JSON.stringify({ at: Date.now(), data }))
  } catch {
    // ignore quota / private mode
  }
}

function getCached(path) {
  const hit = memory.get(path)
  if (hit && Date.now() - hit.at < MEMORY_TTL_MS) return hit.data

  const persisted = readPersistent(path)
  if (persisted) {
    memory.set(path, { at: Date.now(), data: persisted.data })
    return persisted.data
  }
  return null
}

function setCached(path, data) {
  memory.set(path, { at: Date.now(), data })
  writePersistent(path, data)
  const set = listeners.get(path)
  if (set) {
    set.forEach((fn) => {
      try {
        fn(data)
      } catch (e) {
        console.error(e)
      }
    })
  }
}

export function subscribeApi(path, fn) {
  if (!listeners.has(path)) listeners.set(path, new Set())
  listeners.get(path).add(fn)
  return () => listeners.get(path)?.delete(fn)
}

export function peekApi(path, params) {
  const qs = params
    ? `?${new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
      )}`
    : ''
  return getCached(`${path}${qs}`)
}

async function networkRequest(path, options = {}) {
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

    return data
  } finally {
    clearTimeout(timer)
  }
}

const inflight = new Map()

async function request(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase()
  const cacheKey = method === 'GET' ? `${path}` : null
  const swr = method === 'GET' && options.swr !== false

  if (cacheKey && swr) {
    const cached = getCached(cacheKey)
    if (cached != null) {
      if (!inflight.has(cacheKey)) {
        const refresh = networkRequest(path, options)
          .then((data) => {
            setCached(cacheKey, data)
            return data
          })
          .catch((err) => {
            console.error(err)
            return cached
          })
          .finally(() => inflight.delete(cacheKey))
        inflight.set(cacheKey, refresh)
      }
      return cached
    }
  }

  if (cacheKey && inflight.has(cacheKey)) {
    return inflight.get(cacheKey)
  }

  const pending = networkRequest(path, options)
    .then((data) => {
      if (cacheKey) setCached(cacheKey, data)
      return data
    })
    .finally(() => {
      if (cacheKey) inflight.delete(cacheKey)
    })

  if (cacheKey) inflight.set(cacheKey, pending)
  return pending
}

export const api = {
  get: (path, params, options = {}) => {
    const qs = params
      ? `?${new URLSearchParams(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
        )}`
      : ''
    return request(`${path}${qs}`, options)
  },
  post: (path, body) => request(path, { method: 'POST', body, swr: false }),
  clearCache: () => {
    memory.clear()
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      // ignore
    }
  },
}

export function getApiBase() {
  return API_BASE
}

export function buildApiPath(path, params) {
  const qs = params
    ? `?${new URLSearchParams(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
      )}`
    : ''
  return `${path}${qs}`
}
