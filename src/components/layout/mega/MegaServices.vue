<script setup>
import { RouterLink } from 'vue-router'
import { SERVICES } from '../../../data/site'

defineEmits(['close'])
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1fr]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">Services</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          From counselling to visa — support at every step of your China journey.
        </p>
        <RouterLink
          to="/services"
          class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-crimson"
          @click="$emit('close')"
        >
          View all services
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </div>

      <div class="grid gap-x-8 gap-y-1 sm:grid-cols-2">
        <RouterLink
          v-for="s in SERVICES"
          :key="s.slug"
          :to="`/service/${s.slug}`"
          class="group flex items-start gap-3 border-b border-ink/8 py-3.5"
          @click="$emit('close')"
        >
          <i class="ti mt-0.5 text-[18px]" :class="s.icon" :style="{ color: s.color }"></i>
          <span class="min-w-0">
            <span class="block text-[13.5px] font-semibold text-ink group-hover:text-crimson">{{ s.name }}</span>
            <span class="mt-0.5 block text-[12px] leading-snug text-ink/45">{{ s.short }}</span>
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
