<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { REGIONS } from '../../../data/site'
import { fetchUniversities } from '../../../api/universities.js'

defineEmits(['close'])
const featured = ref([])

onMounted(async () => {
  try {
    const result = await fetchUniversities({ perPage: 8 })
    featured.value = result.items.slice(0, 5)
  } catch (e) {
    console.error(e)
    featured.value = []
  }
})
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1fr_220px]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">Universities</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          Shortlist campuses from live admin data.
        </p>
        <RouterLink
          to="/universities"
          class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-crimson"
          @click="$emit('close')"
        >
          Browse directory
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Featured</div>
        <div class="divide-y divide-ink/8 border-y border-ink/8">
          <div v-if="!featured.length" class="py-4 text-[12px] text-ink/40">Loading...</div>
          <RouterLink
            v-for="u in featured"
            :key="u.slug"
            :to="`/university/${u.slug}`"
            class="group flex items-center justify-between gap-4 py-3 transition hover:bg-white/70"
            @click="$emit('close')"
          >
            <span class="flex min-w-0 items-center gap-3">
              <span class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink text-[10px] font-bold text-white">
                <img v-if="u.image" :src="u.image" :alt="u.name" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover" />
                <span v-else>{{ u.code?.slice(0, 3) }}</span>
              </span>
              <span class="min-w-0">
                <span class="block truncate text-[13.5px] font-semibold text-ink group-hover:text-crimson">{{ u.name }}</span>
                <span class="block text-[12px] text-ink/40">{{ u.city }} · #{{ u.ranking }}</span>
              </span>
            </span>
          </RouterLink>
        </div>
      </div>

      <div class="space-y-5">
        <div>
          <div class="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Regions</div>
          <div class="space-y-1.5">
            <RouterLink
              v-for="r in REGIONS.slice(0, 5)"
              :key="r.slug"
              :to="`/region/${r.slug}`"
              class="block text-[13px] font-medium text-ink/65 transition hover:text-crimson"
              @click="$emit('close')"
            >{{ r.name }}</RouterLink>
          </div>
        </div>
        <div class="rounded-xl bg-ink px-4 py-4 text-white">
          <div class="text-[12px] font-semibold">Need a shortlist?</div>
          <RouterLink to="/contact" class="mt-2 inline-flex text-[12px] text-white/80 underline" @click="$emit('close')">
            Talk to a counsellor
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
