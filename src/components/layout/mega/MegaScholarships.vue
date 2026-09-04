<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchScholarships } from '../../../api/scholarships.js'

defineEmits(['close'])
const featured = ref([])

onMounted(async () => {
  try {
    const result = await fetchScholarships({ perPage: 5 })
    featured.value = result.items.slice(0, 5)
  } catch (e) {
    console.error(e)
    featured.value = []
  }
})
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1fr_220px]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-jade">Scholarships</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          Explore full and partial funding before you shortlist universities.
        </p>
        <RouterLink
          to="/scholarships"
          class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-jade"
          @click="$emit('close')"
        >
          All scholarships
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Funding options</div>
        <div class="divide-y divide-ink/8 border-y border-ink/8">
          <RouterLink
            v-for="s in featured"
            :key="s.slug"
            :to="`/scholarship/${s.slug}`"
            class="group flex items-center justify-between gap-4 py-3"
            @click="$emit('close')"
          >
            <span class="min-w-0">
              <span class="block truncate text-[13.5px] font-semibold text-ink group-hover:text-jade">{{ s.name }}</span>
              <span class="block text-[12px] text-ink/40">
                {{ s.universities || '—' }}+ universities
              </span>
            </span>
            <span class="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink/55 ring-1 ring-ink/8">
              {{ s.coverage || 'Award' }}
            </span>
          </RouterLink>
        </div>
      </div>

      <div class="rounded-xl bg-jade px-4 py-5 text-white">
        <div class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Eligibility</div>
        <div class="mt-2 font-display text-[1.05rem] font-extrabold leading-snug">Check what you may qualify for</div>
        <p class="mt-2 text-[12px] leading-relaxed text-white/70">GPA + degree based preview in under a minute.</p>
        <RouterLink
          to="/tools/scholarship-checker"
          class="mt-4 inline-flex rounded-lg bg-white px-3.5 py-2 text-[12px] font-semibold text-jade"
          @click="$emit('close')"
        >
          Open checker
        </RouterLink>
      </div>
    </div>
  </div>
</template>
