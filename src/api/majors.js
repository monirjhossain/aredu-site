import { api } from './client.js'
import { mapPostToUniversity } from './universities.js'

export function mapSubject(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    field: row.field || 'General',
    degree: row.degree || null,
    universities: row.universities ?? row.uni_count ?? 0,
    uniCount: row.uni_count ?? row.universities ?? 0,
  }
}

export async function fetchMajors({ search = '', perPage = 200, page = 1, withUniversities = false } = {}) {
  const data = await api.get('/majors', {
    search: search || undefined,
    per_page: perPage,
    page,
    with_universities: withUniversities ? 1 : undefined,
  })
  const payload = data?.data?.subjects || {}
  const rows = payload.data || []
  return {
    items: rows.map(mapSubject).filter(Boolean),
    total: payload.total ?? rows.length,
    currentPage: payload.current_page ?? page,
    lastPage: payload.last_page ?? 1,
  }
}

export async function fetchMajorBySlug(slug) {
  const data = await api.get(`/majors/${encodeURIComponent(slug)}`)
  const major = mapSubject(data?.data?.subject)
  const universities = (data?.data?.universities || []).map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
  return { major, universities }
}
