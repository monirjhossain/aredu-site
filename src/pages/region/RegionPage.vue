<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { REGIONS } from '../../data/site.js'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchCities } from '../../api/cities.js'
import { fetchUniversities } from '../../api/universities.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()
const route = useRoute()
const regionCities = ref([])
const regionUnis = ref([])
const loading = ref(true)

const region = computed(() => REGIONS.find((r) => r.slug === route.params.slug))

async function load() {
  if (!region.value) {
    regionCities.value = []
    regionUnis.value = []
    loading.value = false
    return
  }
  loading.value = true
  try {
    const [citiesResult, unisResult] = await Promise.all([
      fetchCities({ region: region.value.name, perPage: 100 }),
      fetchUniversities({ perPage: 100 }),
    ])
    regionCities.value = citiesResult.items
    const cityNames = new Set(citiesResult.items.map((c) => c.name.toLowerCase()))
    const citySlugs = new Set(citiesResult.items.map((c) => c.slug.toLowerCase()))
    regionUnis.value = unisResult.items
      .filter((u) => cityNames.has((u.city || '').toLowerCase()) || citySlugs.has((u.city || '').toLowerCase()))
      .slice(0, 12)
  } catch (e) {
    console.error(e)
    regionCities.value = []
    regionUnis.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.slug, load)
</script>

<template>
  <div v-if="region">
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <nav class="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
          <RouterLink to="/cities" class="hover:text-white">Cities</RouterLink>
          <span>/</span>
          <span class="text-white/80">{{ region.name }}</span>
        </nav>
        <h1 class="font-display text-[1.7rem] font-extrabold leading-tight sm:text-4xl">{{ region.name }}</h1>
        <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60">
          Explore universities and cities in {{ region.name }} — find programmes and scholarships for Bangladeshi students.
        </p>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <h2 class="font-display text-xl font-extrabold text-ink">Cities in {{ region.name }}</h2>
      <div v-if="loading" class="mt-4 text-[13px] text-ink/40">Loading…</div>
      <div v-else class="mt-4 flex flex-wrap gap-2">
        <RouterLink
          v-for="city in regionCities"
          :key="city.slug"
          :to="`/city/${city.slug}`"
          class="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-ink ring-1 ring-ink/10 transition hover:bg-crimson hover:text-white hover:ring-crimson"
        >
          {{ city.name }}
        </RouterLink>
        <p v-if="!regionCities.length" class="text-[14px] text-ink/50">No cities linked to this region in admin yet.</p>
      </div>

      <h2 class="mt-10 font-display text-xl font-extrabold text-ink">Universities in {{ region.name }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in regionUnis" :key="uni.slug" :university="uni" />
      </div>
      <p v-if="!loading && !regionUnis.length" class="mt-4 text-[14px] text-ink/50">No universities matched for this region yet.</p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <RouterLink to="/universities" class="btn-primary w-full sm:w-auto">Browse all universities</RouterLink>
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white sm:w-auto">
          WhatsApp us
        </a>
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">Region not found</h1>
    <RouterLink to="/cities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Browse cities</RouterLink>
  </div>
</template>
