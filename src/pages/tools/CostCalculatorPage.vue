<script setup>
import { computed, ref } from 'vue'

const tuition = ref('')
const living = ref('')
const visa = ref('')
const flights = ref('')
const CNY_TO_BDT = 17

const total = computed(() => {
  const t = parseFloat(tuition.value) || 0
  const l = parseFloat(living.value) || 0
  const v = parseFloat(visa.value) || 0
  const f = parseFloat(flights.value) || 0
  const cnyTotal = t + l + v + f
  return {
    cny: cnyTotal,
    bdt: cnyTotal * CNY_TO_BDT,
  }
})

const hasValues = computed(() => tuition.value || living.value || visa.value || flights.value)

function formatBdt(n) {
  return new Intl.NumberFormat('en-BD').format(Math.round(n))
}
</script>

<template>
  <div class="site-container max-w-2xl py-10">
    <div class="mb-8 text-center">
      <span class="text-[11px] font-semibold uppercase tracking-widest" style="color: var(--color-primary)">Free tool</span>
      <h1 class="mt-2 text-2xl font-extrabold text-[var(--color-secondary)]">Cost calculator</h1>
      <p class="mt-2 text-[14px] text-gray-500">Estimate your total study cost in China — shown in Taka (BDT).</p>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-6">
      <p class="mb-4 text-[12px] text-gray-400">Enter annual costs in CNY (Chinese Yuan). Rate: 1 CNY ≈ {{ CNY_TO_BDT }} BDT.</p>
      <div class="space-y-4">
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Tuition (CNY/year)</label>
          <input v-model="tuition" type="number" min="0" placeholder="e.g. 15000" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Living expenses (CNY/year)</label>
          <input v-model="living" type="number" min="0" placeholder="e.g. 12000" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Visa & medical (CNY, one-time)</label>
          <input v-model="visa" type="number" min="0" placeholder="e.g. 3000" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-gray-500">Flights Dhaka ↔ China (CNY, round trip)</label>
          <input v-model="flights" type="number" min="0" placeholder="e.g. 5000" class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[14px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
        </div>
      </div>
    </div>

    <div v-if="hasValues" class="mt-6 rounded-2xl p-6 text-center" style="background: var(--color-secondary)">
      <div class="text-[12px] font-semibold uppercase tracking-widest" style="color: var(--color-accent)">Estimated total</div>
      <div class="mt-2 text-4xl font-extrabold text-white">৳ {{ formatBdt(total.bdt) }}</div>
      <div class="mt-1 text-[14px]" style="color: #aeb8c9">≈ ¥ {{ formatBdt(total.cny) }} CNY</div>
      <p class="mt-4 text-[12px]" style="color: #aeb8c9">Includes tuition, living, visa and flights. Scholarships may reduce this significantly.</p>
    </div>
  </div>
</template>
