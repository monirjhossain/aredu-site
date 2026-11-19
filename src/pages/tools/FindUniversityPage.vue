<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUniversitiesCatalog } from '../../composables/useUniversitiesCatalog.js'
import { useSiteCatalogs } from '../../composables/useSiteCatalogs.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const step = ref(1)
const answers = ref({
  degree: '',
  field: '',
  budget: '',
  city: '',
})

const { degrees: DEGREES, fieldGroups } = useSiteCatalogs()
const { items: universities, loading, load } = useUniversitiesCatalog()
onMounted(() => load())

const fields = computed(() => {
  const groups = fieldGroups.value || []
  const preferred = [
    'Engineering & Technology',
    'Computer Science & IT',
    'Business & Economics',
    'Chinese Language & Preparatory',
  ]
  const picked = preferred.filter((name) => groups.includes(name))
  const base = picked.length ? picked : groups.slice(0, 5)
  return [...base, 'Medicine / MBBS', 'Any field'].filter((v, i, arr) => arr.indexOf(v) === i)
})

const budgets = [
  { value: 'low', label: 'Budget-friendly (under ¥15k/year)' },
  { value: 'mid', label: 'Moderate (¥15k–25k/year)' },
  { value: 'high', label: 'Premium (¥25k+/year)' },
]

const cityPrefs = [
  { value: 'tier1', label: 'Major cities (Beijing, Shanghai, etc.)' },
  { value: 'tier2', label: 'Regional hubs' },
  { value: 'any', label: 'No preference' },
]

const tier1Cities = ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'hangzhou', 'nanjing']

const matched = computed(() => {
  if (step.value < 5) return []
  let list = [...universities.value]

  if (answers.value.city === 'tier1') {
    list = list.filter((u) => tier1Cities.includes((u.city || '').toLowerCase()))
  }

  if (answers.value.budget === 'low') {
    list = list.filter((u) => u.ranking > 30)
  } else if (answers.value.budget === 'high') {
    list = list.filter((u) => u.ranking <= 30)
  }

  if (answers.value.field === 'Medicine / MBBS') {
    list = list.filter((u) => /medical|medicine|mbbs/i.test(u.name || ''))
  } else if (answers.value.field === 'Engineering & Technology') {
    list = list.filter((u) => /engineer|technolog|polytechnic/i.test(u.name || '') || u.scholarship)
  } else if (answers.value.field === 'Computer Science & IT') {
    list = list.filter((u) => /computer|software|information|digital/i.test(u.name || '') || u.scholarship)
  }

  list.sort((a, b) => {
    const scoreA = (a.scholarship ? 10 : 0) + (100 - (a.ranking || 50)) / 10
    const scoreB = (b.scholarship ? 10 : 0) + (100 - (b.ranking || 50)) / 10
    return scoreB - scoreA
  })

  return list.slice(0, 6)
})

function next() {
  if (step.value < 4) step.value++
  else step.value = 5
}

function back() {
  if (step.value > 1) step.value--
}

function restart() {
  step.value = 1
  answers.value = { degree: '', field: '', budget: '', city: '' }
}

const canNext = computed(() => {
  if (step.value === 1) return !!answers.value.degree
  if (step.value === 2) return !!answers.value.field
  if (step.value === 3) return !!answers.value.budget
  if (step.value === 4) return !!answers.value.city
  return true
})

const degreeLabel = computed(() => DEGREES.value.find((d) => d.slug === answers.value.degree)?.name || 'Not selected')
const budgetLabel = computed(() => budgets.find((b) => b.value === answers.value.budget)?.label || 'Not selected')
const cityLabel = computed(() => cityPrefs.find((c) => c.value === answers.value.city)?.label || 'Not selected')
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-map-search text-[14px]"></i>
            Free tool
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Find your best-fit university in China.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Answer four quick questions and get a smarter shortlist based on degree level, study field, budget and city preference.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3 text-[12px] text-white/55">
          <span class="rounded-full bg-white/10 px-3 py-1">4-step matcher</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Scholarship-aware ranking</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Built for BD students</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-12 lg:py-14">
      <div v-if="step < 5" class="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <aside class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Your shortlist builder</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">One answer at a time.</h2>
          <p class="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/55">
            Pick the path that matches your profile. We use your choices to surface a more practical university shortlist.
          </p>

          <div class="mt-7 space-y-3">
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Degree</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ degreeLabel }}</div>
            </div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Field</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ answers.field || 'Not selected' }}</div>
            </div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Budget</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ budgetLabel }}</div>
            </div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">City preference</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ cityLabel }}</div>
            </div>
          </div>

          <div class="mt-7">
            <div class="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              <span>Progress</span>
              <span>Step {{ step }} of 4</span>
            </div>
            <div class="flex gap-2">
              <div
                v-for="s in 4"
                :key="s"
                class="h-2 flex-1 rounded-full transition"
                :class="s <= step ? 'bg-crimson' : 'bg-white/10'"
              ></div>
            </div>
          </div>
        </aside>

        <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
          <div class="flex flex-col gap-2 border-b border-ink/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Step {{ step }}</div>
              <h2 v-if="step === 1" class="mt-2 font-display text-2xl font-extrabold text-ink">What degree are you pursuing?</h2>
              <h2 v-else-if="step === 2" class="mt-2 font-display text-2xl font-extrabold text-ink">What field of study?</h2>
              <h2 v-else-if="step === 3" class="mt-2 font-display text-2xl font-extrabold text-ink">What's your budget?</h2>
              <h2 v-else class="mt-2 font-display text-2xl font-extrabold text-ink">City preference?</h2>
            </div>
            <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[12px] font-medium text-ink/50 ring-1 ring-ink/6">
              Answer to continue
            </div>
          </div>

          <div v-if="step === 1" class="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              v-for="deg in DEGREES"
              :key="deg.slug"
              type="button"
              class="rounded-[1.35rem] border px-4 py-4 text-left transition sm:px-5"
              :class="answers.degree === deg.slug ? 'border-crimson bg-crimson/5 shadow-soft' : 'border-ink/10 hover:border-ink/20 hover:bg-[#F9FAFB]'"
              @click="answers.degree = deg.slug"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-display text-[15px] font-bold text-ink">{{ deg.name }}</div>
                  <div class="mt-1 text-[12px] text-ink/45">Degree route in China</div>
                </div>
                <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F8FA] font-display text-lg font-extrabold text-crimson">
                  {{ deg.letter }}
                </span>
              </div>
            </button>
          </div>

          <div v-else-if="step === 2" class="mt-6 grid gap-3">
            <button
              v-for="field in fields"
              :key="field"
              type="button"
              class="rounded-[1.35rem] border px-4 py-4 text-left text-[13px] font-semibold transition sm:px-5"
              :class="answers.field === field ? 'border-crimson bg-crimson/5 text-crimson shadow-soft' : 'border-ink/10 text-ink hover:border-ink/20 hover:bg-[#F9FAFB]'"
              @click="answers.field = field"
            >
              {{ field }}
            </button>
          </div>

          <div v-else-if="step === 3" class="mt-6 grid gap-3">
            <button
              v-for="b in budgets"
              :key="b.value"
              type="button"
              class="rounded-[1.35rem] border px-4 py-4 text-left transition sm:px-5"
              :class="answers.budget === b.value ? 'border-crimson bg-crimson/5 shadow-soft' : 'border-ink/10 hover:border-ink/20 hover:bg-[#F9FAFB]'"
              @click="answers.budget = b.value"
            >
              <div class="font-display text-[15px] font-bold text-ink">{{ b.label }}</div>
              <div class="mt-1 text-[12px] text-ink/45">
                {{ b.value === 'low' ? 'Best for affordable universities' : b.value === 'mid' ? 'Balanced route with more options' : 'Top-ranked and premium campus options' }}
              </div>
            </button>
          </div>

          <div v-else class="mt-6 grid gap-3">
            <button
              v-for="c in cityPrefs"
              :key="c.value"
              type="button"
              class="rounded-[1.35rem] border px-4 py-4 text-left transition sm:px-5"
              :class="answers.city === c.value ? 'border-crimson bg-crimson/5 shadow-soft' : 'border-ink/10 hover:border-ink/20 hover:bg-[#F9FAFB]'"
              @click="answers.city = c.value"
            >
              <div class="font-display text-[15px] font-bold text-ink">{{ c.label }}</div>
              <div class="mt-1 text-[12px] text-ink/45">
                {{ c.value === 'tier1' ? 'Big-city lifestyle and larger international communities' : c.value === 'tier2' ? 'Better value with strong regional campuses' : 'We will prioritize overall fit first' }}
              </div>
            </button>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              v-if="step > 1"
              type="button"
              class="rounded-xl border border-ink/10 px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA]"
              @click="back"
            >
              Back
            </button>
            <button
              type="button"
              class="flex-1 rounded-xl bg-crimson py-3 text-[13px] font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
              :disabled="!canNext"
              @click="next"
            >
              {{ step === 4 ? 'See my matches' : 'Continue' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="space-y-6">
        <div class="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/8">
          <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">
                <i class="ti ti-sparkles text-[14px]"></i>
                Your shortlist is ready
              </div>
              <h2 class="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">Best-fit universities for your profile</h2>
              <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/50">
                Based on <span class="font-semibold text-ink">{{ degreeLabel }}</span>, <span class="font-semibold text-ink">{{ answers.field }}</span>, <span class="font-semibold text-ink">{{ budgetLabel }}</span> and <span class="font-semibold text-ink">{{ cityLabel }}</span>.
              </p>
              <p v-if="loading" class="mt-2 text-[12px] text-ink/40">Refreshing university list…</p>
            </div>

            <button
              type="button"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA] sm:w-auto"
              @click="restart"
            >
              <i class="ti ti-rotate-clockwise-2"></i>
              Start over
            </button>
          </div>
        </div>

        <div v-if="matched.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <UniversityCard v-for="uni in matched" :key="uni.slug" :university="uni" />
        </div>

        <div v-else class="rounded-[1.75rem] bg-white p-8 text-center ring-1 ring-ink/8">
          <div class="font-display text-2xl font-extrabold text-ink">No exact match found</div>
          <p class="mt-2 text-[14px] text-ink/50">Try changing budget or city preference and run the matcher again.</p>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 rounded-[1.75rem] bg-ink px-6 py-7 text-white sm:flex-row sm:px-8">
          <div class="text-center sm:text-left">
            <div class="font-display text-xl font-extrabold">Want a human shortlist too?</div>
            <p class="mt-1 text-[13px] text-white/55">Our counsellors can refine this list by scholarship chance, budget and subject fit.</p>
          </div>
          <RouterLink
            to="/contact"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-6 py-3 text-[13px] font-semibold text-white transition hover:brightness-110 sm:w-auto"
          >
            Talk to a counsellor
            <i class="ti ti-arrow-right"></i>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
