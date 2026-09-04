import { api } from './client.js'

function makeCode(title = '') {
  const parts = String(title)
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (!parts.length) return 'UNI'
  if (parts.length === 1) return parts[0].slice(0, 4).toUpperCase()
  return parts
    .slice(0, 3)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

function categoryName(post) {
  return post?.categories?.[0]?.name || null
}

function hasScholarship(post) {
  const tags = post?.tags || []
  if (tags.some((t) => /scholarship/i.test(t.name || ''))) return true
  const hay = `${post?.post_title || ''} ${post?.post_content || ''}`
  return /scholarship/i.test(hay)
}

/** Absolute or root-relative media URL for university images. */
export function resolveMediaUrl(url) {
  if (!url) return null
  const value = String(url).trim()
  if (!value) return null
  if (value.startsWith('data:')) return value
  // Prefer /uploads/... so Vite proxy can serve admin files on :5173
  const uploadsIdx = value.indexOf('/uploads/')
  if (uploadsIdx !== -1) return value.slice(uploadsIdx)
  if (/^https?:\/\//i.test(value)) return value
  return `/${value.replace(/^\//, '')}`
}

/**
 * Map admin Post (post_type=university) → frontend university card shape.
 */
export function mapPostToUniversity(post, index = 0) {
  if (!post) return null
  const city = categoryName(post) || 'China'
  return {
    id: post.id,
    slug: post.post_name || String(post.id),
    name: post.post_title || 'University',
    code: makeCode(post.post_title),
    city,
    province: city,
    ranking: Number(post.id) || index + 1,
    views: Math.max(10, 200 - (index % 100)),
    scholarship: hasScholarship(post),
    image: resolveMediaUrl(post.image_url || post.image),
    content: post.post_content || '',
    excerpt: String(post.post_content || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 180),
    raw: post,
  }
}

export async function fetchUniversities({
  search = '',
  perPage = 100,
  page = 1,
  city = '',
  category = '',
  subject = '',
  scholarship = false,
} = {}) {
  const data = await api.get('/posts', {
    post_type: 'university',
    per_page: perPage,
    page,
    search: search || undefined,
    city: city || undefined,
    category: category || undefined,
    subject: subject || undefined,
    scholarship: scholarship ? 1 : undefined,
  })
  const rows = data?.data?.posts?.data || []
  const meta = data?.data?.posts || {}
  return {
    items: rows.map((row, i) => mapPostToUniversity(row, i)).filter(Boolean),
    total: meta.total ?? rows.length,
    currentPage: meta.current_page ?? page,
    lastPage: meta.last_page ?? 1,
  }
}

export async function fetchUniversityBySlug(slug) {
  const data = await api.get(`/posts/${encodeURIComponent(slug)}`)
  const post = data?.data?.post
  if (!post) return null
  return mapPostToUniversity(post)
}

export async function submitInquiry(payload) {
  return api.post('/inquiries', payload)
}
