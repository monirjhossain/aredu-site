import { ref } from 'vue'
import { fetchUniversities } from '../api/universities.js'

const items = ref([])
const loaded = ref(false)
const loading = ref(false)
let loadPromise = null

export function useUniversitiesCatalog() {
  async function load(force = false) {
    if (loaded.value && !force) return items.value
    if (loadPromise && !force) return loadPromise

    loading.value = true
    loadPromise = fetchUniversities({ perPage: 100 })
      .then((result) => {
        items.value = result.items || []
        loaded.value = true
        return items.value
      })
      .catch((e) => {
        console.error(e)
        return items.value
      })
      .finally(() => {
        loading.value = false
        loadPromise = null
      })

    return loadPromise
  }

  return { items, loaded, loading, load }
}
