<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSiteSettings } from '../composables/useSiteSettings.js'
import { fetchScholarshipOptions, fetchScholarships, mapScholarship } from '../api/scholarships.js'
import { buildApiPath, peekApi } from '../api/client.js'
import { prefetchScholarship } from '../api/prefetch.js'
import NeedHelpBanner from '../components/ui/NeedHelpBanner.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()

const loading = ref(true)
const error = ref('')
const scholarships = ref([])
const options = ref({ degree: [], language: [], intake: [], scholarship_type: [] })
const query = ref('')
const filters = ref({
  degree: '',
  language: '',
  intake: '',
  scholarship_type: '',
})
const filtersOpen = ref(false)

onMounted(async () => {
  error.value = ''
  const cached = peekApi(buildApiPath('/scholarships', { per_page: 100, page: 1 }))
  if (cached?.data?.scholarships?.data?.length) {
    scholarships.value = cached.data.scholarships.data.map(mapScholarship).filter(Boolean)
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const [result, optionLists] = await Promise.all([
      fetchScholarships({ perPage: 100 }),
      fetchScholarshipOptions(),
    ])
    scholarships.value = result.items
    options.value = { ...options.value, ...optionLists }
  } catch (e) {
    console.error(e)
    if (!scholarships.value.length) error.value = e.message || 'Could not load scholarships'
  } finally {
    loading.value = false
  }
})

const activeFilterCount = computed(() =>
  [filters.value.degree, filters.value.language, filters.value.intake, filters.value.scholarship_type, query.value.trim()].filter(
    Boolean,
  ).length,
)

const rows = computed(() => {
  const q = query.value.trim().toLowerCase()
  return scholarships.value.filter((row) => {
    if (filters.value.degree && row.degree !== filters.value.degree) return false
    if (filters.value.language && row.teachingLanguage !== filters.value.language) return false
    if (filters.value.intake && row.intake !== filters.value.intake) return false
    if (filters.value.scholarship_type && row.scholarshipType !== filters.value.scholarship_type) return false
    if (!q) return true
    return [row.name, row.city, row.programId, row.degree, row.scholarshipType, row.intake]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})

const typeStats = computed(() => {
  const map = new Map()
  for (const row of scholarships.value) {
    const key = row.scholarshipType || 'Other'
    map.set(key, (map.get(key) || 0) + 1)
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4)
})

function cell(value) {
  return value || '—'
}

function clearFilters() {
  query.value = ''
  filters.value = {
    degree: '',
    language: '',
    intake: '',
    scholarship_type: '',
  }
}

function onSearch() {
  filtersOpen.value = false
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-crimson/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-jade/20 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-rosette-discount-check text-[14px]"></i>
            Scholarships directory
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Find funded programs that match your degree, language and intake.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Browse live scholarship offers from AR Education — compare coverage, deadlines and apply with counsellor support.
          </p>
        </div>

        <form
          class="mt-8 rounded-[1.5rem] bg-white/10 p-3 backdrop-blur-md ring-1 ring-white/15 transition focus-within:ring-2 focus-within:ring-white/30 sm:p-4"
          @submit.prevent="onSearch"
        >
          <div class="flex flex-col gap-3 lg:flex-row">
            <div class="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <i class="ti ti-search text-[18px] text-ink/35"></i>
              <input
                v-model="query"
                type="search"
                placeholder="Search program, city, scholarship type…"
                class="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink/35"
              />
            </div>
            <div class="grid gap-3 sm:grid-cols-2 lg:w-[340px]">
              <select
                v-model="filters.scholarship_type"
                class="rounded-2xl border border-white/15 bg-white px-4 py-3 text-[13px] font-semibold text-ink outline-none"
              >
                <option value="">All scholarship types</option>
                <option v-for="item in options.scholarship_type" :key="item" :value="item">{{ item }}</option>
              </select>
              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
              >
                Search now
                <i class="ti ti-arrow-right"></i>
              </button>
            </div>
          </div>
        </form>

        <div class="mt-6 flex flex-wrap items-center gap-3 text-[12px] text-white/55">
          <span class="rounded-full bg-white/10 px-3 py-1">{{ scholarships.length }} programs</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Live from admin</span>
          <span v-for="[label, count] in typeStats" :key="label" class="rounded-full bg-white/10 px-3 py-1">
            {{ label }} · {{ count }}
          </span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 lg:py-12">
      <div class="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-crimson">Results</div>
          <h2 class="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {{ rows.length }} scholarships found
          </h2>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-semibold text-ink lg:hidden"
            @click="filtersOpen = !filtersOpen"
          >
            <i class="ti ti-filter"></i>
            Filters
            <span v-if="activeFilterCount" class="rounded-full bg-crimson px-2 py-0.5 text-[11px] text-white">
              {{ activeFilterCount }}
            </span>
          </button>
          <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[13px] font-medium text-ink/55">
            <span v-if="loading">Loading…</span>
            <span v-else>{{ rows.length }} matching offers</span>
          </div>
        </div>
      </div>

      <div v-if="error" class="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-[13px] text-red-700 ring-1 ring-red-100">
        {{ error }}
      </div>

      <div class="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
        <aside class="space-y-4" :class="filtersOpen ? 'block' : 'hidden lg:block'">
          <div class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8">
            <div class="flex items-center justify-between gap-3">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">Quick filters</div>
              <button
                v-if="activeFilterCount"
                type="button"
                class="text-[12px] font-semibold text-crimson hover:underline"
                @click="clearFilters"
              >
                Clear all
              </button>
            </div>

            <div class="mt-4 space-y-3">
              <div>
                <label class="mb-2 block text-[12px] font-semibold text-ink/45">Degree</label>
                <select
                  v-model="filters.degree"
                  class="w-full rounded-xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none focus:border-crimson"
                >
                  <option value="">All degrees</option>
                  <option v-for="item in options.degree" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[12px] font-semibold text-ink/45">Teaching language</label>
                <select
                  v-model="filters.language"
                  class="w-full rounded-xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none focus:border-crimson"
                >
                  <option value="">All languages</option>
                  <option v-for="item in options.language" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[12px] font-semibold text-ink/45">Intake</label>
                <select
                  v-model="filters.intake"
                  class="w-full rounded-xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none focus:border-crimson"
                >
                  <option value="">All intakes</option>
                  <option v-for="item in options.intake" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-[12px] font-semibold text-ink/45">Scholarship type</label>
                <select
                  v-model="filters.scholarship_type"
                  class="w-full rounded-xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none focus:border-crimson"
                >
                  <option value="">All types</option>
                  <option v-for="item in options.scholarship_type" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <button
                type="button"
                class="w-full rounded-xl border border-ink/10 px-4 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA]"
                @click="clearFilters"
              >
                Clear filters
              </button>
            </div>
          </div>

          <div class="rounded-[1.5rem] bg-ink p-5 text-white">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Not sure what fits?</div>
            <div class="mt-2 font-display text-xl font-extrabold">Check eligibility in minutes</div>
            <p class="mt-2 text-[13px] leading-relaxed text-white/55">
              Use the free checker, then talk to a counsellor in Bangla.
            </p>
            <div class="mt-5 flex flex-col gap-2">
              <RouterLink
                to="/tools/scholarship-checker"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-crimson px-4 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
              >
                Scholarship checker
                <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <a
                :href="WHATSAPP"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-[13px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
              >
                <i class="ti ti-brand-whatsapp text-[16px]"></i>
                WhatsApp us
              </a>
            </div>
          </div>

          <NeedHelpBanner />
        </aside>

        <div>
          <div v-if="loading" class="grid gap-4 sm:grid-cols-2">
            <div v-for="n in 6" :key="n" class="h-56 animate-pulse rounded-[1.5rem] bg-[#EEF1F4]"></div>
          </div>

          <div
            v-else-if="!rows.length"
            class="rounded-[1.5rem] bg-white px-6 py-16 text-center ring-1 ring-ink/8"
          >
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson/10 text-crimson">
              <i class="ti ti-search-off text-[24px]"></i>
            </div>
            <h3 class="mt-4 font-display text-xl font-extrabold text-ink">No scholarships match</h3>
            <p class="mx-auto mt-2 max-w-md text-[14px] text-ink/50">
              Try another search or clear filters to see all available programs.
            </p>
            <button
              type="button"
              class="mt-6 inline-flex rounded-xl bg-ink px-5 py-3 text-[13px] font-semibold text-white"
              @click="clearFilters"
            >
              Reset filters
            </button>
          </div>

          <div v-else class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="row in rows"
              :key="row.slug"
              class="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-crimson/20"
              @mouseenter="prefetchScholarship(row.slug)"
            >
              <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-crimson via-jade to-crimson opacity-80"></div>
              <div class="flex flex-1 flex-col p-5 sm:p-6">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                      <span
                        v-if="row.scholarshipType"
                        class="rounded-full bg-crimson/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-crimson"
                      >
                        {{ row.scholarshipType }}
                      </span>
                      <span
                        v-if="row.coverage"
                        class="rounded-full bg-jade/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-jade"
                      >
                        {{ row.coverage }}
                      </span>
                    </div>
                    <RouterLink
                      :to="`/scholarship/${row.slug}`"
                      class="mt-3 block font-display text-[1.15rem] font-extrabold leading-snug text-ink transition group-hover:text-crimson"
                    >
                      {{ row.name }}
                    </RouterLink>
                    <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink/45">
                      <span v-if="row.city" class="inline-flex items-center gap-1">
                        <i class="ti ti-map-pin text-[14px]"></i>
                        {{ row.city }}
                      </span>
                      <span v-if="row.programId" class="inline-flex items-center gap-1">
                        <i class="ti ti-id text-[14px]"></i>
                        {{ row.programId }}
                      </span>
                    </div>
                  </div>
                  <span
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F7F8FA] text-crimson transition group-hover:bg-crimson group-hover:text-white"
                  >
                    <i class="ti ti-rosette-discount-check text-[18px]"></i>
                  </span>
                </div>

                <p v-if="row.desc" class="mt-4 line-clamp-2 text-[13.5px] leading-relaxed text-ink/50">
                  {{ row.desc }}
                </p>

                <div class="mt-5 grid grid-cols-2 gap-2">
                  <div class="rounded-xl bg-[#F7F8FA] px-3 py-2.5">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">Degree</div>
                    <div class="mt-1 text-[12.5px] font-semibold text-ink/80">{{ cell(row.degree) }}</div>
                  </div>
                  <div class="rounded-xl bg-[#F7F8FA] px-3 py-2.5">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">Language</div>
                    <div class="mt-1 text-[12.5px] font-semibold text-ink/80">{{ cell(row.teachingLanguage) }}</div>
                  </div>
                  <div class="rounded-xl bg-[#F7F8FA] px-3 py-2.5">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">Intake</div>
                    <div class="mt-1 whitespace-pre-line text-[12.5px] font-semibold text-ink/80">{{ cell(row.intake) }}</div>
                  </div>
                  <div class="rounded-xl bg-[#F7F8FA] px-3 py-2.5">
                    <div class="text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">Deadline</div>
                    <div class="mt-1 text-[12.5px] font-semibold text-ink/80">{{ cell(row.deadline) }}</div>
                  </div>
                </div>

                <div class="mt-5 flex flex-col gap-2 border-t border-ink/6 pt-4 sm:flex-row">
                  <RouterLink
                    :to="`/scholarship/${row.slug}`"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-ink/10 px-4 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA]"
                  >
                    View details
                  </RouterLink>
                  <RouterLink
                    :to="`/scholarships/${row.slug}/apply`"
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-crimson px-4 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
                  >
                    Apply now
                    <i class="ti ti-arrow-right"></i>
                  </RouterLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
