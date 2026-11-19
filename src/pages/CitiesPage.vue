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
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-map-pin text-[14px]"></i>
            Cities
          </div>
          <h1 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl">
            Study cities in China
          </h1>
          <p class="mt-3 text-[14.5px] leading-relaxed text-white/60 sm:mt-4">
            <template v-if="loading">Loading cities from admin…</template>
            <template v-else-if="error">{{ error }}</template>
            <template v-else>{{ enriched.length }} cities — explore universities, living costs and student life.</template>
          </p>
        </div>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <div class="grid gap-6 lg:grid-cols-[1fr_280px] lg:gap-8">
        <div>
          <div v-if="loading" class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <div v-for="n in 6" :key="n" class="h-28 animate-pulse rounded-[1.35rem] bg-ink/5" />
          </div>

          <div v-else class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <RouterLink
              v-for="city in enriched"
              :key="city.slug"
              :to="`/city/${city.slug}`"
              class="group rounded-[1.35rem] bg-white p-5 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-lift hover:ring-crimson/20"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
                  <i class="ti ti-building-skyscraper text-[20px]"></i>
                </span>
                <span class="rounded-full bg-[#F8F9FB] px-2.5 py-0.5 text-[10px] font-medium text-ink/45">{{ city.region }}</span>
              </div>
              <h2 class="mt-3 font-display text-[15px] font-bold text-ink transition group-hover:text-crimson">{{ city.name }}</h2>
              <p class="mt-1 text-[12px] text-ink/40">{{ city.uniCount }} universities</p>
            </RouterLink>
          </div>
        </div>

        <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8">
            <h2 class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">Browse by region</h2>
            <div class="mt-3 flex flex-wrap gap-2">
              <RouterLink
                v-for="region in REGIONS"
                :key="region.slug"
                :to="`/region/${region.slug}`"
                class="rounded-full bg-[#F8F9FB] px-3 py-1.5 text-[12px] font-medium text-ink/60 transition hover:bg-crimson hover:text-white"
              >
                {{ region.name }}
              </RouterLink>
            </div>
          </div>
          <NeedHelpBanner />
        </aside>
      </div>
    </section>
  </div>
</template>
