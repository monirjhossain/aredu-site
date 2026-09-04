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
  <div v-if="region" class="site-container py-10">
    <nav class="mb-6 text-[12px] text-gray-400">
      <RouterLink to="/cities" class="hover:text-[var(--color-primary)]">Cities</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-[var(--color-secondary)]">{{ region.name }}</span>
    </nav>

    <div class="rounded-2xl px-6 py-10 sm:px-10" style="background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3055 100%)">
      <h1 class="text-2xl font-extrabold text-white sm:text-3xl">{{ region.name }}</h1>
      <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#AEB8C9]">
        Explore universities and cities in {{ region.name }} — find programmes and scholarships for Bangladeshi students.
      </p>
    </div>

    <section class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Cities in {{ region.name }}</h2>
      <div v-if="loading" class="mt-4 text-[13px] text-gray-400">Loading…</div>
      <div v-else class="mt-4 flex flex-wrap gap-2">
        <RouterLink
          v-for="city in regionCities"
          :key="city.slug"
          :to="`/city/${city.slug}`"
          class="rounded-full border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-[var(--color-secondary)] hover:border-[var(--color-primary)]"
        >
          {{ city.name }}
        </RouterLink>
        <p v-if="!regionCities.length" class="text-[14px] text-gray-500">No cities linked to this region in admin yet.</p>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Universities in {{ region.name }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in regionUnis" :key="uni.slug" :university="uni" />
      </div>
      <p v-if="!loading && !regionUnis.length" class="mt-4 text-[14px] text-gray-500">No universities matched for this region yet.</p>
    </section>

    <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <RouterLink to="/universities" class="rounded-xl px-5 py-3 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
        Browse all universities
      </RouterLink>
      <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-3 text-center text-[13px] font-semibold text-white">
        WhatsApp us
      </a>
    </div>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="text-2xl font-extrabold text-[var(--color-secondary)]">Region not found</h1>
    <RouterLink to="/cities" class="mt-4 inline-block text-[13px] font-semibold" style="color: var(--color-primary)">Browse cities</RouterLink>
  </div>
</template>
