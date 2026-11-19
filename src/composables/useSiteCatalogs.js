import { computed } from 'vue'
import { useHomeBootstrap } from './useHomeBootstrap.js'

/** Dynamic catalogs from /api/home sections only — no local dummy lists. */
export function useSiteCatalogs() {
  const { sections, services: apiServices } = useHomeBootstrap()

  const tools = computed(() => {
    const rows = sections.value?.tools
    return Array.isArray(rows) ? rows : []
  })

  const degrees = computed(() => {
    const rows = sections.value?.degrees
    return Array.isArray(rows) ? rows : []
  })

  const fieldGroups = computed(() => {
    const rows = sections.value?.field_groups
    return Array.isArray(rows) ? rows : []
  })

  const servicesCatalog = computed(() => {
    const rows = sections.value?.services_catalog
    return Array.isArray(rows) ? rows : []
  })

  /** Prefer live service posts; otherwise admin catalog. */
  const services = computed(() => {
    if (apiServices.value?.length) return apiServices.value
    return servicesCatalog.value
  })

  return {
    tools,
    degrees,
    fieldGroups,
    servicesCatalog,
    services,
  }
}
