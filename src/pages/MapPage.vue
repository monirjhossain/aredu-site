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
  <div class="site-container py-10">
    <div class="mb-8">
      <h1 class="text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">University map</h1>
      <p class="mt-2 text-[14px] text-gray-500">
        Explore universities across China from live admin data —
        <span v-if="loading">loading…</span>
        <span v-else>{{ universities.length }} universities.</span>
      </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-[#fcebeb] to-white p-8">
        <svg viewBox="0 0 500 350" class="mx-auto w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            class="cn-prov"
            d="M100,80 L160,60 L240,70 L320,90 L380,130 L400,180 L370,240 L300,280 L200,290 L120,260 L70,200 L80,130 Z"
            fill="var(--color-primary)"
          />
          <circle
            v-for="(city, i) in cities.slice(0, 12)"
            :key="city"
            :cx="100 + (i % 4) * 80"
            :cy="100 + Math.floor(i / 4) * 70"
            r="8"
            fill="var(--color-secondary)"
            class="cursor-pointer"
            @click="selectedCity = city"
          />
        </svg>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <button
            v-for="city in cities.slice(0, 12)"
            :key="city"
            type="button"
            class="rounded-full px-3 py-1 text-[11px] font-medium transition"
            :class="selectedCity === city ? 'text-white' : 'bg-white border border-gray-200 text-gray-600'"
            :style="selectedCity === city ? { background: 'var(--color-primary)' } : {}"
            @click="selectedCity = selectedCity === city ? '' : city"
          >
            {{ city }}
          </button>
        </div>
      </div>

      <div>
        <div class="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-[15px] font-bold text-[var(--color-secondary)]">
            {{ selectedCity || 'All cities' }}
            <span class="font-normal text-gray-400">({{ filtered.length }})</span>
          </h2>
          <RouterLink to="/universities" class="text-[12px] font-semibold" style="color: var(--color-primary)">View all →</RouterLink>
        </div>
        <div class="max-h-[600px] space-y-3 overflow-y-auto pr-1">
          <UniversityCard v-for="uni in filtered.slice(0, 8)" :key="uni.slug" :university="uni" />
          <p v-if="!loading && !filtered.length" class="text-[13px] text-gray-400">No universities for this city yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>
