<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const ssc = ref('')
const hsc = ref('')
const bachelor = ref('')
const master = ref('')

const results = ref(null)

function gradeFromScore(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function convert() {
  const items = []
  if (ssc.value) {
    const score = parseFloat(ssc.value) * 20
    items.push({ label: 'SSC (/5 scale)', input: ssc.value, score, grade: gradeFromScore(score) })
  }
  if (hsc.value) {
    const score = parseFloat(hsc.value) * 20
    items.push({ label: 'HSC (/5 scale)', input: hsc.value, score, grade: gradeFromScore(score) })
  }
  if (bachelor.value) {
    const score = parseFloat(bachelor.value) * 25
    items.push({ label: 'Bachelor CGPA (/4)', input: bachelor.value, score, grade: gradeFromScore(score) })
  }
  if (master.value) {
    const score = parseFloat(master.value) * 25
    items.push({ label: 'Master CGPA (/4)', input: master.value, score, grade: gradeFromScore(score) })
  }
  results.value = items.length ? items : null
}

const hasInput = computed(() => ssc.value || hsc.value || bachelor.value || master.value)
</script>

<template>
  <div class="site-container max-w-2xl py-8 sm:py-10 lg:py-12">
    <div class="mb-6 text-center sm:mb-8">
      <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-crimson">Free tool</span>
      <h1 class="mt-2 font-display text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-2xl md:text-3xl">
        GPA converter
      </h1>
      <p class="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/50 sm:text-[14px]">
        Convert SSC/HSC (out of 5) or CGPA (out of 4) to China's 100-point score.
      </p>
    </div>

    <div class="rounded-[1.35rem] bg-white p-4 ring-1 ring-ink/8 sm:rounded-2xl sm:p-6">
      <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">SSC GPA (out of 5)</label>
          <input
            v-model="ssc"
            type="number"
            step="0.01"
            min="0"
            max="5"
            inputmode="decimal"
            placeholder="e.g. 4.50"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">HSC GPA (out of 5)</label>
          <input
            v-model="hsc"
            type="number"
            step="0.01"
            min="0"
            max="5"
            inputmode="decimal"
            placeholder="e.g. 4.20"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Bachelor CGPA (out of 4)</label>
          <input
            v-model="bachelor"
            type="number"
            step="0.01"
            min="0"
            max="4"
            inputmode="decimal"
            placeholder="e.g. 3.50"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Master CGPA (out of 4)</label>
          <input
            v-model="master"
            type="number"
            step="0.01"
            min="0"
            max="4"
            inputmode="decimal"
            placeholder="e.g. 3.75"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
      </div>

      <button
        type="button"
        class="btn-primary mt-5 w-full sm:mt-6"
        :disabled="!hasInput"
        @click="convert"
      >
        Convert to China score
      </button>
    </div>

    <div v-if="results" class="mt-5 space-y-3 sm:mt-6">
      <div
        v-for="r in results"
        :key="r.label"
        class="overflow-hidden rounded-[1.35rem] bg-ink px-5 py-5 text-white sm:rounded-2xl sm:px-6 sm:py-6"
      >
        <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">{{ r.label }}</div>
        <div class="mt-2 flex flex-wrap items-baseline gap-3 sm:gap-4">
          <div>
            <span class="font-display text-[2rem] font-extrabold tracking-tight sm:text-4xl">{{ r.score.toFixed(1) }}</span>
            <span class="text-[14px] text-white/45"> / 100</span>
          </div>
          <span class="rounded-full bg-white/10 px-3 py-1 text-[13px] font-bold text-white">
            Grade {{ r.grade }}
          </span>
        </div>
        <p class="mt-2 text-[12px] text-white/40">Input: {{ r.input }} → China 100-point score</p>
      </div>
    </div>

    <p class="mt-6 text-center text-[12px] text-ink/40">
      Formulas: SSC/HSC × 20 (for /5 scale) · CGPA × 25 (for /4 scale)
    </p>
    <div class="mt-4 text-center">
      <RouterLink to="/tools/scholarship-checker" class="text-[13px] font-semibold text-crimson hover:underline">
        Check scholarship eligibility →
      </RouterLink>
    </div>
  </div>
</template>
