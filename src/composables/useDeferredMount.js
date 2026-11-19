import { onMounted, onUnmounted, ref } from 'vue'

/** Mount heavy below-fold UI only when near viewport (instant first paint). */
export function useDeferredMount({ rootMargin = '280px 0px' } = {}) {
  const el = ref(null)
  const ready = ref(false)
  let observer = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') {
      ready.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          ready.value = true
          observer?.disconnect()
          observer = null
        }
      },
      { rootMargin },
    )
    if (el.value) observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { el, ready }
}
