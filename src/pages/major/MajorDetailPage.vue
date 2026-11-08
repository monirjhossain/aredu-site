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
  <div class="site-container py-10">
    <div v-if="loading && !major" class="space-y-4">
      <div class="h-40 animate-pulse rounded-2xl bg-gray-100" />
      <div class="grid gap-4 sm:grid-cols-3">
        <div v-for="n in 3" :key="n" class="h-40 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    </div>

    <div v-else-if="(error || !major) && !loading" class="rounded-2xl border border-gray-200 bg-white p-8 text-center">
      <h1 class="text-xl font-extrabold text-[var(--color-secondary)]">Major not found</h1>
      <p class="mt-2 text-[14px] text-gray-500">{{ error || 'This major is not available yet.' }}</p>
      <RouterLink to="/majors" class="mt-4 inline-block text-[13px] font-semibold text-[var(--color-primary)]">Back to majors</RouterLink>
    </div>

    <template v-else>
      <nav class="mb-6 text-[12px] text-gray-400">
        <RouterLink to="/majors" class="hover:text-[var(--color-primary)]">Majors</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-[var(--color-secondary)]">{{ major.name }}</span>
      </nav>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <span class="inline-block rounded-full px-3 py-1 text-[11px] font-semibold" style="background: #eef1f6; color: var(--color-secondary)">
          {{ major.field }}
        </span>
        <h1 class="mt-3 text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">{{ major.name }}</h1>
        <p class="mt-4 max-w-2xl text-[14px] leading-relaxed text-gray-600">
          Study {{ major.name }} at Chinese universities.
          <template v-if="major.uniCount"> Currently linked to {{ major.uniCount }} partner universities.</template>
          Many programmes offer scholarships for Bangladeshi students.
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouterLink to="/tools/find-university" class="rounded-xl px-5 py-2.5 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
            Find universities for this major
          </RouterLink>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-center text-[13px] font-semibold text-white">
            WhatsApp us
          </a>
        </div>
      </div>

      <section class="mt-10">
        <h2 class="text-lg font-extrabold text-[var(--color-secondary)]">Universities offering this major</h2>
        <div v-if="relatedUnis.length" class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
        </div>
        <p v-else class="mt-4 rounded-2xl border border-dashed border-gray-200 p-6 text-[14px] text-gray-500">
          No universities linked to this major in admin yet.
        </p>
      </section>
    </template>
  </div>
</template>
