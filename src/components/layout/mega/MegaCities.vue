<script setup>
import { RouterLink } from 'vue-router'
import { REGIONS } from '../../../data/site'
import cities from '../../../data/cities.json'

defineEmits(['close'])
const top = cities.slice(0, 8)
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1.2fr_0.8fr]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-jade">Cities</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          Compare lifestyle, region and university concentration across China.
        </p>
        <RouterLink
          to="/cities"
          class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-jade"
          @click="$emit('close')"
        >
          All cities
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Popular cities</div>
        <div class="grid gap-x-6 gap-y-1 sm:grid-cols-2">
          <RouterLink
            v-for="c in top"
            :key="c.slug"
            :to="`/city/${c.slug}`"
            class="group flex items-baseline justify-between gap-3 border-b border-ink/8 py-2.5"
            @click="$emit('close')"
          >
            <span class="text-[13.5px] font-semibold text-ink group-hover:text-jade">{{ c.name }}</span>
            <span class="shrink-0 text-[11px] text-ink/35">{{ c.universities || 1 }} unis</span>
          </RouterLink>
        </div>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Regions</div>
        <div class="space-y-1.5">
          <RouterLink
            v-for="r in REGIONS"
            :key="r.slug"
            :to="`/region/${r.slug}`"
            class="block text-[13px] font-medium text-ink/65 transition hover:text-jade"
            @click="$emit('close')"
          >{{ r.name }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
