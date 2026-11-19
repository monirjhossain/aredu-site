<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="site-container flex min-h-[50vh] max-w-lg flex-col items-center justify-center py-16 text-center sm:py-20">
    <div class="font-display text-7xl font-extrabold text-ink/10 sm:text-8xl">404</div>
    <h1 class="mt-3 font-display text-2xl font-extrabold text-ink">Page not found</h1>
    <p class="mt-2 text-[14px] text-ink/50">The page you're looking for doesn't exist or has been moved.</p>
    <div class="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
      <RouterLink to="/" class="btn-primary w-full sm:w-auto">Back to home</RouterLink>
      <RouterLink to="/contact" class="btn-ghost w-full sm:w-auto">Contact us</RouterLink>
    </div>
  </div>
</template>
