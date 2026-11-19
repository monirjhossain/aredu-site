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
  <div>
    <div v-if="loading" class="site-container py-10">
      <div class="h-40 animate-pulse rounded-[1.5rem] bg-ink/5" />
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div v-for="n in 3" :key="n" class="h-24 animate-pulse rounded-[1.35rem] bg-ink/5" />
      </div>
    </div>

    <div v-else-if="error || !city" class="site-container py-10">
      <div class="rounded-[1.5rem] bg-white p-8 text-center ring-1 ring-ink/8">
        <h1 class="font-display text-xl font-extrabold text-ink">City not found</h1>
        <p class="mt-2 text-[14px] text-ink/50">{{ error || 'This city is not available yet.' }}</p>
        <RouterLink to="/cities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Back to cities</RouterLink>
      </div>
    </div>

    <template v-else>
      <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
        <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
        <div class="relative site-container py-10 sm:py-14 lg:py-16">
          <nav class="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
            <RouterLink to="/cities" class="hover:text-white">Cities</RouterLink>
            <span>/</span>
            <span class="text-white/80">{{ city.name }}</span>
          </nav>
          <span class="inline-flex rounded-full bg-jade/20 px-3 py-1 text-[11px] font-semibold text-jade">
            {{ region }}
          </span>
          <h1 class="mt-3 font-display text-[1.7rem] font-extrabold leading-tight sm:text-4xl">Study in {{ city.name }}</h1>
          <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60">
            {{ city.desc || `${city.uniCount || cityUnis.length} universities in ${city.name} — explore programmes, scholarships and student life.` }}
          </p>
        </div>
      </section>

      <section class="site-container py-8 sm:py-10 lg:py-12">
        <div
          v-if="city.image"
          class="mb-6 overflow-hidden rounded-[1.5rem] bg-cover bg-center ring-1 ring-ink/8 sm:mb-8"
          :style="{ aspectRatio: '21 / 9', backgroundImage: `url('${city.image}')` }"
        ></div>

        <div class="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div class="rounded-[1.35rem] bg-white p-5 text-center ring-1 ring-ink/8">
            <div class="font-display text-2xl font-extrabold text-ink">{{ city.uniCount || cityUnis.length }}</div>
            <div class="mt-1 text-[12px] text-ink/40">Universities</div>
          </div>
          <div class="rounded-[1.35rem] bg-white p-5 text-center ring-1 ring-ink/8">
            <div class="font-display text-2xl font-extrabold text-ink">{{ cityUnis.filter((u) => u.scholarship).length }}</div>
            <div class="mt-1 text-[12px] text-ink/40">With scholarships</div>
          </div>
          <div class="rounded-[1.35rem] bg-white p-5 text-center ring-1 ring-ink/8">
            <div class="font-display text-2xl font-extrabold text-ink">Safe</div>
            <div class="mt-1 text-[12px] text-ink/40">Student-friendly city</div>
          </div>
        </div>

        <div class="mt-10 mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 class="font-display text-lg font-extrabold text-ink sm:text-xl">Universities in {{ city.name }}</h2>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="text-[13px] font-semibold text-[#16A34A]">WhatsApp counselling</a>
        </div>
        <div v-if="cityUnis.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UniversityCard v-for="uni in cityUnis" :key="uni.slug" :university="uni" />
        </div>
        <p v-else class="rounded-[1.35rem] border border-dashed border-ink/15 bg-white p-6 text-[14px] text-ink/50">
          No universities linked to this city in admin yet.
        </p>
      </section>
    </template>
  </div>
</template>
