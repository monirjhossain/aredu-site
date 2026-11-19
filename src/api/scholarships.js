import { api } from './client.js'
import { mapPostToUniversity, resolveMediaUrl } from './universities.js'

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
    image: resolveMediaUrl(row.image) || row.image || null,
    city: row.city || '',
    programId: row.program_id || '',
    degree: row.degree || '',
    teachingLanguage: row.teaching_language || '',
    intake: row.intake || '',
    scholarshipType: row.scholarship_type || '',
    deadline: row.deadline || '',
  }
}

export async function fetchEducationLevels() {
  const data = await api.get('/education-levels')
  const levels = data?.data?.levels || []
  return levels.map((item) => (typeof item === 'string' ? item : item?.name || item?.label || '')).filter(Boolean)
}

export async function fetchScholarshipOptions() {
  const data = await api.get('/scholarships/options')
  return data?.data?.options || {}
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
