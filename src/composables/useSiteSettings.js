import { computed, inject, provide, reactive, ref } from 'vue'
import { fetchSiteSettings, SITE_SETTINGS_FALLBACK } from '../api/settings.js'

const SITE_KEY = 'siteSettings'

const state = reactive({
  ...SITE_SETTINGS_FALLBACK,
  loaded: false,
})

let loadPromise = null

export async function loadSiteSettings() {
  if (state.loaded) return state
  if (loadPromise) return loadPromise
  loadPromise = fetchSiteSettings()
    .then((data) => {
      Object.assign(state, data, { loaded: true })
      return state
    })
    .finally(() => {
      loadPromise = null
    })
  return loadPromise
}

export function provideSiteSettings() {
  provide(SITE_KEY, state)
  return state
}

export function useSiteSettings() {
  const injected = inject(SITE_KEY, null)
  const settings = injected || state

  return {
    settings,
    brand: computed(() => settings.brand),
    phone: computed(() => settings.phone),
    whatsapp: computed(() => settings.whatsapp),
    email: computed(() => settings.email),
    address: computed(() => settings.address),
    facebook: computed(() => settings.facebook),
    youtube: computed(() => settings.youtube),
    faqs: computed(() => (Array.isArray(settings.faqs) ? settings.faqs : [])),
    loaded: computed(() => !!settings.loaded),
  }
}

/** Convenience refs for templates that previously imported constants */
export function useContactLinks() {
  const { whatsapp, phone, email } = useSiteSettings()
  return { WHATSAPP: whatsapp, PHONE: phone, EMAIL: email }
}
