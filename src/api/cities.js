import { api } from './client.js'
import { mapPostToUniversity } from './universities.js'

export function mapCity(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region || 'China',
    universities: row.universities ?? row.uni_count ?? 0,
    uniCount: row.uni_count ?? row.universities ?? 0,
    desc: row.desc || '',
    image: row.image || null,
  }
}

export async function fetchCities({ search = '', region = '', perPage = 100, page = 1, all = false } = {}) {
  const data = await api.get('/cities', {
    search: search || undefined,
    region: region || undefined,
    per_page: perPage,
    page,
    all: all ? 1 : undefined,
  })
  const payload = data?.data?.cities || {}
  const rows = payload.data || []
  return {
    items: rows.map(mapCity).filter(Boolean),
    total: payload.total ?? rows.length,
    currentPage: payload.current_page ?? page,
    lastPage: payload.last_page ?? 1,
  }
}

export async function fetchCityBySlug(slug) {
  const data = await api.get(`/cities/${encodeURIComponent(slug)}`)
  const city = mapCity(data?.data?.city)
  const universities = (data?.data?.universities || []).map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
  return { city, universities }
}
