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
  <div class="site-container max-w-2xl py-8 sm:py-10 lg:py-12">
    <div class="mb-6 text-center sm:mb-8">
      <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-crimson">Free tool</span>
      <h1 class="mt-2 font-display text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-2xl md:text-3xl">
        Cost calculator
      </h1>
      <p class="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-ink/50 sm:text-[14px]">
        Estimate your total study cost in China — shown in Taka (BDT).
      </p>
    </div>

    <div class="rounded-[1.35rem] bg-white p-4 ring-1 ring-ink/8 sm:rounded-2xl sm:p-6">
      <p class="mb-4 text-[12px] leading-relaxed text-ink/40 sm:mb-5">
        Enter annual costs in CNY (Chinese Yuan). Rate: 1 CNY ≈ {{ CNY_TO_BDT }} BDT.
      </p>
      <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Tuition (CNY/year)</label>
          <input
            v-model="tuition"
            type="number"
            min="0"
            inputmode="decimal"
            placeholder="e.g. 15000"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Living expenses (CNY/year)</label>
          <input
            v-model="living"
            type="number"
            min="0"
            inputmode="decimal"
            placeholder="e.g. 12000"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Visa & medical (CNY, one-time)</label>
          <input
            v-model="visa"
            type="number"
            min="0"
            inputmode="decimal"
            placeholder="e.g. 3000"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
        <div>
          <label class="block text-[12px] font-semibold text-ink/50">Flights Dhaka ↔ China (CNY)</label>
          <input
            v-model="flights"
            type="number"
            min="0"
            inputmode="decimal"
            placeholder="e.g. 5000"
            class="mt-1.5 w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
          />
        </div>
      </div>
    </div>

    <div
      v-if="hasValues"
      class="mt-5 overflow-hidden rounded-[1.35rem] bg-ink px-5 py-7 text-center sm:mt-6 sm:rounded-2xl sm:px-6 sm:py-8"
    >
      <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">Estimated total</div>
      <div class="mt-2 font-display text-[2rem] font-extrabold tracking-tight text-white sm:text-4xl">
        ৳ {{ formatBdt(total.bdt) }}
      </div>
      <div class="mt-1 text-[13.5px] text-white/50 sm:text-[14px]">≈ ¥ {{ formatBdt(total.cny) }} CNY</div>
      <p class="mx-auto mt-4 max-w-sm text-[12px] leading-relaxed text-white/40">
        Includes tuition, living, visa and flights. Scholarships may reduce this significantly.
      </p>
    </div>
  </div>
</template>
