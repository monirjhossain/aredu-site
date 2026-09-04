<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { REGIONS } from '../data/site.js'
import { fetchCities } from '../api/cities.js'
import NeedHelpBanner from '../components/ui/NeedHelpBanner.vue'

const loading = ref(true)
const error = ref('')
const cities = ref([])

const enriched = computed(() =>
  cities.value.map((c) => ({
    ...c,
    uniCount: c.uniCount || c.universities || 0,
  })),
)

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const result = await fetchCities({ perPage: 200 })
    cities.value = result.items
  } catch (e) {
    console.error(e)
    error.value = e.message || 'Could not load cities'
    cities.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="site-container py-10">
    <div class="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div>
        <div class="mb-8">
          <h1 class="text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">Study cities in China</h1>
          <p class="mt-2 text-[14px] text-gray-500">
            <template v-if="loading">Loading cities from admin…</template>
            <template v-else-if="error">{{ error }}</template>
            <template v-else>{{ enriched.length }} cities — explore universities, living costs and student life.</template>
          </p>
        </div>

        <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="n" class="h-28 animate-pulse rounded-2xl bg-gray-100" />
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="city in enriched"
            :key="city.slug"
            :to="`/city/${city.slug}`"
            class="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
          >
            <div class="flex items-start justify-between gap-2">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl" style="background: #fcebeb">
                <i class="ti ti-building-skyscraper text-[20px]" style="color: var(--color-primary)"></i>
              </span>
              <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">{{ city.region }}</span>
            </div>
            <h2 class="mt-3 text-[15px] font-bold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]">{{ city.name }}</h2>
            <p class="mt-1 text-[12px] text-gray-400">{{ city.uniCount }} universities</p>
          </RouterLink>
        </div>
      </div>

      <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div class="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 class="text-[14px] font-bold text-[var(--color-secondary)]">Browse by region</h2>
          <div class="mt-3 flex flex-wrap gap-2">
            <RouterLink
              v-for="region in REGIONS"
              :key="region.slug"
              :to="`/region/${region.slug}`"
              class="rounded-full bg-gray-100 px-3 py-1 text-[12px] font-medium text-gray-600 hover:bg-[var(--color-primary)] hover:text-white"
            >
              {{ region.name }}
            </RouterLink>
          </div>
        </div>
        <NeedHelpBanner />
      </aside>
    </div>
  </div>
</template>
