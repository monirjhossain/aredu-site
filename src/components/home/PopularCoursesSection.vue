<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { COURSE_FILTERS, POPULAR_COURSES } from '../../data/popularCourses'

const active = ref('All')
const showAll = ref(false)

const filtered = computed(() => {
  if (active.value === 'All') return POPULAR_COURSES
  return POPULAR_COURSES.filter((c) => c.field === active.value)
})

const visible = computed(() => {
  if (showAll.value || filtered.value.length <= 6) return filtered.value
  return filtered.value.slice(0, 6)
})

const total = POPULAR_COURSES.length
</script>

<template>
  <section class="relative overflow-hidden pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#E8F3F1]/70 to-transparent" />

    <div class="relative site-container">
      <!-- Header -->
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1.5">
            <span class="rounded-md bg-crimson px-1.5 py-0.5 text-[10px] font-bold text-white">2026</span>
            <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-crimson">Trending now</span>
          </div>
          <h2 class="mt-4 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.35rem]">
            2026 China's Most Popular Courses among Bangladeshi Students
          </h2>
          <p class="mt-3 text-[14px] leading-relaxed text-ink/50 sm:text-[15px]">
            What BD students are choosing this year — browse {{ total }} top courses by demand, field and university count.
          </p>
        </div>
        <RouterLink
          to="/majors"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-ink px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#132038] lg:self-auto"
        >
          Browse all majors
          <i class="ti ti-arrow-right"></i>
        </RouterLink>
      </div>

      <!-- Filters — horizontal scroll on mobile -->
      <div class="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none sm:flex-wrap sm:overflow-visible">
        <button
          v-for="f in COURSE_FILTERS"
          :key="f"
          type="button"
          class="shrink-0 rounded-full px-4 py-2 text-[12.5px] font-semibold transition"
          :class="
            active === f
              ? 'bg-ink text-white'
              : 'bg-[#F4F6F8] text-ink/65 hover:bg-ink/5 hover:text-ink'
          "
          @click="active = f; showAll = false"
        >
          {{ f === 'All' ? `All (${total})` : f }}
        </button>
      </div>

      <!-- Course grid -->
      <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="(course, i) in visible"
          :key="course.slug"
          :to="`/major/${course.slug}`"
          class="group relative flex flex-col overflow-hidden rounded-2xl p-4 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-crimson/20 sm:p-5"
          :style="{ background: `linear-gradient(145deg, ${course.soft} 0%, #ffffff 58%, #ffffff 100%)` }"
        >
          <div class="flex items-start justify-between gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl text-[20px] transition group-hover:scale-105"
              :style="{ background: course.soft, color: course.accent }"
            >
              <i class="ti" :class="course.icon"></i>
            </div>
            <div class="flex flex-col items-end gap-1.5">
              <span class="font-display text-[13px] font-extrabold text-crimson">
                #{{ String(i + 1).padStart(2, '0') }}
              </span>
              <span
                class="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                :class="{
                  'bg-crimson/10 text-crimson': course.demand === 'Very High',
                  'bg-jade/10 text-jade': course.demand === 'High' || course.demand === 'Rising',
                  'bg-ink/5 text-ink/50': course.demand === 'Medium',
                }"
              >
                {{ course.demand }}
              </span>
            </div>
          </div>

          <h3 class="mt-4 font-display text-[15px] font-bold leading-snug text-ink group-hover:text-crimson sm:text-[16px]">
            {{ course.name }}
          </h3>

          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded-lg bg-[#F4F6F8] px-2.5 py-1 text-[11px] font-medium text-ink/55">
              {{ course.field }}
            </span>
            <span class="rounded-lg bg-[#F4F6F8] px-2.5 py-1 text-[11px] font-medium text-ink/55">
              {{ course.degree }}
            </span>
          </div>

          <div class="mt-auto flex items-center justify-between border-t border-ink/6 pt-3.5">
            <span class="text-[12px] text-ink/45">
              <span class="font-bold text-ink">{{ course.universities }}</span> universities
            </span>
            <span class="inline-flex items-center gap-1 text-[12.5px] font-semibold text-crimson opacity-80 transition group-hover:opacity-100">
              View
              <i class="ti ti-arrow-up-right text-[14px]"></i>
            </span>
          </div>
        </RouterLink>
      </div>

      <div v-if="filtered.length === 0" class="mt-10 rounded-2xl bg-[#F4F6F8] py-12 text-center text-[14px] text-ink/45">
        No courses in this field yet — try another filter.
      </div>

      <div v-if="filtered.length > 6" class="mt-8 flex justify-center">
        <button
          type="button"
          class="rounded-xl border border-ink/10 bg-white px-6 py-3 text-[13px] font-semibold text-ink transition hover:border-ink/20 hover:bg-[#F4F6F8]"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show less' : `Show all ${filtered.length} courses` }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
