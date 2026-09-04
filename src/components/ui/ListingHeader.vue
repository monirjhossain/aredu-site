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
})
</script>

<template>
  <header class="mb-8 border-b border-gray-200 pb-6">
    <h1 class="text-[1.75rem] font-extrabold tracking-tight text-[var(--color-secondary)] sm:text-[2rem]">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="mt-2 max-w-2xl text-[14px] leading-relaxed text-gray-500">
      {{ subtitle }}
    </p>
  </header>
</template>
