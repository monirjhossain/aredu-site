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

function categoryProvince(post) {
  const cats = post?.categories || []
  if (cats.length > 1) return cats[1]?.name || cats[0]?.name || null
  return cats[0]?.name || null
}

function metaValue(post, key) {
  const rows = post?.post_metas || post?.postMetas || []
  const hit = rows.find((m) => m?.meta_key === key)
  return hit?.meta_value ?? null
}

function hasScholarship(post) {
  const meta = String(metaValue(post, 'scholarship') || '').toLowerCase()
  if (['1', 'yes', 'true'].includes(meta)) return true
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

  const apiBase = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
  const uploadsIdx = value.indexOf('/uploads/')
  if (uploadsIdx !== -1) {
    const path = value.slice(uploadsIdx)
    if (/^https?:\/\//i.test(apiBase)) {
      const origin = apiBase.replace(/\/api$/i, '')
      return `${origin}${path}`
    }
    return path
  }

  if (/^https?:\/\//i.test(value)) return value
  return `/${value.replace(/^\//, '')}`
}

/**
 * Map admin Post (post_type=university) → frontend university card shape.
 */
export function mapPostToUniversity(post, index = 0) {
  if (!post) return null
  const city = categoryName(post) || metaValue(post, 'city') || 'China'
  const province = metaValue(post, 'province') || categoryProvince(post) || city
  const rankingMeta = Number(metaValue(post, 'ranking'))
  const viewsMeta = Number(metaValue(post, 'views'))
  const codeMeta = metaValue(post, 'code')

  return {
    id: post.id,
    slug: post.post_name || String(post.id),
    name: post.post_title || 'University',
    code: codeMeta || makeCode(post.post_title),
    city,
    province,
    ranking: Number.isFinite(rankingMeta) && rankingMeta > 0 ? rankingMeta : Number(post.id) || index + 1,
    views: Number.isFinite(viewsMeta) && viewsMeta >= 0 ? viewsMeta : Math.max(10, 200 - (index % 100)),
    scholarship: hasScholarship(post),
    image: resolveMediaUrl(post.image_url || post.image),
    subjects: (post.subjects || []).map((s) => s.name).filter(Boolean),
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
