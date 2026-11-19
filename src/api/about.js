import { api } from './client.js'
import { mergeAboutContent } from '../data/aboutDefaults.js'
import { resolveMediaUrl } from './universities.js'

const STORAGE_KEY = 'ar_about_v4'
const LEGACY_KEYS = ['ar_about_v1', 'ar_about_v2', 'ar_about_v3']
const STORAGE_TTL_MS = 10 * 60 * 1000

function clearLegacy() {
  try {
    for (const key of LEGACY_KEYS) localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

function readLocal({ allowStale = true } = {}) {
  clearLegacy()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.at || !parsed?.data) return null
    const age = Date.now() - parsed.at
    if (age > 7 * 24 * 60 * 60 * 1000) return null
    if (!allowStale && age > STORAGE_TTL_MS) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeLocal(data) {
  clearLegacy()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // ignore
  }
}

function mapMedia(path) {
  return resolveMediaUrl(path) || path || ''
}

export function mapAboutPayload(raw) {
  const about = mergeAboutContent(raw?.about || raw || {})
  about.hero.image_1 = mapMedia(about.hero.image_1)
  about.hero.image_2 = mapMedia(about.hero.image_2)
  about.hero.image_3 = mapMedia(about.hero.image_3)
  about.story.image = mapMedia(about.story.image)
  about.team.members = (about.team.members || []).map((m) => ({
    ...m,
    photo: mapMedia(m.photo),
  }))
  return about
}

export function getCachedAbout() {
  const cached = readLocal({ allowStale: true })
  return cached ? mapAboutPayload(cached) : null
}

export async function fetchAbout({ timeoutMs = 10000 } = {}) {
  // Always hit network so admin deletes are not stuck behind SWR localStorage.
  const data = await api.get('/about', undefined, { timeoutMs, swr: false })
  const raw = data?.data || {}
  writeLocal(raw)
  return mapAboutPayload(raw)
}
