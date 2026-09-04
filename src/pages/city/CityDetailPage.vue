<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { REGIONS, WHATSAPP } from '../../data/site.js'
import cities from '../../data/cities.json'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()

const city = computed(() => cities.find((c) => c.slug === route.params.slug))

const cityUnis = computed(() => {
  if (!city.value) return []
  const name = city.value.name.toLowerCase()
  return universities.filter(
    (u) => u.city?.toLowerCase() === name || u.city?.toLowerCase() === city.value.slug,
  )
})

const region = computed(() => {
  const slug = route.params.slug
  return REGIONS.find((r) => r.slug === slug)?.name || 'China'
})
</script>

<template>
  <div v-if="city" class="site-container py-10">
    <nav class="mb-6 text-[12px] text-gray-400">
      <RouterLink to="/cities" class="hover:text-[var(--color-primary)]">Cities</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-[var(--color-secondary)]">{{ city.name }}</span>
    </nav>

    <div class="rounded-2xl px-6 py-10 sm:px-10" style="background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3055 100%)">
      <span class="rounded-full px-3 py-1 text-[11px] font-semibold" style="background: rgba(255,255,255,0.15); color: var(--color-accent)">
        {{ region }}
      </span>
      <h1 class="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Study in {{ city.name }}</h1>
      <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#AEB8C9]">
        {{ cityUnis.length }} universities in {{ city.name }} — explore programmes, scholarships and student life.
      </p>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">{{ cityUnis.length }}</div>
        <div class="text-[12px] text-gray-400">Universities</div>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">{{ cityUnis.filter((u) => u.scholarship).length }}</div>
        <div class="text-[12px] text-gray-400">With scholarships</div>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">Safe</div>
        <div class="text-[12px] text-gray-400">Student-friendly city</div>
      </div>
    </div>

    <section class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Universities in {{ city.name }}</h2>
      <div v-if="cityUnis.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in cityUnis" :key="uni.slug" :university="uni" />
      </div>
      <p v-else class="mt-4 text-[14px] text-gray-500">No universities listed for this city yet. Contact us for options.</p>
    </section>

    <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <RouterLink to="/tools/find-university" class="rounded-xl px-5 py-3 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
        Find my university
      </RouterLink>
      <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-3 text-center text-[13px] font-semibold text-white">
        WhatsApp us
      </a>
    </div>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="text-2xl font-extrabold text-[var(--color-secondary)]">City not found</h1>
    <RouterLink to="/cities" class="mt-4 inline-block text-[13px] font-semibold" style="color: var(--color-primary)">Browse cities</RouterLink>
  </div>
</template>
