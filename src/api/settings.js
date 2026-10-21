import { api } from './client.js'

const FALLBACK = {
  brand: 'AR Education',
  phone: '+8801756502004',
  whatsapp: 'https://wa.me/8801756502004',
  email: 'info@areducation.net',
  address: '10th floor, Tropical Tower, Bata Signal, Elephant Road, Dhaka, Bangladesh',
  facebook: 'https://www.facebook.com/AREducationbd',
  youtube: 'https://www.youtube.com/@areducationbd',
  faqs: [],
}

export async function fetchSiteSettings() {
  try {
    const data = await api.get('/settings')
    return { ...FALLBACK, ...(data?.data?.settings || {}) }
  } catch (e) {
    console.error(e)
    return { ...FALLBACK }
  }
}

export { FALLBACK as SITE_SETTINGS_FALLBACK }
