import { api } from './client.js'
import { resolveMediaUrl } from './universities.js'

function plainText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function fetchSuccessPhotos() {
  const data = await api.get('/posts', {
    post_type: 'success-story',
    per_page: 24,
  })
  const rows = data?.data?.posts?.data || []

  return rows
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
}
