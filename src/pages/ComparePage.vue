<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useUniversitiesCatalog } from '../composables/useUniversitiesCatalog.js'

const route = useRoute()
const selected = ref([])
const { items: universities, loading, load } = useUniversitiesCatalog()

onMounted(() => load())

const available = computed(() =>
  universities.value.filter((u) => !selected.value.find((s) => s.slug === u.slug)),
)

function addUni(slug) {
  const uni = universities.value.find((u) => u.slug === slug)
  if (!uni || selected.value.length >= 3) return
  if (!selected.value.find((s) => s.slug === slug)) {
    selected.value.push(uni)
  }
}

function removeUni(slug) {
  selected.value = selected.value.filter((u) => u.slug !== slug)
}

const rows = [
  { label: 'Ranking', key: 'ranking', fmt: (v) => `#${v}` },
  { label: 'City', key: 'city' },
  { label: 'Province', key: 'province' },
  { label: 'Code', key: 'code' },
  { label: 'Scholarship', key: 'scholarship', fmt: (v) => (v ? 'Yes' : 'No') },
  { label: 'Views', key: 'views' },
]

function cell(uni, row) {
  const value = uni[row.key]
  return row.fmt ? row.fmt(value) : value || '—'
}

function syncFromQuery() {
  const add = route.query.add?.toString()
  if (add) addUni(add)
}

watch(
  () => [route.query.add, universities.value.length],
  () => syncFromQuery(),
  { immediate: true },
)
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-arrows-left-right text-[14px]"></i>
            Compare
          </div>
          <h1 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl lg:text-[2.8rem]">
            Compare universities side by side.
          </h1>
          <p class="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/60 sm:mt-4 sm:text-[15px]">
            Shortlist up to three universities and compare ranking, city, scholarship availability and other quick details in one place.
          </p>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-2 text-[11.5px] text-white/55 sm:mt-8 sm:gap-3 sm:text-[12px]">
          <span class="rounded-full bg-white/10 px-3 py-1">Up to 3 universities</span>
          <span class="rounded-full bg-white/10 px-3 py-1">{{ loading ? 'Loading…' : `${universities.length} from admin` }}</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Built for shortlist planning</span>
        </div>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <div class="grid gap-5 sm:gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <aside class="rounded-[1.5rem] bg-[linear-gradient(145deg,#0A1628,#132746)] p-5 text-white sm:rounded-[1.75rem] sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Compare builder</div>
          <h2 class="mt-2 font-display text-xl font-extrabold sm:text-2xl md:text-3xl">Choose your shortlist.</h2>
          <p class="mt-2 text-[13px] text-white/55 sm:mt-3">Add up to 3 universities from live admin data.</p>

          <label class="mt-5 block text-[12px] font-semibold text-white/70 sm:mt-6">Add university</label>
          <select
            class="mt-2 w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-[14px] text-white outline-none ring-1 ring-white/15"
            :disabled="selected.length >= 3 || loading"
            @change="addUni($event.target.value); $event.target.value = ''"
          >
            <option value="" class="text-ink">{{ loading ? 'Loading…' : 'Select university' }}</option>
            <option v-for="u in available" :key="u.slug" :value="u.slug" class="text-ink">{{ u.name }}</option>
          </select>

          <div class="mt-4 space-y-2 sm:mt-5">
            <div
              v-for="u in selected"
              :key="u.slug"
              class="flex items-center justify-between gap-3 rounded-xl bg-white/8 px-3 py-2.5 ring-1 ring-white/10 sm:px-4 sm:py-3"
            >
              <span class="flex min-w-0 items-center gap-3">
                <span class="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/15 text-[10px] font-bold">
                  <img v-if="u.image" :src="u.image" :alt="u.name" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover" />
                  <span v-else>{{ u.code?.slice(0, 3) }}</span>
                </span>
                <span class="truncate text-[13px] font-semibold">{{ u.name }}</span>
              </span>
              <button type="button" class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white" @click="removeUni(u.slug)">
                <i class="ti ti-x"></i>
              </button>
            </div>
          </div>
        </aside>

        <!-- Mobile card compare -->
        <div v-if="selected.length" class="space-y-3 lg:hidden">
          <article
            v-for="u in selected"
            :key="`card-${u.slug}`"
            class="rounded-[1.35rem] bg-white p-4 ring-1 ring-ink/8 sm:p-5"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex min-w-0 items-center gap-3">
                <span class="relative flex h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl bg-ink/10">
                  <img v-if="u.image" :src="u.image" :alt="u.name" loading="lazy" class="h-full w-full object-cover" />
                </span>
                <div class="min-w-0">
                  <h3 class="font-display text-[15px] font-bold leading-snug text-ink">{{ u.name }}</h3>
                  <p class="mt-0.5 text-[12px] text-ink/45">{{ u.city || '—' }} · {{ u.province || '—' }}</p>
                </div>
              </div>
              <button type="button" class="text-ink/35 hover:text-crimson" @click="removeUni(u.slug)">
                <i class="ti ti-x text-[16px]"></i>
              </button>
            </div>
            <dl class="mt-4 grid grid-cols-2 gap-2.5">
              <div v-for="row in rows" :key="row.key" class="rounded-xl bg-[#F8F9FB] px-3 py-2.5">
                <dt class="text-[10px] font-medium uppercase tracking-wide text-ink/40">{{ row.label }}</dt>
                <dd class="mt-0.5 text-[13px] font-semibold text-ink">{{ cell(u, row) }}</dd>
              </div>
            </dl>
          </article>
        </div>

        <!-- Desktop table -->
        <div class="hidden overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white lg:block">
          <div class="overflow-x-auto">
            <table v-if="selected.length" class="min-w-full text-left text-[13px]">
              <thead>
                <tr class="border-b border-ink/8 bg-[#F7F8FA]">
                  <th class="sticky left-0 z-10 bg-[#F7F8FA] px-4 py-3 font-semibold text-ink/50">Detail</th>
                  <th v-for="u in selected" :key="u.slug" class="min-w-[160px] px-4 py-3 font-semibold text-ink">
                    <div class="flex items-center gap-2">
                      <span class="relative flex h-8 w-8 flex-shrink-0 overflow-hidden rounded-lg bg-ink/10">
                        <img v-if="u.image" :src="u.image" :alt="u.name" loading="lazy" decoding="async" class="h-full w-full object-cover" />
                      </span>
                      <span class="line-clamp-2">{{ u.name }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rows" :key="row.key" class="border-b border-ink/6">
                  <td class="sticky left-0 bg-white px-4 py-3 font-medium text-ink/55">{{ row.label }}</td>
                  <td v-for="u in selected" :key="u.slug + row.key" class="px-4 py-3 text-ink">
                    {{ cell(u, row) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="p-10 text-center text-[14px] text-ink/45">
              Select universities on the left to compare.
            </div>
          </div>
        </div>

        <div
          v-if="!selected.length"
          class="rounded-[1.35rem] bg-white p-8 text-center text-[14px] text-ink/45 ring-1 ring-ink/8 lg:hidden"
        >
          Select universities above to compare.
        </div>
      </div>

      <div class="mt-6 sm:mt-8">
        <RouterLink to="/universities" class="text-[13px] font-semibold text-crimson">Browse all universities →</RouterLink>
      </div>
    </section>
  </div>
</template>
