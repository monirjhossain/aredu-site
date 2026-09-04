import { api } from './client.js'

export function mapService(post) {
  if (!post) return null
  const metas = {}
  ;(post.post_metas || post.postMetas || []).forEach((m) => {
    metas[m.meta_key] = m.meta_value
  })
  // getMeta may already be flattened via API raw post
  const icon = metas.icon || post.meta?.icon || 'ti-briefcase'
  const color = metas.color || post.meta?.color || '#E11D2E'
  const bg = metas.bg || post.meta?.bg || '#FCE8EA'
  const short = post.post_excerpt || ''
  const long = String(post.post_content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    id: post.id,
    slug: post.post_name,
    name: post.post_title,
    short: short || long.slice(0, 140),
    long: long || short,
    icon,
    color,
    bg,
    content: post.post_content,
  }
}

export async function fetchServices({ perPage = 20 } = {}) {
  const data = await api.get('/posts', {
    post_type: 'service',
    per_page: perPage,
  })
  const rows = data?.data?.posts?.data || []
  // Load metas via detail if list lacks them — list may not include postMetas
  return {
    items: rows.map(mapService).filter(Boolean),
    total: data?.data?.posts?.total ?? rows.length,
  }
}

export async function fetchServiceBySlug(slug) {
  const data = await api.get(`/posts/${encodeURIComponent(slug)}`)
  return mapService(data?.data?.post)
}
