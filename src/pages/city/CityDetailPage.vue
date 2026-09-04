<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchCityBySlug } from '../../api/cities.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()
const route = useRoute()
const loading = ref(true)
const error = ref('')
const city = ref(null)
const cityUnis = ref([])

async function load() {
  loading.value = true
  error.value = ''
  city.value = null
  cityUnis.value = []
  try {
    const result = await fetchCityBySlug(route.params.slug)
    city.value = result.city
    cityUnis.value = result.universities
    if (!result.city) error.value = 'City not found'
  } catch (e) {
    console.error(e)
    error.value = e.message || 'Could not load city'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.slug, load)

const region = computed(() => city.value?.region || 'China')
</script>

<template>
  <div class="site-container py-10">
    <div v-if="loading" class="space-y-4">
      <div class="h-40 animate-pulse rounded-2xl bg-gray-100" />
      <div class="grid gap-4 sm:grid-cols-3">
        <div v-for="n in 3" :key="n" class="h-24 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    </div>

    <div v-else-if="error || !city" class="rounded-2xl border border-gray-200 bg-white p-8 text-center">
      <h1 class="text-xl font-extrabold text-[var(--color-secondary)]">City not found</h1>
      <p class="mt-2 text-[14px] text-gray-500">{{ error || 'This city is not available yet.' }}</p>
      <RouterLink to="/cities" class="mt-4 inline-block text-[13px] font-semibold text-[var(--color-primary)]">Back to cities</RouterLink>
    </div>

    <template v-else>
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
        <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 class="text-lg font-extrabold text-[var(--color-secondary)]">Universities in {{ city.name }}</h2>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="text-[13px] font-semibold text-[#16A34A]">WhatsApp counselling</a>
        </div>
        <div v-if="cityUnis.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UniversityCard v-for="uni in cityUnis" :key="uni.slug" :university="uni" />
        </div>
        <p v-else class="rounded-2xl border border-dashed border-gray-200 p-6 text-[14px] text-gray-500">
          No universities linked to this city in admin yet.
        </p>
      </section>
    </template>
  </div>
</template>
