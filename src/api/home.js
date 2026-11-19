import { api } from './client.js'
import { mapPostToUniversity, resolveMediaUrl } from './universities.js'
import { mapScholarship } from './scholarships.js'
import { mapService } from './services.js'
import { mapSubject } from './majors.js'
import { mergeHomeSections } from '../data/homeSectionsDefaults.js'

const STORAGE_KEY = 'ar_home_bootstrap_v3'
const STORAGE_TTL_MS = 5 * 60 * 1000
const STALE_MAX_MS = 7 * 24 * 60 * 60 * 1000

function readLocal({ allowStale = true } = {}) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.at || !parsed?.data) return null
    const age = Date.now() - parsed.at
    if (age > STALE_MAX_MS) return null
    if (!allowStale && age > STORAGE_TTL_MS) return null
    return parsed.data
  } catch {
    return null
  }
}

function writeLocal(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // ignore quota / private mode
  }
}

function plainText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function mapHomePayload(raw) {
  const data = raw || {}
  const universities = (data.universities || [])
    .map((row, i) => mapPostToUniversity(row, i))
    .filter(Boolean)

  const cities = (data.cities || []).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    region: row.region || '',
    uniCount: row.uni_count ?? row.universities ?? 0,
    universities: row.universities ?? row.uni_count ?? 0,
    image: row.image || null,
  }))

  const scholarships = (data.scholarships || []).map(mapScholarship).filter(Boolean)
  const services = (data.services || []).map(mapService).filter(Boolean)
  const majors = (data.majors || []).map(mapSubject).filter(Boolean)

  const successPhotos = (data.success_photos || [])
    .map((post) => {
      const image = resolveMediaUrl(post.image_url || post.image)
      if (!image) return null
      return {
        id: post.id,
        title: post.post_title || 'Success story',
        place: plainText(post.post_excerpt) || post.categories?.[0]?.name || '',
        image,
      }
    })
    .filter(Boolean)

  const videos = (data.videos || [])
    .map((row) => ({
      id: row.id,
      title: row.title || 'Video',
      tag: row.tag || 'Video',
    }))
    .filter((row) => row.id)

  return {
    settings: data.settings || null,
    sections: mergeHomeSections(data.sections || {}),
    universities,
    cities,
    scholarships,
    services,
    majors,
    successPhotos,
    videos,
    generatedAt: data.generated_at || null,
  }
}

export function getCachedHomeBootstrap({ allowStale = true } = {}) {
  const cached = readLocal({ allowStale })
  return cached ? mapHomePayload(cached) : null
}

export async function fetchHomeBootstrap({ timeoutMs = 12000 } = {}) {
  const data = await api.get('/home', undefined, { timeoutMs })
  const raw = data?.data || {}
  writeLocal(raw)
  return mapHomePayload(raw)
}
