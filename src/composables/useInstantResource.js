import { onUnmounted, ref } from 'vue'
import { peekApi, subscribeApi } from '../api/client.js'

/**
 * Paint from local cache immediately, then keep syncing with network SWR updates.
 */
export function useInstantResource() {
  const loading = ref(true)
  const error = ref('')
  const unsubs = []

  function watchPath(path, apply) {
    const cached = peekApi(path)
    if (cached != null) {
      apply(cached)
      loading.value = false
    }
    unsubs.push(
      subscribeApi(path, (fresh) => {
        apply(fresh)
        loading.value = false
      }),
    )
    return cached
  }

  function beginLoad(hasCache) {
    error.value = ''
    if (!hasCache) loading.value = true
  }

  function endLoad() {
    loading.value = false
  }

  function fail(e, fallbackMessage = 'Failed to load') {
    console.error(e)
    error.value = e?.message || fallbackMessage
    loading.value = false
  }

  onUnmounted(() => {
    unsubs.forEach((fn) => fn())
  })

  return { loading, error, watchPath, beginLoad, endLoad, fail }
}
