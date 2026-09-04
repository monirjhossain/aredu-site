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
  <div class="site-container max-w-2xl py-10">
    <div class="mb-8 text-center">
      <span class="text-[11px] font-semibold uppercase tracking-widest" style="color: var(--color-primary)">Free tool</span>
      <h1 class="mt-2 text-2xl font-extrabold text-[var(--color-secondary)]">GPA converter</h1>
      <p class="mt-2 text-[14px] text-gray-500">Convert SSC/HSC (out of 5) or CGPA (out of 4) to China's 100-point score.</p>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">SSC GPA (out of 5)</label>
          <input v-model="ssc" type="number" step="0.01" min="0" max="5" placeholder="e.g. 4.50" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">HSC GPA (out of 5)</label>
          <input v-model="hsc" type="number" step="0.01" min="0" max="5" placeholder="e.g. 4.20" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Bachelor CGPA (out of 4)</label>
          <input v-model="bachelor" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.50" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Master CGPA (out of 4)</label>
          <input v-model="master" type="number" step="0.01" min="0" max="4" placeholder="e.g. 3.75" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
      </div>

      <button
        type="button"
        class="mt-6 w-full rounded-xl py-3 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        style="background: var(--color-primary)"
        :disabled="!hasInput"
        @click="convert"
      >
        Convert to China score
      </button>
    </div>

    <div v-if="results" class="mt-6 space-y-3">
      <div
        v-for="r in results"
        :key="r.label"
        class="rounded-2xl border border-gray-200 bg-white p-5"
      >
        <div class="text-[12px] font-semibold text-gray-400">{{ r.label }}</div>
        <div class="mt-2 flex items-baseline gap-4">
          <div>
            <span class="text-3xl font-extrabold text-[var(--color-secondary)]">{{ r.score.toFixed(1) }}</span>
            <span class="text-[14px] text-gray-400"> / 100</span>
          </div>
          <span class="rounded-full px-3 py-1 text-[13px] font-bold text-white" style="background: var(--color-secondary)">
            Grade {{ r.grade }}
          </span>
        </div>
        <p class="mt-2 text-[12px] text-gray-500">Input: {{ r.input }} → China 100-point score</p>
      </div>
    </div>

    <p class="mt-6 text-center text-[12px] text-gray-400">
      Formulas: SSC/HSC × 20 (for /5 scale) · CGPA × 25 (for /4 scale)
    </p>
    <div class="mt-4 text-center">
      <RouterLink to="/tools/scholarship-checker" class="text-[13px] font-semibold" style="color: var(--color-primary)">
        Check scholarship eligibility →
      </RouterLink>
    </div>
  </div>
</template>
