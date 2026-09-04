<script setup>
import { RouterLink } from 'vue-router'
import { BRAND, WHATSAPP } from '../data/site.js'

const team = [
  { initials: 'HA', name: 'MD Hassan Biswas Arnob', role: 'DMD', color: '#D61F26' },
  { initials: 'SH', name: 'Sajjad Hossen', role: 'CEO', color: '#182640' },
  { initials: 'CE', name: 'Counsellor Team', role: 'Admissions', color: '#DD9F2B' },
]

const trustReasons = [
  'Free expert counselling',
  'Scholarship application support',
  'Full visa and pre-departure guidance',
]
</script>

<template>
  <div class="site-container py-10">
    <!-- Hero -->
    <div class="grid items-center gap-8 lg:grid-cols-2">
      <div class="grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-3 h-[260px] sm:h-[340px]">
        <div class="row-span-2 overflow-hidden rounded-2xl" style="background: linear-gradient(135deg, #fcebeb, #d61f26)"></div>
        <div class="overflow-hidden rounded-2xl" style="background: linear-gradient(135deg, #eef1f6, #182640)"></div>
        <div class="overflow-hidden rounded-2xl" style="background: linear-gradient(135deg, #fbf3e2, #dd9f2b)"></div>
      </div>
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-widest" style="color: var(--color-primary)">About us</div>
        <h1 class="mt-2 text-2xl font-extrabold leading-tight text-[var(--color-secondary)] sm:text-3xl">
          {{ BRAND }} — study in China from Bangladesh
        </h1>
        <p class="mt-3 text-[14px] leading-relaxed text-gray-600">
          {{ BRAND }} is a leading study-in-China consultancy for Bangladeshi students, offering end-to-end
          support from admission to visa. We guide Bangladeshi students end-to-end — choosing a university, winning
          scholarships, admission, and the student visa, with 5+ years of experience and 2000+ students helped.
        </p>
        <div class="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <RouterLink to="/contact" class="rounded-xl px-5 py-3 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
            Talk to a counsellor
          </RouterLink>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-3 text-center text-[13px] font-semibold text-white">
            WhatsApp us
          </a>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-8 grid gap-3 sm:grid-cols-3">
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">2000+</div>
        <div class="mt-1 text-[12px] text-gray-500">Students guided</div>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">5++</div>
        <div class="mt-1 text-[12px] text-gray-500">Years experience</div>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white p-5 text-center">
        <div class="text-2xl font-extrabold text-[var(--color-secondary)]">98+</div>
        <div class="mt-1 text-[12px] text-gray-500">Universities</div>
      </div>
    </div>

    <!-- Team -->
    <div class="mt-12 text-center">
      <div class="text-[11px] font-semibold uppercase tracking-widest" style="color: var(--color-primary)">Our team</div>
      <h2 class="mt-1.5 text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">Meet the people who guide you</h2>
    </div>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <div v-for="member in team" :key="member.name" class="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]">
        <div class="relative overflow-hidden rounded-2xl" style="aspect-ratio: 3/4">
          <div class="flex h-full w-full items-center justify-center text-4xl font-extrabold text-white" :style="{ background: member.color }">
            {{ member.initials }}
          </div>
          <div class="absolute inset-x-2 bottom-2 rounded-xl bg-white/95 px-3 py-2 text-center shadow-sm">
            <div class="text-[13px] font-bold text-[var(--color-secondary)]">{{ member.name }}</div>
            <div class="text-[11px] text-gray-400">{{ member.role }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust -->
    <div class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Why students trust us</h2>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div v-for="reason in trustReasons" :key="reason" class="rounded-2xl border border-gray-200 bg-white p-5">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl" style="background: #fcebeb">
            <svg class="h-5 w-5" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div class="mt-3 text-[14px] font-bold text-[var(--color-secondary)]">{{ reason }}</div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-12 flex flex-col items-center gap-4 rounded-2xl px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left" style="background: #fbf3e2">
      <div>
        <div class="text-lg font-extrabold text-[var(--color-secondary)]">Ready to start your China journey?</div>
        <p class="mt-1 text-[13px] text-[#8A6A16]">Free counselling in Bangla — we'll guide every step.</p>
      </div>
      <RouterLink to="/contact" class="w-full rounded-xl px-6 py-3.5 text-center text-[13.5px] font-semibold text-white sm:w-auto sm:shrink-0" style="background: var(--color-primary)">
        Get free counselling →
      </RouterLink>
    </div>
  </div>
</template>
