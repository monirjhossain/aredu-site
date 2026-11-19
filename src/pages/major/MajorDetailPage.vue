<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchMajorBySlug, mapSubject } from '../../api/majors.js'
import { mapPostToUniversity } from '../../api/universities.js'
import { buildApiPath, peekApi, subscribeApi } from '../../api/client.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()
const route = useRoute()
const loading = ref(true)
const error = ref('')
const major = ref(null)
const relatedUnis = ref([])
let unsub = null

function applyPayload(payload) {
  if (!payload?.data) return
  if (payload.data.subject) major.value = mapSubject(payload.data.subject)
  if (Array.isArray(payload.data.universities)) {
    relatedUnis.value = payload.data.universities.map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
  }
}

async function load() {
  const slug = route.params.slug
  const path = buildApiPath(`/majors/${encodeURIComponent(slug)}`)
  error.value = ''
  if (unsub) unsub()
  unsub = subscribeApi(path, applyPayload)

  const cached = peekApi(path)
  if (cached?.data?.subject) {
    applyPayload(cached)
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const result = await fetchMajorBySlug(slug)
    major.value = result.major
    relatedUnis.value = result.universities
    if (!result.major && !major.value) error.value = 'Major not found'
  } catch (e) {
    console.error(e)
    if (!major.value) error.value = e.message || 'Could not load major'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.slug, load)
onUnmounted(() => {
  if (unsub) unsub()
})
</script>

<template>
  <div>
    <div v-if="loading && !major" class="site-container py-10">
      <div class="h-48 animate-pulse rounded-[1.5rem] bg-ink/5" />
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div v-for="n in 3" :key="n" class="h-40 animate-pulse rounded-[1.35rem] bg-ink/5" />
      </div>
    </div>

    <div v-else-if="(error || !major) && !loading" class="site-container py-10">
      <div class="rounded-[1.5rem] bg-white p-8 text-center ring-1 ring-ink/8">
        <h1 class="font-display text-xl font-extrabold text-ink">Major not found</h1>
        <p class="mt-2 text-[14px] text-ink/50">{{ error || 'This major is not available yet.' }}</p>
        <RouterLink to="/majors" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Back to majors</RouterLink>
      </div>
    </div>

    <template v-else>
      <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
        <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
        <div class="relative site-container py-10 sm:py-14">
          <nav class="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
            <RouterLink to="/majors" class="hover:text-white">Majors</RouterLink>
            <span>/</span>
            <span class="text-white/80">{{ major.name }}</span>
          </nav>
          <span class="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/75">
            {{ major.field }}
          </span>
          <h1 class="mt-3 font-display text-[1.7rem] font-extrabold leading-tight sm:text-4xl">{{ major.name }}</h1>
          <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60">
            Study {{ major.name }} at Chinese universities.
            <template v-if="major.uniCount"> Currently linked to {{ major.uniCount }} partner universities.</template>
            Many programmes offer scholarships for Bangladeshi students.
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RouterLink to="/tools/find-university" class="btn-primary w-full sm:w-auto">Find universities for this major</RouterLink>
            <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white sm:w-auto">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section class="site-container py-8 sm:py-10 lg:py-12">
        <h2 class="font-display text-lg font-extrabold text-ink sm:text-xl">Universities offering this major</h2>
        <div v-if="relatedUnis.length" class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
        </div>
        <p v-else class="mt-5 rounded-[1.35rem] border border-dashed border-ink/15 bg-white p-6 text-[14px] text-ink/50">
          No universities linked to this major in admin yet.
        </p>
      </section>
    </template>
  </div>
</template>
