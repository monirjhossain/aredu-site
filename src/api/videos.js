import { api } from './client.js'

export async function fetchGalleryVideos() {
  const data = await api.get('/videos')
  const rows = data?.data?.videos || []
  return rows
    .map((row) => ({
      id: row.id,
      title: row.title || 'Video',
      tag: row.tag || 'Video',
    }))
    .filter((row) => row.id)
}
