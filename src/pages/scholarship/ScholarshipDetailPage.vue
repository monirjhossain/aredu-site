<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { SCHOLARSHIP_META, WHATSAPP } from '../../data/site.js'
import scholarships from '../../data/scholarships.json'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()

const scholarship = computed(() => scholarships.find((s) => s.slug === route.params.slug))
const meta = computed(() => (scholarship.value ? SCHOLARSHIP_META[scholarship.value.slug] : null))

const relatedUnis = computed(() => {
  if (!scholarship.value) return []
  return universities.filter((u) => u.scholarship).slice(0, 6)
})

const highlights = computed(() => {
  if (!meta.value) return []
  return [
    { label: 'Coverage', value: meta.value.coverage, note: 'Award type preview' },
    { label: 'Universities', value: `${meta.value.universities}+`, note: 'Approximate partner options' },
    { label: 'Best next step', value: 'Check eligibility', note: 'Match your GPA and degree' },
  ]
})

const includes = computed(() => {
  if (!meta.value) return []
  if (meta.value.coverage === 'Full') {
    return ['Tuition fee support', 'Dormitory or accommodation support', 'Monthly stipend potential', 'Application planning guidance']
  }
  if (meta.value.coverage === 'Partial') {
    return ['Partial tuition reduction', 'Selected university funding routes', 'Profile-based shortlisting', 'Application support and review']
  }
  return ['Funding route preview', 'University-specific scholarship opportunities', 'Shortlist support', 'Guidance on improving scholarship fit']
})
</script>

<template>
  <div v-if="scholarship">
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
              <span
                v-if="meta"
                class="rounded-full bg-jade/20 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/10"
              >
                {{ meta.coverage }} coverage
              </span>
            </div>
            <h1 class="mt-5 max-w-3xl font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {{ scholarship.name }}
            </h1>
            <p v-if="meta" class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              {{ meta.desc }}
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RouterLink to="/tools/scholarship-checker" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-sand sm:w-auto">
                Check my eligibility
              </RouterLink>
              <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110 sm:w-auto">
                <i class="ti ti-brand-whatsapp"></i>
                WhatsApp us
              </a>
            </div>
          </div>

          <div class="rounded-[1.75rem] bg-white/10 p-5 ring-1 ring-white/12 backdrop-blur sm:p-6">
            <div class="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Funding snapshot</div>
            <div class="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div
                v-for="item in highlights"
                :key="item.label"
                class="rounded-2xl bg-white/8 px-4 py-4 ring-1 ring-white/10"
              >
                <div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">{{ item.label }}</div>
                <div class="mt-2 font-display text-[1.2rem] font-extrabold text-white">{{ item.value }}</div>
                <div class="mt-1 text-[12px] text-white/50">{{ item.note }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 sm:py-12">
      <div class="site-container grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">What this scholarship can include</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Funding support at a glance</h2>
          <div class="mt-5 space-y-3">
            <div
              v-for="item in includes"
              :key="item"
              class="flex items-start gap-3 rounded-2xl bg-[#F7F8FA] px-4 py-3.5"
            >
              <span class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-crimson text-white">
                <i class="ti ti-check text-[14px]"></i>
              </span>
              <span class="text-[14px] leading-relaxed text-ink/75">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-[1.75rem] bg-[#F7FAF9] p-6 ring-1 ring-jade/10 sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">Best next step</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Check your real fit first</h2>
          <p class="mt-3 text-[14px] leading-relaxed text-ink/55">
            Scholarship results depend on GPA, degree level, programme choice and university-specific competition. Use the checker before building your shortlist.
          </p>

          <div class="mt-6 rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/6">
            <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">Recommended route</div>
            <div class="mt-2 font-display text-lg font-extrabold text-ink">Checker → shortlist → apply</div>
            <p class="mt-2 text-[13px] leading-relaxed text-ink/50">
              Start with eligibility, then compare scholarship-friendly universities and prepare your application with guidance.
            </p>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <RouterLink to="/tools/scholarship-checker" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110 sm:w-auto">
              Try scholarship checker
            </RouterLink>
            <RouterLink to="/contact" class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-[#F7F8FA] sm:w-auto">
              Talk to a counsellor
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-14 sm:pb-16">
      <div class="site-container">
        <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Universities</div>
            <h2 class="mt-2 font-display text-xl font-extrabold text-ink sm:text-2xl">Universities offering this scholarship</h2>
          </div>
          <RouterLink to="/universities" class="text-[13px] font-semibold text-crimson">Browse all →</RouterLink>
        </div>
        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
        </div>
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">Scholarship not found</h1>
    <RouterLink to="/scholarships" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Browse scholarships</RouterLink>
  </div>
</template>
