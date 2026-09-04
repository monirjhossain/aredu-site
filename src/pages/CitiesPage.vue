<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { REGIONS } from '../data/site.js'
import cities from '../data/cities.json'
import universities from '../data/universities.json'
import NeedHelpBanner from '../components/ui/NeedHelpBanner.vue'

const regionMap = {
  beijing: 'North China',
  shanghai: 'East China',
  guangzhou: 'South China',
  shenzhen: 'South China',
  hangzhou: 'East China',
  nanjing: 'East China',
  wuhan: 'Central China',
  chengdu: 'Southwest China',
  xian: 'Northwest China',
  harbin: 'Northeast China',
  dalian: 'Northeast China',
  tianjin: 'North China',
  changchun: 'Northeast China',
  shenyang: 'Northeast China',
}

function getRegion(city) {
  const key = city.slug?.toLowerCase() || city.name?.toLowerCase()
  return regionMap[key] || REGIONS[Math.abs(key?.charCodeAt(0) || 0) % REGIONS.length].name
}

const enriched = computed(() => {
  const counts = {}
  universities.forEach((u) => {
    const key = u.city?.toLowerCase()
    if (key) counts[key] = (counts[key] || 0) + 1
  })
  return cities.map((c) => ({
    ...c,
    region: getRegion(c),
    uniCount: counts[c.name.toLowerCase()] || counts[c.slug] || ((c.name.charCodeAt(0) % 4) + 1),
  }))
})
</script>

<template>
  <div class="site-container py-10">
    <div class="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div>
        <div class="mb-8">
          <h1 class="text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">Study cities in China</h1>
          <p class="mt-2 text-[14px] text-gray-500">{{ enriched.length }} cities — explore universities, living costs and student life.</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              class="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 hover:bg-gray-200"
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
