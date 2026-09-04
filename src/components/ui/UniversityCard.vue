<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  university: { type: Object, required: true },
})
</script>

<template>
  <RouterLink
    :to="`/university/${university.slug}`"
    class="group relative block overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,#ffffff_0%,#fcfcfd_100%)] ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-crimson/25"
  >
    <div class="pointer-events-none absolute inset-x-0 bottom-0 top-[45%] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(247,248,250,0.9))]"></div>
    <div class="relative h-44 overflow-hidden bg-ink sm:h-48">
      <img
        v-if="university.image"
        :src="university.image"
        :alt="university.name"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="absolute inset-0 opacity-90 transition duration-500 group-hover:scale-105"
        :style="{ background: `linear-gradient(135deg, #0A1628 0%, #1a3050 50%, #E11D2E 160%)` }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#08111d]/90 via-[#08111d]/20 to-transparent" />
      <div class="absolute inset-0 texture-grid opacity-40" />
      <div class="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"></div>
      <div class="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 font-display text-[10.5px] font-bold text-ink shadow-sm">
        #{{ university.ranking }}
      </div>
      <div class="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <div>
          <div class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">China campus</div>
          <div class="mt-1 text-[12px] text-white/80">{{ university.city }}</div>
        </div>
        <div class="font-display text-5xl font-extrabold leading-none text-white/15">
          {{ university.code?.slice(0, 3) }}
        </div>
      </div>
    </div>
    <div class="relative p-4 sm:p-5">
      <div class="flex items-start gap-3">
        <span class="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-sand font-display text-[11px] font-bold text-ink shadow-sm">
          <img
            v-if="university.image"
            :src="university.image"
            :alt="university.name"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <span v-else>{{ university.code?.slice(0, 3) || 'UNI' }}</span>
        </span>
        <div class="min-w-0">
          <h3 class="line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink transition group-hover:text-crimson">
            {{ university.name }}
          </h3>
          <p class="mt-1 flex items-center gap-1.5 text-[12px] text-ink/45">
            <i class="ti ti-map-pin text-[13px] text-crimson/80"></i>
            {{ university.city }} · {{ university.province }}
          </p>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <div class="rounded-xl bg-[linear-gradient(145deg,#F7F8FA,#EEF3F7)] px-3 py-2">
          <div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">Views</div>
          <div class="mt-1 text-[13px] font-bold text-ink">{{ university.views }}</div>
        </div>
        <div class="rounded-xl bg-[linear-gradient(145deg,#F7F8FA,#F4EFE9)] px-3 py-2">
          <div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">Type</div>
          <div class="mt-1 text-[13px] font-bold text-ink">{{ university.scholarship ? 'Scholarship' : 'General' }}</div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between border-t border-ink/6 pt-3.5">
        <span
          v-if="university.scholarship"
          class="rounded-full bg-jade/10 px-3 py-1 text-[10.5px] font-semibold text-jade"
        >Scholarship available</span>
        <span v-else class="rounded-full bg-ink/5 px-3 py-1 text-[10.5px] text-ink/35">Admission open</span>
        <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-crimson opacity-0 transition group-hover:opacity-100">
          View
          <i class="ti ti-arrow-right text-[13px]"></i>
        </span>
      </div>
    </div>
  </RouterLink>
</template>
