<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { DEGREES, FIELD_GROUPS } from '../../../data/site'
import { fetchMajors } from '../../../api/majors.js'

defineEmits(['close'])
const majorCount = ref(0)

onMounted(async () => {
  try {
    const result = await fetchMajors({ perPage: 1 })
    majorCount.value = result.total || 0
  } catch (e) {
    majorCount.value = 0
  }
})
</script>

<template>
  <div class="site-container">
    <div class="grid gap-8 lg:grid-cols-[200px_1fr_1fr]">
      <div>
        <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">Majors</div>
        <p class="mt-3 text-[13px] leading-relaxed text-ink/50">
          Pick a degree level or subject field to shape your shortlist.
        </p>
        <RouterLink
          to="/majors"
          class="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-crimson"
          @click="$emit('close')"
        >
          All {{ majorCount || '' }}{{ majorCount ? '+' : '' }} majors
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Degree level</div>
        <div class="space-y-1">
          <RouterLink
            v-for="d in DEGREES"
            :key="d.slug"
            :to="`/study/${d.slug}`"
            class="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white"
            @click="$emit('close')"
          >
            <span class="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[12px] font-extrabold text-crimson ring-1 ring-ink/8">{{ d.letter }}</span>
            <span class="text-[13.5px] font-semibold text-ink group-hover:text-crimson">{{ d.name }}</span>
          </RouterLink>
        </div>
      </div>

      <div>
        <div class="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/35">Fields of study</div>
        <div class="columns-1 gap-x-8 sm:columns-2">
          <RouterLink
            v-for="f in FIELD_GROUPS.slice(0, 10)"
            :key="f"
            :to="{ path: '/majors', query: { field: f } }"
            class="mb-2 block break-inside-avoid text-[13px] font-medium text-ink/65 transition hover:text-crimson"
            @click="$emit('close')"
          >{{ f }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
