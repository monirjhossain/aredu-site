<script setup>
import { RouterLink } from 'vue-router'
import { SCHOLARSHIP_META, WHATSAPP } from '../data/site.js'
import scholarships from '../data/scholarships.json'
</script>

<template>
  <div class="site-container py-10">
    <div class="mb-8 text-center">
      <span class="text-[11px] font-semibold uppercase tracking-widest" style="color: var(--color-primary)">Scholarships</span>
      <h1 class="mt-2 text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">Scholarships for Bangladeshi students</h1>
      <p class="mx-auto mt-2 max-w-xl text-[14px] text-gray-500">
        CSC, provincial and university scholarships — see coverage and which universities offer them.
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="sch in scholarships"
        :key="sch.slug"
        :to="`/scholarship/${sch.slug}`"
        class="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" style="background: #fbf3e2">
            <i class="ti ti-award text-[22px]" style="color: #8a6a16"></i>
          </span>
          <span
            v-if="SCHOLARSHIP_META[sch.slug]"
            class="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style="background: var(--color-secondary); color: white"
          >
            {{ SCHOLARSHIP_META[sch.slug].coverage }}
          </span>
        </div>
        <h2 class="mt-4 text-[16px] font-bold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]">
          {{ sch.name }}
        </h2>
        <template v-if="SCHOLARSHIP_META[sch.slug]">
          <p class="mt-2 text-[13px] leading-relaxed text-gray-500">{{ SCHOLARSHIP_META[sch.slug].desc }}</p>
          <p class="mt-3 text-[12px] font-semibold text-gray-400">
            {{ SCHOLARSHIP_META[sch.slug].universities }}+ universities
          </p>
        </template>
      </RouterLink>
    </div>

    <div class="mt-10 rounded-2xl px-6 py-8 text-center" style="background: #fbf3e2">
      <h3 class="text-lg font-extrabold text-[var(--color-secondary)]">Not sure which scholarship fits you?</h3>
      <p class="mt-1 text-[13px] text-[#8A6A16]">Use our free scholarship checker or talk to a counsellor.</p>
      <div class="mt-4 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
        <RouterLink to="/tools/scholarship-checker" class="rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white" style="background: var(--color-primary)">
          Scholarship checker
        </RouterLink>
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-[13px] font-semibold text-white">
          WhatsApp us
        </a>
      </div>
    </div>
  </div>
</template>
