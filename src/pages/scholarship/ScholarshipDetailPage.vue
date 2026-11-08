<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchScholarshipBySlug, mapScholarship } from '../../api/scholarships.js'
import { mapPostToUniversity } from '../../api/universities.js'
import { buildApiPath, peekApi, subscribeApi } from '../../api/client.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()
const route = useRoute()
const loading = ref(true)
const error = ref('')
const scholarship = ref(null)
const relatedUnis = ref([])
let unsub = null

function applyPayload(payload) {
  if (!payload?.data) return
  if (payload.data.scholarship) scholarship.value = mapScholarship(payload.data.scholarship)
  if (Array.isArray(payload.data.universities)) {
    relatedUnis.value = payload.data.universities.map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
  }
}

async function load() {
  const slug = route.params.slug
  const path = buildApiPath(`/scholarships/${encodeURIComponent(slug)}`)
  error.value = ''
  if (unsub) unsub()
  unsub = subscribeApi(path, applyPayload)

  const cached = peekApi(path)
  if (cached?.data?.scholarship) {
    applyPayload(cached)
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const result = await fetchScholarshipBySlug(slug)
    scholarship.value = result.scholarship
    relatedUnis.value = result.universities
    if (!result.scholarship && !scholarship.value) error.value = 'Scholarship not found'
  } catch (e) {
    console.error(e)
    if (!scholarship.value) error.value = e.message || 'Could not load scholarship'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.slug, load)
onUnmounted(() => {
  if (unsub) unsub()
})

const highlights = computed(() => {
  if (!scholarship.value) return []
  return [
    { label: 'Coverage', value: scholarship.value.coverage, note: 'Award type preview' },
    { label: 'Universities', value: `${scholarship.value.universities}+`, note: 'Approximate partner options' },
    { label: 'Best next step', value: 'Check eligibility', note: 'Match your GPA and degree' },
  ]
})

const includes = computed(() => {
  if (!scholarship.value) return []
  if (scholarship.value.coverage === 'Full') {
    return ['Tuition fee support', 'Dormitory or accommodation support', 'Monthly stipend potential', 'Application planning guidance']
  }
  if (scholarship.value.coverage === 'Partial') {
    return ['Partial tuition reduction', 'Selected university funding routes', 'Profile-based shortlisting', 'Application support and review']
  }
  return ['Funding route preview', 'University-specific scholarship opportunities', 'Shortlist support', 'Guidance on improving scholarship fit']
})
</script>

<template>
  <div>
    <div v-if="loading && !scholarship" class="site-container py-10">
      <div class="h-56 animate-pulse rounded-2xl bg-gray-100" />
    </div>

    <div v-else-if="(error || !scholarship) && !loading" class="site-container py-10">
      <div class="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <h1 class="text-xl font-extrabold text-[var(--color-secondary)]">Scholarship not found</h1>
        <p class="mt-2 text-[14px] text-gray-500">{{ error }}</p>
        <RouterLink to="/scholarships" class="mt-4 inline-block text-[13px] font-semibold text-[var(--color-primary)]">Back to scholarships</RouterLink>
      </div>
    </div>

    <template v-else>
      <section class="relative overflow-hidden text-white" :style="{ background: 'linear-gradient(145deg, #0A1628 0%, #12324d 48%, #0f766e 160%)' }">
        <div class="pointer-events-none absolute inset-0 texture-grid opacity-30"></div>
        <div class="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative site-container py-10 sm:py-14 lg:py-16">
          <nav class="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/45">
            <RouterLink to="/" class="hover:text-white">Home</RouterLink>
            <span>/</span>
            <RouterLink to="/scholarships" class="hover:text-white">Scholarships</RouterLink>
            <span>/</span>
            <span class="text-white/80">{{ scholarship.name }}</span>
          </nav>

          <div class="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                  Scholarship profile
                </span>
                <span class="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink">{{ scholarship.coverage }}</span>
              </div>
              <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
                {{ scholarship.name }}
              </h1>
              <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
                {{ scholarship.desc }}
              </p>
              <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <RouterLink to="/tools/scholarship-checker" class="rounded-xl bg-white px-5 py-2.5 text-center text-[13px] font-semibold text-ink">
                  Check eligibility
                </RouterLink>
                <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-center text-[13px] font-semibold text-white">
                  WhatsApp counsellor
                </a>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div v-for="item in highlights" :key="item.label" class="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">{{ item.label }}</div>
                <div class="mt-1 font-display text-xl font-extrabold">{{ item.value }}</div>
                <div class="mt-1 text-[12px] text-white/50">{{ item.note }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="site-container py-10">
        <div class="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div class="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 class="text-lg font-extrabold text-[var(--color-secondary)]">What this award typically includes</h2>
            <ul class="mt-4 space-y-2">
              <li v-for="line in includes" :key="line" class="flex items-start gap-2 text-[14px] text-gray-600">
                <i class="ti ti-check text-[16px] text-jade mt-0.5"></i>
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-lg font-extrabold text-[var(--color-secondary)]">Related universities</h2>
            <div v-if="relatedUnis.length" class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
            </div>
            <p v-else class="mt-4 rounded-2xl border border-dashed border-gray-200 p-6 text-[14px] text-gray-500">
              Related university list will grow as more scholarship tags are added in admin.
            </p>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
