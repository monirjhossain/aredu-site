<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  eyebrow: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="mb-6 border-b border-ink/8 pb-5 sm:mb-8 sm:pb-6">
    <div v-if="eyebrow" class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">{{ eyebrow }}</div>
    <h1 class="mt-1 font-display text-[1.55rem] font-extrabold tracking-tight text-ink sm:text-[2rem]">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink/50 sm:text-[14px]">
      {{ subtitle }}
    </p>
  </header>
</template>
