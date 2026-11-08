import { computed, inject, provide, reactive } from 'vue'
import { fetchHomeBootstrap, getCachedHomeBootstrap } from '../api/home.js'
import { applySiteSettings } from './useSiteSettings.js'

const HOME_KEY = 'homeBootstrap'

const state = reactive({
  loaded: false,
  loading: false,
  universities: [],
  cities: [],
  scholarships: [],
  services: [],
  majors: [],
  successPhotos: [],
  videos: [],
  settings: null,
  error: null,
})

let loadPromise = null

function applyPayload(payload) {
  if (!payload) return
  state.universities = payload.universities || []
  state.cities = payload.cities || []
  state.scholarships = payload.scholarships || []
  state.services = payload.services || []
  state.majors = payload.majors || []
  state.successPhotos = payload.successPhotos || []
  state.videos = payload.videos || []
  state.settings = payload.settings || null
  if (payload.settings) {
    applySiteSettings(payload.settings)
  }
  state.loaded = true
}

export async function loadHomeBootstrap() {
  if (loadPromise) return loadPromise

  const cached = getCachedHomeBootstrap()
  if (cached) {
    applyPayload(cached)
  }

  state.loading = true
  loadPromise = fetchHomeBootstrap({ timeoutMs: 12000 })
    .then((payload) => {
      applyPayload(payload)
      state.error = null
      return state
    })
    .catch((error) => {
      state.error = error
      console.error(error)
      return state
    })
    .finally(() => {
      state.loading = false
      loadPromise = null
    })

  return loadPromise
}

export function provideHomeBootstrap() {
  provide(HOME_KEY, state)
  return state
}

export function useHomeBootstrap() {
  const injected = inject(HOME_KEY, null)
  const home = injected || state

  return {
    home,
    loaded: computed(() => !!home.loaded),
    loading: computed(() => !!home.loading),
    universities: computed(() => home.universities || []),
    cities: computed(() => home.cities || []),
    scholarships: computed(() => home.scholarships || []),
    services: computed(() => home.services || []),
    majors: computed(() => home.majors || []),
    successPhotos: computed(() => home.successPhotos || []),
    videos: computed(() => home.videos || []),
  }
}
