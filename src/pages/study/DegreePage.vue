<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUniversitiesCatalog } from '../../composables/useUniversitiesCatalog.js'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { useSiteCatalogs } from '../../composables/useSiteCatalogs.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()
const { whatsapp: WHATSAPP } = useSiteSettings()
const { degrees } = useSiteCatalogs()
const { items: universities, load } = useUniversitiesCatalog()
onMounted(() => load())

const degree = computed(() => degrees.value.find((d) => d.slug === route.params.slug))

const relatedUnis = computed(() => {
  if (!degree.value) return []
  return [...universities.value]
    .filter((u) => u.scholarship || (u.ranking || 99) <= 50)
    .sort((a, b) => (a.ranking || 99) - (b.ranking || 99))
    .slice(0, 9)
})
</script>

<template>
  <div v-if="degree">
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-crimson/20 blur-3xl"></div>
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <nav class="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
          <RouterLink to="/" class="hover:text-white">Home</RouterLink>
          <span>/</span>
          <span class="text-white/80">{{ degree.name }}</span>
        </nav>
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson font-display text-xl font-extrabold text-white">
          {{ degree.letter }}
        </span>
        <h1 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight sm:text-4xl">{{ degree.label }}</h1>
        <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60">
          Explore {{ degree.name.toLowerCase() }} programmes at Chinese universities — many with scholarships for Bangladeshi students.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouterLink to="/tools/find-university" class="btn-primary w-full sm:w-auto">Find my university</RouterLink>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white sm:w-auto">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <h2 class="font-display text-xl font-extrabold text-ink">Universities offering {{ degree.name }} programmes</h2>
      <p class="mt-1 text-[14px] text-ink/50">Featured universities with scholarship options.</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
      </div>
      <RouterLink to="/universities" class="mt-6 inline-block text-[13px] font-semibold text-crimson hover:underline">
        Browse all universities →
      </RouterLink>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">Degree not found</h1>
    <RouterLink to="/" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Back to home</RouterLink>
  </div>
</template>
