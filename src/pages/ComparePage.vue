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

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-arrows-left-right text-[14px]"></i>
            Compare
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Compare universities side by side.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Shortlist up to three universities and compare ranking, city, scholarship availability and other quick details in one place.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3 text-[12px] text-white/55">
          <span class="rounded-full bg-white/10 px-3 py-1">Up to 3 universities</span>
          <span class="rounded-full bg-white/10 px-3 py-1">{{ loading ? 'Loading…' : `${universities.length} from admin` }}</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Built for shortlist planning</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 lg:py-12">
      <div class="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <aside class="rounded-[1.75rem] bg-[linear-gradient(145deg,#0A1628,#132746)] p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Compare builder</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Choose your shortlist.</h2>
          <p class="mt-3 text-[13px] text-white/55">Add up to 3 universities from live admin data.</p>

          <label class="mt-6 block text-[12px] font-semibold text-white/70">Add university</label>
          <select
            class="mt-2 w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-[14px] text-white outline-none ring-1 ring-white/15"
            :disabled="selected.length >= 3 || loading"
            @change="addUni($event.target.value); $event.target.value = ''"
          >
            <option value="" class="text-ink">{{ loading ? 'Loading…' : 'Select university' }}</option>
            <option v-for="u in available" :key="u.slug" :value="u.slug" class="text-ink">{{ u.name }}</option>
          </select>

          <div class="mt-5 space-y-2">
            <div
              v-for="u in selected"
              :key="u.slug"
              class="flex items-center justify-between gap-3 rounded-xl bg-white/8 px-4 py-3 ring-1 ring-white/10"
            >
              <span class="flex min-w-0 items-center gap-3">
                <span class="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/15 text-[10px] font-bold">
                  <img v-if="u.image" :src="u.image" :alt="u.name" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover" />
                  <span v-else>{{ u.code?.slice(0, 3) }}</span>
                </span>
                <span class="truncate text-[13px] font-semibold">{{ u.name }}</span>
              </span>
              <button type="button" class="text-white/50 hover:text-white" @click="removeUni(u.slug)">
                <i class="ti ti-x"></i>
              </button>
            </div>
          </div>
        </aside>

        <div class="overflow-x-auto rounded-[1.75rem] border border-ink/8 bg-white">
          <table v-if="selected.length" class="min-w-full text-left text-[13px]">
            <thead>
              <tr class="border-b border-ink/8 bg-[#F7F8FA]">
                <th class="px-4 py-3 font-semibold text-ink/50">Detail</th>
                <th v-for="u in selected" :key="u.slug" class="px-4 py-3 font-semibold text-ink">
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
                <td class="px-4 py-3 font-medium text-ink/55">{{ row.label }}</td>
                <td v-for="u in selected" :key="u.slug + row.key" class="px-4 py-3 text-ink">
                  {{ row.fmt ? row.fmt(u[row.key]) : u[row.key] }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="p-10 text-center text-[14px] text-ink/45">
            Select universities on the left to compare.
          </div>
        </div>
      </div>

      <div class="mt-8">
        <RouterLink to="/universities" class="text-[13px] font-semibold text-crimson">Browse all universities →</RouterLink>
      </div>
    </section>
  </div>
</template>
