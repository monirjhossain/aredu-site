<script setup>
import { RouterLink } from 'vue-router'
import { WHATSAPP } from '../../data/site'
</script>

<template>
  <aside class="overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lift">
    <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">Need help choosing?</div>
    <p class="mt-3 font-display text-xl font-bold leading-snug">Free counselling in Bangla — we'll guide you.</p>
    <div class="mt-5 flex flex-col gap-2">
      <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-jade py-3 text-center text-[13px] font-semibold text-white hover:brightness-110">
        Chat on WhatsApp
      </a>
      <RouterLink to="/contact" class="rounded-xl bg-white/10 py-3 text-center text-[13px] font-semibold text-white hover:bg-white/15">
        Request a callback
      </RouterLink>
    </div>
  </aside>
</template>
