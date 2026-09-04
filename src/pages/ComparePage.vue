<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import universities from '../data/universities.json'

const route = useRoute()
const selected = ref([])

const available = computed(() =>
  universities.filter((u) => !selected.value.find((s) => s.slug === u.slug)),
)

function addUni(slug) {
  const uni = universities.find((u) => u.slug === slug)
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
  () => route.query.add,
  () => {
    syncFromQuery()
  },
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
          <span class="rounded-full bg-white/10 px-3 py-1">Quick decision support</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Built for shortlist planning</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 lg:py-12">
      <div class="grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
        <aside class="rounded-[1.75rem] bg-[linear-gradient(145deg,#0A1628,#132746)] p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Compare builder</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Choose your shortlist.</h2>
          <p class="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/55">
            Add universities one by one, then compare the details that matter most before applying.
          </p>

          <div class="mt-7 rounded-[1.5rem] bg-white/8 p-5 ring-1 ring-white/10">
            <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Selected</div>
            <div class="mt-2 font-display text-[1.7rem] font-extrabold">{{ selected.length }}/3</div>
            <p class="mt-2 text-[12.5px] text-white/55">You can compare up to three universities at once.</p>
          </div>

          <div v-if="selected.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="uni in selected"
              :key="uni.slug"
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white ring-1 ring-white/10"
            >
              {{ uni.code }}
              <button type="button" class="opacity-70 hover:opacity-100" @click="removeUni(uni.slug)">×</button>
            </span>
          </div>
        </aside>

        <div class="rounded-[1.75rem] bg-[linear-gradient(180deg,#ffffff,#fbfbfc)] p-6 ring-1 ring-ink/8 sm:p-8">
          <div class="flex flex-col gap-3 border-b border-ink/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Add university</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Build your comparison table</h2>
            </div>
            <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[12px] font-medium text-ink/50 ring-1 ring-ink/6">
              {{ selected.length }}/3 selected
            </div>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div class="min-w-[200px] flex-1">
              <label class="block text-[12px] font-semibold text-ink/55">Choose a university</label>
              <select
                class="mt-2 w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[13px] text-ink outline-none transition focus:border-jade focus:bg-white"
                :disabled="selected.length >= 3"
                @change="addUni($event.target.value); $event.target.value = ''"
              >
                <option value="">Choose a university…</option>
                <option v-for="uni in available" :key="uni.slug" :value="uni.slug">{{ uni.name }}</option>
              </select>
            </div>
            <RouterLink
              to="/universities"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA] sm:w-auto"
            >
              Browse universities
              <i class="ti ti-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-if="selected.length === 0" class="mt-6 rounded-[1.75rem] border border-dashed border-ink/15 bg-[linear-gradient(145deg,#ffffff,#F7FAF9)] p-8 text-center sm:p-12">
        <i class="ti ti-arrows-left-right text-[48px] text-ink/20"></i>
        <p class="mt-4 text-[14px] text-ink/50">Add universities from the dropdown above to start comparing.</p>
        <RouterLink to="/universities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">
          Browse universities →
        </RouterLink>
      </div>

      <div v-else class="mt-6 space-y-5">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="uni in selected"
            :key="uni.slug"
            class="rounded-[1.6rem] bg-[linear-gradient(145deg,#ffffff,#F7FAF9)] p-5 ring-1 ring-ink/8"
          >
            <div class="flex items-start justify-between gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink font-display text-[12px] font-extrabold text-white">
                {{ uni.code?.slice(0, 3) }}
              </span>
              <button type="button" class="rounded-full bg-[#F7F8FA] px-3 py-1 text-[11px] font-semibold text-ink/55" @click="removeUni(uni.slug)">
                Remove
              </button>
            </div>
            <RouterLink :to="`/university/${uni.slug}`" class="mt-5 block font-display text-[1.05rem] font-extrabold leading-snug text-ink hover:text-crimson">
              {{ uni.name }}
            </RouterLink>
            <p class="mt-2 text-[13px] text-ink/50">{{ uni.city }} · {{ uni.province }}</p>
          </div>
        </div>

        <div class="space-y-4 lg:hidden">
          <div
            v-for="row in rows"
            :key="row.key"
            class="rounded-[1.4rem] border border-ink/8 bg-[linear-gradient(180deg,#ffffff,#fcfcfd)] p-4"
          >
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">{{ row.label }}</div>
            <div class="mt-3 space-y-2">
              <div
                v-for="uni in selected"
                :key="`${row.key}-${uni.slug}`"
                class="flex items-center justify-between gap-3 rounded-xl bg-[#F7F8FA] px-3 py-3"
              >
                <span class="text-[12px] font-semibold text-ink">{{ uni.code }}</span>
                <span
                  v-if="row.key === 'scholarship'"
                  class="rounded-full px-3 py-1 text-[11px] font-semibold"
                  :class="uni.scholarship ? 'bg-jade/10 text-jade' : 'bg-ink/5 text-ink/45'"
                >
                  {{ row.fmt ? row.fmt(uni[row.key]) : uni[row.key] }}
                </span>
                <span v-else class="text-right text-[12px] text-ink/70">
                  {{ row.fmt ? row.fmt(uni[row.key]) : uni[row.key] }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden overflow-x-auto rounded-[1.75rem] border border-ink/8 bg-[linear-gradient(180deg,#ffffff,#fcfcfd)] lg:block">
          <table class="w-full min-w-[620px] text-left text-[13px]">
            <thead>
              <tr class="border-b border-ink/6 bg-[#FBFAF7]">
                <th class="p-4 font-semibold text-ink/35">Criteria</th>
                <th v-for="uni in selected" :key="uni.slug" class="p-4">
                  <RouterLink :to="`/university/${uni.slug}`" class="font-semibold text-ink hover:text-crimson">
                    {{ uni.name }}
                  </RouterLink>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.key" class="border-b border-ink/6 last:border-b-0">
                <td class="p-4 font-semibold text-ink/45">{{ row.label }}</td>
                <td v-for="uni in selected" :key="uni.slug" class="p-4 text-ink">
                  <span
                    v-if="row.key === 'scholarship'"
                    class="rounded-full px-3 py-1 text-[11px] font-semibold"
                    :class="uni.scholarship ? 'bg-jade/10 text-jade' : 'bg-ink/5 text-ink/45'"
                  >
                    {{ row.fmt ? row.fmt(uni[row.key]) : uni[row.key] }}
                  </span>
                  <span v-else>
                    {{ row.fmt ? row.fmt(uni[row.key]) : uni[row.key] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
