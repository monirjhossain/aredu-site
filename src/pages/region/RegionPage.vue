<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { REGIONS, WHATSAPP } from '../../data/site.js'
import cities from '../../data/cities.json'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()

const region = computed(() => REGIONS.find((r) => r.slug === route.params.slug))

const regionCities = computed(() => {
  if (!region.value) return []
  const idx = REGIONS.findIndex((r) => r.slug === region.value.slug)
  const slice = Math.ceil(cities.length / REGIONS.length)
  return cities.slice(idx * slice, (idx + 1) * slice)
})

const regionUnis = computed(() => {
  if (!regionCities.value.length) return universities.slice(0, 9)
  const cityNames = new Set(regionCities.value.map((c) => c.name.toLowerCase()))
  return universities.filter((u) => cityNames.has(u.city?.toLowerCase())).slice(0, 12)
})
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
      <div class="mt-4 flex flex-wrap gap-2">
        <RouterLink
          v-for="city in regionCities"
          :key="city.slug"
          :to="`/city/${city.slug}`"
          class="rounded-full border border-gray-200 bg-white px-4 py-2 text-[12px] font-medium text-[var(--color-secondary)] hover:border-[var(--color-primary)]"
        >
          {{ city.name }}
        </RouterLink>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Universities in {{ region.name }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in regionUnis" :key="uni.slug" :university="uni" />
      </div>
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
