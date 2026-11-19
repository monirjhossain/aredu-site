<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { fetchMajors, mapSubject } from '../api/majors.js'
import { useSiteCatalogs } from '../composables/useSiteCatalogs.js'
import { buildApiPath, peekApi } from '../api/client.js'
import { prefetchMajor } from '../api/prefetch.js'

const route = useRoute()
const router = useRouter()
const { fieldGroups: FIELD_GROUPS } = useSiteCatalogs()
const searchQuery = ref(route.query.q?.toString() || '')
const loading = ref(true)
const error = ref('')
const majors = ref([])

watch(
  () => route.query.q,
  (q) => {
    searchQuery.value = q?.toString() || ''
  },
)

async function loadMajors() {
  error.value = ''
  const params = {
    per_page: 200,
    page: 1,
    search: searchQuery.value.trim() || undefined,
  }
  const cached = peekApi(buildApiPath('/majors', params))
  if (cached?.data?.subjects?.data?.length) {
    majors.value = cached.data.subjects.data.map(mapSubject).filter(Boolean)
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const result = await fetchMajors({
      search: searchQuery.value.trim(),
      perPage: 200,
    })
    majors.value = result.items
  } catch (e) {
    console.error(e)
    if (!majors.value.length) {
      error.value = e.message || 'Could not load majors'
      majors.value = []
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadMajors)
watch(searchQuery, () => {
  // keep local filter; API reload on submit
})

const filtered = computed(() => {
  const field = route.query.field?.toString()
  const q = searchQuery.value.trim().toLowerCase()

  let list = [...majors.value]
  if (field) {
    list = list.filter((m) => m.field === field)
  }
  if (q) {
    list = list.filter((m) => m.name.toLowerCase().includes(q) || m.field.toLowerCase().includes(q))
  }
  return list
})

function onSearch() {
  router.push({
    path: '/majors',
    query: {
      ...(route.query.field ? { field: route.query.field } : {}),
      ...(searchQuery.value.trim() ? { q: searchQuery.value.trim() } : {}),
    },
  })
  loadMajors()
}

function clearSearch() {
  searchQuery.value = ''
  router.push({
    path: '/majors',
    query: route.query.field ? { field: route.query.field } : {},
  })
  loadMajors()
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
            <i class="ti ti-book-2 text-[14px]"></i>
            Majors directory
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Explore majors and programmes for your China study plan.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Browse study fields, filter by subject area and discover which major can shape your university shortlist.
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
                placeholder="Search majors or fields..."
                class="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink/35"
              />
            </div>
            <div class="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
              >
                Search
                <i class="ti ti-arrow-right"></i>
              </button>
              <button
                type="button"
                class="rounded-2xl border border-white/15 bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-sand"
                @click="clearSearch"
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        <div class="mt-6 flex flex-wrap items-center gap-3 text-[12px] text-white/55">
          <span class="rounded-full bg-white/10 px-3 py-1">{{ loading ? '…' : filtered.length }} majors</span>
          <span v-if="error" class="rounded-full bg-crimson/80 px-3 py-1 text-white">{{ error }}</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Popular fields</span>
          <span class="rounded-full bg-white/10 px-3 py-1">University planning friendly</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 lg:py-12">
      <div class="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <div class="text-[12px] font-bold uppercase tracking-[0.14em] text-crimson">Results</div>
          <h2 class="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {{ filtered.length }} majors across all fields
          </h2>
        </div>
        <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[13px] font-medium text-ink/55">
          {{ route.query.field || 'All subject groups' }}
        </div>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <RouterLink
          to="/majors"
          class="rounded-full px-4 py-2 text-[12px] font-semibold transition"
          :class="!route.query.field ? 'bg-crimson text-white' : 'border border-ink/10 bg-white text-ink/60 hover:border-ink/20'"
        >
          All fields
        </RouterLink>
        <RouterLink
          v-for="field in FIELD_GROUPS"
          :key="field"
          :to="{ path: '/majors', query: { field, ...(route.query.q ? { q: route.query.q } : {}) } }"
          class="rounded-full px-4 py-2 text-[12px] font-semibold transition"
          :class="route.query.field === field ? 'bg-crimson text-white' : 'border border-ink/10 bg-white text-ink/60 hover:border-ink/20'"
        >
          {{ field }}
        </RouterLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RouterLink
          v-for="(major, i) in filtered"
          :key="major.slug"
          :to="`/major/${major.slug}`"
          class="group relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,#ffffff,#fcfcfd)] p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-soft hover:ring-crimson/20"
          @mouseenter="prefetchMajor(major.slug)"
        >
          <div
            class="absolute inset-0 opacity-100 transition duration-300 group-hover:opacity-100"
            :style="{ background: i % 3 === 0 ? 'linear-gradient(145deg, rgba(15,118,110,0.07), rgba(255,255,255,0))' : i % 3 === 1 ? 'linear-gradient(145deg, rgba(225,29,46,0.07), rgba(255,255,255,0))' : 'linear-gradient(145deg, rgba(10,22,40,0.05), rgba(255,255,255,0))' }"
          ></div>

          <div class="relative flex h-full flex-col">
            <div class="flex items-start justify-between gap-3">
              <span class="inline-flex rounded-full bg-[#F3F6FA] px-3 py-1 text-[10px] font-semibold text-ink/70">
                {{ major.field }}
              </span>
              <span
                class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F8FA] text-[17px]"
                :class="i % 3 === 0 ? 'text-jade' : i % 3 === 1 ? 'text-crimson' : 'text-ink/70'"
              >
                <i class="ti" :class="i % 4 === 0 ? 'ti-cpu' : i % 4 === 1 ? 'ti-briefcase' : i % 4 === 2 ? 'ti-flask' : 'ti-book'"></i>
              </span>
            </div>

            <h2 class="mt-5 font-display text-[1.02rem] font-bold leading-snug text-ink transition group-hover:text-crimson">
              {{ major.name }}
            </h2>
            <p class="mt-2 flex-1 text-[13px] leading-relaxed text-ink/50">
              Explore this programme to see where it fits in your China university shortlist.
            </p>

            <div class="mt-5 flex items-center justify-between border-t border-ink/6 pt-4">
              <span class="text-[12px] font-semibold text-ink/35">View programme</span>
              <i class="ti ti-arrow-right text-[15px] text-crimson transition group-hover:translate-x-0.5"></i>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
