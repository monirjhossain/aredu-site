<script setup>
import { RouterLink } from 'vue-router'
import { TOOLS } from '../../../data/site'

defineEmits(['close'])
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1fr]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">Tools</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          Free planning tools — no signup needed.
        </p>
      </div>

      <div class="grid gap-x-8 sm:grid-cols-2">
        <RouterLink
          v-for="(t, i) in TOOLS"
          :key="t.to"
          :to="t.to"
          class="group flex items-start gap-3 border-b border-ink/8 py-3.5"
          @click="$emit('close')"
        >
          <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[12px] font-bold text-white" :style="{ background: t.color }">
            0{{ i + 1 }}
          </span>
          <span class="min-w-0">
            <span class="block text-[13.5px] font-semibold text-ink group-hover:text-crimson">{{ t.title }}</span>
            <span class="mt-0.5 block text-[12px] leading-snug text-ink/45">{{ t.desc }}</span>
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
