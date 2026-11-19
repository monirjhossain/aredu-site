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

const facts = computed(() => {
  if (!scholarship.value) return []
  return [
    { icon: 'ti-map-pin', label: 'City / location', value: scholarship.value.city || 'China' },
    { icon: 'ti-school', label: 'Degree', value: scholarship.value.degree || '—' },
    { icon: 'ti-language', label: 'Teaching language', value: scholarship.value.teachingLanguage || '—' },
    { icon: 'ti-calendar-event', label: 'Intake', value: scholarship.value.intake || '—' },
    { icon: 'ti-rosette-discount-check', label: 'Scholarship type', value: scholarship.value.scholarshipType || '—' },
    { icon: 'ti-clock', label: 'Deadline', value: scholarship.value.deadline || '—' },
  ]
})

const highlights = computed(() => {
  if (!scholarship.value) return []
  return [
    { label: 'Coverage', value: scholarship.value.coverage || 'Varies', note: 'Typical award level' },
    {
      label: 'Universities',
      value: scholarship.value.universities ? `${scholarship.value.universities}+` : 'Ask us',
      note: 'Partner / tagged options',
    },
    { label: 'Program ID', value: scholarship.value.programId || '—', note: 'Admin reference' },
  ]
})

const includes = computed(() => {
  if (!scholarship.value) return []
  if (scholarship.value.coverage === 'Full') {
    return [
      'Tuition fee support',
      'Dormitory or accommodation support',
      'Monthly stipend potential',
      'Application planning guidance',
      'Document checklist in Bangla',
    ]
  }
  if (scholarship.value.coverage === 'Partial') {
    return [
      'Partial tuition reduction',
      'Selected university funding routes',
      'Profile-based shortlisting',
      'Application support and review',
      'Counsellor guidance before apply',
    ]
  }
  return [
    'Funding route preview',
    'University-specific scholarship opportunities',
    'Shortlist support',
    'Guidance on improving scholarship fit',
    'End-to-end counselling from Bangladesh',
  ]
})

const steps = [
  { num: '01', title: 'Check fit', desc: 'Match degree, language, GPA and intake with this award.' },
  { num: '02', title: 'Shortlist', desc: 'Compare partner universities and required documents.' },
  { num: '03', title: 'Apply', desc: 'Submit with AR Education support and track next steps.' },
]

const hasHtmlContent = computed(() => {
  const html = scholarship.value?.content || ''
  return html.replace(/<[^>]*>/g, '').trim().length > 0
})
</script>

<template>
  <div>
    <div v-if="loading && !scholarship" class="site-container py-10">
      <div class="h-64 animate-pulse rounded-[1.75rem] bg-[#EEF1F4]"></div>
      <div class="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="h-80 animate-pulse rounded-[1.5rem] bg-[#EEF1F4]"></div>
        <div class="h-80 animate-pulse rounded-[1.5rem] bg-[#EEF1F4]"></div>
      </div>
    </div>

    <div v-else-if="(error || !scholarship) && !loading" class="site-container max-w-lg py-20 text-center">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson/10 text-crimson">
        <i class="ti ti-file-off text-[24px]"></i>
      </div>
      <h1 class="mt-4 font-display text-2xl font-extrabold text-ink">Scholarship not found</h1>
      <p class="mt-2 text-[14px] text-ink/50">{{ error || 'This scholarship may have been removed or renamed.' }}</p>
      <RouterLink
        to="/scholarships"
        class="mt-6 inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white"
      >
        Back to scholarships
        <i class="ti ti-arrow-right"></i>
      </RouterLink>
    </div>

    <template v-else>
      <section class="relative overflow-hidden text-white">
        <img
          v-if="scholarship.image"
          :src="scholarship.image"
          :alt="scholarship.name"
          class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          loading="eager"
          decoding="async"
        />
        <div
          class="pointer-events-none absolute inset-0"
          :class="
            scholarship.image
              ? 'bg-[linear-gradient(105deg,rgba(8,16,32,0.9)_0%,rgba(10,22,40,0.82)_55%,rgba(10,22,40,0.75)_100%)]'
              : 'bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67]'
          "
        ></div>
        <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
        <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-crimson/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-jade/20 blur-3xl"></div>

        <div class="relative site-container py-10 sm:py-14 lg:py-16">
          <nav class="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/45">
            <RouterLink to="/" class="hover:text-white">Home</RouterLink>
            <span>/</span>
            <RouterLink to="/scholarships" class="hover:text-white">Scholarships</RouterLink>
            <span>/</span>
            <span class="line-clamp-1 text-white/80">{{ scholarship.name }}</span>
          </nav>

          <div class="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                  Scholarship profile
                </span>
                <span
                  v-if="scholarship.scholarshipType"
                  class="rounded-full bg-crimson px-3 py-1 text-[11px] font-bold text-white"
                >
                  {{ scholarship.scholarshipType }}
                </span>
                <span class="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink">
                  {{ scholarship.coverage || 'Varies' }} coverage
                </span>
              </div>

              <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
                {{ scholarship.name }}
              </h1>
              <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
                {{
                  scholarship.desc ||
                  'Compare coverage, intake and eligibility — then apply with AR Education counselling support from Bangladesh.'
                }}
              </p>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <RouterLink
                  :to="`/scholarships/${scholarship.slug}/apply`"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                >
                  Apply now
                  <i class="ti ti-arrow-right"></i>
                </RouterLink>
                <RouterLink
                  to="/tools/scholarship-checker"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink"
                >
                  Check eligibility
                </RouterLink>
                <a
                  :href="WHATSAPP"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white"
                >
                  <i class="ti ti-brand-whatsapp text-[16px]"></i>
                  WhatsApp counsellor
                </a>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div
                v-for="item in highlights"
                :key="item.label"
                class="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur-sm"
              >
                <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">{{ item.label }}</div>
                <div class="mt-1 font-display text-xl font-extrabold leading-snug">{{ item.value }}</div>
                <div class="mt-1 text-[12px] text-white/50">{{ item.note }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="site-container py-10 lg:py-12">
        <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div class="space-y-6">
            <div class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Key facts</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Program snapshot</h2>
              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <div
                  v-for="fact in facts"
                  :key="fact.label"
                  class="rounded-2xl bg-[#F7F8FA] px-4 py-4"
                >
                  <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/35">
                    <i class="ti text-[14px] text-crimson" :class="fact.icon"></i>
                    {{ fact.label }}
                  </div>
                  <div class="mt-2 whitespace-pre-line text-[14px] font-semibold text-ink">{{ fact.value }}</div>
                </div>
              </div>
            </div>

            <div class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">Benefits</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">What this award typically includes</h2>
              <ul class="mt-6 grid gap-3 sm:grid-cols-2">
                <li
                  v-for="line in includes"
                  :key="line"
                  class="flex items-start gap-3 rounded-2xl bg-[#F7FAF9] px-4 py-3.5 text-[14px] text-ink/70"
                >
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-jade/15 text-jade">
                    <i class="ti ti-check text-[14px]"></i>
                  </span>
                  <span>{{ line }}</span>
                </li>
              </ul>
            </div>

            <div v-if="hasHtmlContent" class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">Overview</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">About this scholarship</h2>
              <div
                class="prose-scholarship mt-5 max-w-none text-[14.5px] leading-relaxed text-ink/65"
                v-html="scholarship.content"
              ></div>
            </div>

            <div class="rounded-[1.5rem] bg-[#FBFAF7] p-6 ring-1 ring-ink/8 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">How it works</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">From shortlist to application</h2>
              <div class="mt-6 grid gap-4 sm:grid-cols-3">
                <div
                  v-for="step in steps"
                  :key="step.num"
                  class="rounded-2xl bg-white p-5 ring-1 ring-ink/8"
                >
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-crimson font-display text-[13px] font-extrabold text-white">
                    {{ step.num }}
                  </div>
                  <h3 class="mt-4 font-display text-[1.05rem] font-bold text-ink">{{ step.title }}</h3>
                  <p class="mt-2 text-[13px] leading-relaxed text-ink/50">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <aside class="space-y-5 lg:sticky lg:top-24">
            <div class="overflow-hidden rounded-[1.5rem] bg-ink p-6 text-white">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Ready to apply?</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold">Start this scholarship route</h2>
              <p class="mt-3 text-[13.5px] leading-relaxed text-white/55">
                Apply online or message a counsellor — we guide documents, university choice and next steps in Bangla.
              </p>
              <div class="mt-6 space-y-2.5">
                <RouterLink
                  :to="`/scholarships/${scholarship.slug}/apply`"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3.5 text-[13px] font-semibold text-white transition hover:brightness-110"
                >
                  Apply for this scholarship
                  <i class="ti ti-arrow-right"></i>
                </RouterLink>
                <RouterLink
                  to="/tools/scholarship-checker"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-[13px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                >
                  Run eligibility checker
                </RouterLink>
                <a
                  :href="WHATSAPP"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3.5 text-[13px] font-semibold text-white"
                >
                  <i class="ti ti-brand-whatsapp text-[16px]"></i>
                  WhatsApp counsellor
                </a>
              </div>
            </div>

            <div class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8">
              <div class="flex items-center justify-between gap-3">
                <div>
                  <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">Related universities</div>
                  <h3 class="mt-1 font-display text-lg font-extrabold text-ink">Where this may apply</h3>
                </div>
                <RouterLink to="/universities" class="text-[12px] font-semibold text-crimson hover:underline">
                  Browse all
                </RouterLink>
              </div>

              <div v-if="relatedUnis.length" class="mt-4 grid gap-3">
                <UniversityCard v-for="uni in relatedUnis.slice(0, 3)" :key="uni.slug" :university="uni" />
              </div>
              <p v-else class="mt-4 rounded-2xl border border-dashed border-ink/10 bg-[#F7F8FA] px-4 py-5 text-[13px] text-ink/50">
                Related universities will appear here when tagged in admin. Ask us for a shortlist matched to this award.
              </p>
            </div>

            <RouterLink
              to="/scholarships"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA]"
            >
              <i class="ti ti-arrow-left"></i>
              All scholarships
            </RouterLink>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.prose-scholarship :deep(p) {
  margin-bottom: 0.85rem;
}
.prose-scholarship :deep(ul),
.prose-scholarship :deep(ol) {
  margin: 0.75rem 0 1rem;
  padding-left: 1.2rem;
}
.prose-scholarship :deep(li) {
  margin-bottom: 0.35rem;
}
.prose-scholarship :deep(h2),
.prose-scholarship :deep(h3) {
  margin: 1.2rem 0 0.5rem;
  font-weight: 800;
  color: #0a1628;
}
.prose-scholarship :deep(a) {
  color: #e11d2e;
  font-weight: 600;
}
</style>
