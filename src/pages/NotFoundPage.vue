<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="site-container flex min-h-[50vh] max-w-lg flex-col items-center justify-center py-20 text-center">
    <div class="text-8xl font-extrabold text-gray-200">404</div>
    <h1 class="mt-4 text-2xl font-extrabold text-[var(--color-secondary)]">Page not found</h1>
    <p class="mt-2 text-[14px] text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink to="/" class="rounded-xl px-6 py-3 text-[14px] font-semibold text-white" style="background: var(--color-primary)">
        Back to home
      </RouterLink>
      <RouterLink to="/contact" class="rounded-xl border border-gray-200 px-6 py-3 text-[14px] font-semibold text-[var(--color-secondary)]">
        Contact us
      </RouterLink>
    </div>
  </div>
</template>
