<script setup>
import { ref } from 'vue'

defineProps({
  q: { type: String, required: true },
  a: { type: String, required: true },
})

const open = ref(false)
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,1),rgba(247,250,249,0.92))] ring-1 ring-ink/8 transition"
    :class="open && 'ring-crimson/20'"
  >
    <button type="button" class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" @click="open = !open">
      <span class="font-display text-[14.5px] font-bold text-ink">{{ q }}</span>
      <span
        class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sand text-ink transition"
        :class="open && 'rotate-45 bg-crimson text-white'"
      >
        <i class="ti ti-plus text-[16px]"></i>
      </span>
    </button>
    <div v-show="open" class="px-5 pb-5 text-[13.5px] leading-relaxed text-ink/60">
      {{ a }}
    </div>
  </div>
</template>
