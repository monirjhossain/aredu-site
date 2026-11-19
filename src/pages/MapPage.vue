<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUniversitiesCatalog } from '../composables/useUniversitiesCatalog.js'
import UniversityCard from '../components/ui/UniversityCard.vue'

const selectedCity = ref('')
const { items: universities, loading, load } = useUniversitiesCatalog()

onMounted(() => load())

const cities = computed(() => {
  const set = new Set(universities.value.map((u) => u.city).filter(Boolean))
  return [...set].sort()
})

const filtered = computed(() => {
  if (!selectedCity.value) return universities.value.slice(0, 20)
  return universities.value.filter((u) => u.city === selectedCity.value)
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-map-2 text-[14px]"></i>
            Map
          </div>
          <h1 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl">
            University map
          </h1>
          <p class="mt-3 text-[14.5px] leading-relaxed text-white/60 sm:mt-4">
            Explore universities across China from live admin data —
            <span v-if="loading">loading…</span>
            <span v-else>{{ universities.length }} universities.</span>
          </p>
        </div>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <div class="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        <div class="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-crimson/10 via-white to-mist p-5 ring-1 ring-ink/8 sm:rounded-[1.75rem] sm:p-8">
          <svg viewBox="0 0 500 350" class="mx-auto w-full max-w-xl" xmlns="http://www.w3.org/2000/svg">
            <path
              class="cn-prov"
              d="M100,80 L160,60 L240,70 L320,90 L380,130 L400,180 L370,240 L300,280 L200,290 L120,260 L70,200 L80,130 Z"
              fill="#E11D2E"
              opacity="0.85"
            />
            <circle
              v-for="(city, i) in cities.slice(0, 12)"
              :key="city"
              :cx="100 + (i % 4) * 80"
              :cy="100 + Math.floor(i / 4) * 70"
              r="8"
              fill="#0A1628"
              class="cursor-pointer"
              @click="selectedCity = city"
            />
          </svg>
          <div class="mt-4 flex flex-wrap justify-center gap-2">
            <button
              v-for="city in cities.slice(0, 12)"
              :key="city"
              type="button"
              class="rounded-full px-3 py-1.5 text-[11px] font-semibold transition"
              :class="selectedCity === city ? 'bg-crimson text-white' : 'bg-white text-ink/60 ring-1 ring-ink/10 hover:ring-crimson/30'"
              @click="selectedCity = selectedCity === city ? '' : city"
            >
              {{ city }}
            </button>
          </div>
        </div>

        <div>
          <div class="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="font-display text-[15px] font-bold text-ink sm:text-base">
              {{ selectedCity || 'All cities' }}
              <span class="font-normal text-ink/40">({{ filtered.length }})</span>
            </h2>
            <RouterLink to="/universities" class="text-[12px] font-semibold text-crimson hover:underline">View all →</RouterLink>
          </div>
          <div class="max-h-[600px] space-y-3 overflow-y-auto pr-1">
            <UniversityCard v-for="uni in filtered.slice(0, 8)" :key="uni.slug" :university="uni" />
            <p v-if="!loading && !filtered.length" class="rounded-[1.25rem] bg-white p-6 text-center text-[13px] text-ink/40 ring-1 ring-ink/8">
              No universities for this city yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
