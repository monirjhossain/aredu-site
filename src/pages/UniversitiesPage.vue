<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchUniversities, mapPostToUniversity } from '../api/universities.js'
import { fetchCities } from '../api/cities.js'
import { buildApiPath, peekApi } from '../api/client.js'
import UniversityCard from '../components/ui/UniversityCard.vue'
import NeedHelpBanner from '../components/ui/NeedHelpBanner.vue'

const route = useRoute()
const router = useRouter()

const PER_PAGE = 12
const page = ref(1)
const sortBy = ref('name')
const searchQuery = ref(route.query.q?.toString() || '')
const selectedCity = ref('all')
const scholarshipOnly = ref(false)
const filtersOpen = ref(false)
const loading = ref(false)
const error = ref('')
const universities = ref([])
const totalFromApi = ref(0)
const cityNames = ref([])

watch(
  () => route.query.q,
  (q) => {
    searchQuery.value = q?.toString() || ''
    page.value = 1
  },
)

async function loadUniversities() {
  error.value = ''
  const params = {
    post_type: 'university',
    per_page: 100,
    page: 1,
    search: searchQuery.value.trim() || undefined,
  }
  const cached = peekApi(buildApiPath('/posts', params))
  if (cached?.data?.posts?.data?.length) {
    universities.value = cached.data.posts.data.map((row, i) => mapPostToUniversity(row, i)).filter(Boolean)
    totalFromApi.value = cached.data.posts.total ?? universities.value.length
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const result = await fetchUniversities({
      search: searchQuery.value.trim(),
      perPage: 100,
      city: selectedCity.value !== 'all' ? selectedCity.value : '',
      scholarship: scholarshipOnly.value,
    })
    universities.value = result.items
    totalFromApi.value = result.total
  } catch (e) {
    console.error(e)
    if (!universities.value.length) {
      error.value = e.message || 'Could not load universities from admin API'
      universities.value = []
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const cities = await fetchCities({ perPage: 200 })
    cityNames.value = (cities.items || []).map((c) => c.name).filter(Boolean)
  } catch (e) {
    console.error(e)
  }
  await loadUniversities()
})

const cityOptions = computed(() => {
  const fromUnis = universities.value.map((u) => u.city).filter(Boolean)
  return ['all', ...new Set([...cityNames.value, ...fromUnis])]
})

const filtered = computed(() => {
  let list = [...universities.value]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.city?.toLowerCase().includes(q) ||
        u.code?.toLowerCase().includes(q) ||
        u.slug?.toLowerCase().includes(q),
    )
  }
  if (selectedCity.value !== 'all') {
    list = list.filter((u) => u.city === selectedCity.value)
  }
  if (scholarshipOnly.value) {
    list = list.filter((u) => u.scholarship)
  }
  if (sortBy.value === 'ranking') list.sort((a, b) => a.ranking - b.ranking)
  else if (sortBy.value === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
  else if (sortBy.value === 'views') list.sort((a, b) => b.views - a.views)
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))

const paginated = computed(() => {
  const start = (page.value - 1) * PER_PAGE
  return filtered.value.slice(start, start + PER_PAGE)
})

function goToPage(p) {
  page.value = Math.min(Math.max(1, p), totalPages.value)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onSearch() {
  page.value = 1
  router.push({ path: '/universities', query: searchQuery.value ? { q: searchQuery.value } : {} })
  loadUniversities()
}

const activeFilterCount = computed(() =>
  [selectedCity.value !== 'all', scholarshipOnly.value, searchQuery.value.trim()].filter(Boolean).length,
)

function clearFilters() {
  selectedCity.value = 'all'
  scholarshipOnly.value = false
  searchQuery.value = ''
  sortBy.value = 'name'
  page.value = 1
  filtersOpen.value = false
  router.push({ path: '/universities' })
  loadUniversities()
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-school text-[14px]"></i>
            Universities directory
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Find the right Chinese university for your budget, major and scholarship goals.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Live data from AR Education admin — search, shortlist and plan your study route from Bangladesh.
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
                v-model="searchQuery"
                type="text"
                placeholder="Search universities..."
                class="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink/35 focus:outline-none"
              />
            </div>
            <div class="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
              <select
                v-model="sortBy"
                class="rounded-2xl border border-white/15 bg-white px-4 py-3 text-[13px] font-semibold text-ink outline-none focus:outline-none"
                @change="page = 1"
              >
                <option value="name">Sort by name</option>
                <option value="ranking">Sort by id</option>
                <option value="views">Sort by views</option>
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
          <span class="rounded-full bg-white/10 px-3 py-1">{{ totalFromApi || filtered.length }}+ universities</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Admin API connected</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 lg:py-12">
      <div class="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-crimson">Results</div>
          <h2 class="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {{ filtered.length }} universities found
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
            <span v-if="loading">Loading...</span>
            <span v-else>Showing {{ paginated.length }} on this page</span>
          </div>
        </div>
      </div>

      <div v-if="error" class="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-[13px] text-red-700 ring-1 ring-red-100">
        {{ error }}
        <button type="button" class="ml-3 font-semibold underline" @click="loadUniversities">Retry</button>
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
                <label class="mb-2 block text-[12px] font-semibold text-ink/45">City / Category</label>
                <select
                  v-model="selectedCity"
                  class="w-full rounded-xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none focus:border-crimson"
                  @change="page = 1; loadUniversities()"
                >
                  <option v-for="city in cityOptions" :key="city" :value="city">
                    {{ city === 'all' ? 'All cities' : city }}
                  </option>
                </select>
              </div>
              <label class="flex items-center gap-3 rounded-xl bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink/70">
                <input
                  v-model="scholarshipOnly"
                  type="checkbox"
                  class="rounded"
                  @change="page = 1; loadUniversities()"
                />
                Scholarship available
              </label>
              <button
                type="button"
                class="w-full rounded-xl border border-ink/10 px-4 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA]"
                @click="clearFilters"
              >
                Clear filters
              </button>
            </div>
          </div>
          <div class="hidden lg:block">
            <NeedHelpBanner />
          </div>
        </aside>

        <div>
          <div v-if="loading" class="py-16 text-center text-[14px] text-ink/45">Loading universities from admin...</div>
          <div v-else-if="!paginated.length" class="py-16 text-center text-[14px] text-ink/45">No universities found.</div>
          <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <UniversityCard v-for="uni in paginated" :key="uni.slug" :university="uni" />
          </div>

          <div v-if="totalPages > 1" class="mt-10 space-y-3">
            <div class="flex items-center justify-center">
              <div class="flex max-w-full items-center gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  class="shrink-0 rounded-xl border border-ink/10 bg-white px-4 py-2 text-[13px] disabled:opacity-40"
                  :disabled="page <= 1"
                  @click="goToPage(page - 1)"
                >
                  Previous
                </button>
                <button
                  v-for="p in totalPages"
                  :key="p"
                  type="button"
                  class="shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-semibold"
                  :class="p === page ? 'bg-crimson text-white' : 'border border-ink/10 bg-white'"
                  @click="goToPage(p)"
                >
                  {{ p }}
                </button>
                <button
                  type="button"
                  class="shrink-0 rounded-xl border border-ink/10 bg-white px-4 py-2 text-[13px] disabled:opacity-40"
                  :disabled="page >= totalPages"
                  @click="goToPage(page + 1)"
                >
                  Next
                </button>
              </div>
            </div>
            <div class="text-center text-[12px] text-ink/40">
              Page {{ page }} of {{ totalPages }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
