import { api } from './client.js'
import { mapPostToUniversity } from './universities.js'

export function mapScholarship(row) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    coverage: row.coverage || 'Varies',
    universities: row.universities ?? 0,
    desc: row.desc || '',
    content: row.content || '',
    image: row.image || null,
  }
}

export async function fetchScholarships({ search = '', perPage = 50, page = 1 } = {}) {
  const data = await api.get('/scholarships', {
    search: search || undefined,
    per_page: perPage,
    page,
  })
  const payload = data?.data?.scholarships || {}
  const rows = payload.data || []
  return {
    items: rows.map(mapScholarship).filter(Boolean),
    total: payload.total ?? rows.length,
    currentPage: payload.current_page ?? page,
    lastPage: payload.last_page ?? 1,
  }
}

export async function fetchScholarshipBySlug(slug) {
  const data = await api.get(`/scholarships/${encodeURIComponent(slug)}`)
  const scholarship = mapScholarship(data?.data?.scholarship)
  const universities = (data?.data?.universities || []).map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
  return { scholarship, universities }
}
