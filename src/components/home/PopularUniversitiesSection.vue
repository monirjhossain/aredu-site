<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { HOME_UNIVERSITIES } from '../../data/homeFallbacks.js'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'
import UniversityCard from '../ui/UniversityCard.vue'

const { universities } = useHomeBootstrap()
const featured = ref([...HOME_UNIVERSITIES])
const currentIndex = ref(0)
const paused = ref(false)
let timer = null

const heroUniversity = computed(() => featured.value[currentIndex.value] || featured.value[0])
const sideUniversities = computed(() => {
  if (!featured.value.length) return []
  return Array.from({ length: Math.min(4, featured.value.length) }, (_, i) =>
    featured.value[(currentIndex.value + i + 1) % featured.value.length],
  )
})
const gridUniversities = computed(() => {
  if (!featured.value.length) return []
  return Array.from({ length: Math.min(3, featured.value.length) }, (_, i) =>
    featured.value[(currentIndex.value + i + 5) % featured.value.length],
  )
})

function goTo(index) {
  if (!featured.value.length) return
  currentIndex.value = (index + featured.value.length) % featured.value.length
}

function startSlider() {
  stopSlider()
  if (featured.value.length <= 1) return
  timer = setInterval(() => {
    if (!paused.value) goTo(currentIndex.value + 1)
  }, 3000)
}

function stopSlider() {
  if (timer) clearInterval(timer)
  timer = null
}

function applyUniversities(list) {
  if (!list?.length) return
  featured.value = list.slice(0, 10)
  currentIndex.value = 0
  startSlider()
}

const sectionEl = ref(null)

onMounted(() => {
  startSlider()
  applyUniversities(universities.value)
})

watch(universities, applyUniversities)

onUnmounted(() => {
  stopSlider()
})
</script>

<template>
  <section ref="sectionEl" class="relative overflow-hidden bg-[#F7FAF9] py-14 sm:py-16 lg:py-20">
    <div class="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-jade/10 blur-3xl" />
    <div class="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-crimson/5 blur-3xl" />

    <div class="relative site-container">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5">
            <i class="ti ti-school text-[14px] text-jade"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-jade">Universities</span>
          </div>
          <h2 class="mt-4 font-display text-[1.65rem] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.35rem]">
            Top Chinese universities for Bangladeshi students
          </h2>
          <p class="mt-3 text-[14px] leading-relaxed text-ink/50 sm:text-[15px]">
            Explore ranked campuses with scholarships — shortlist your best fit for 2026 intake.
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <RouterLink
            to="/universities"
            class="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#132038]"
          >
            View all
            <i class="ti ti-arrow-right"></i>
          </RouterLink>
        </div>
      </div>

      <div class="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          class="overflow-hidden rounded-[1.75rem] bg-[#0d1d31] shadow-soft ring-1 ring-ink/8"
          @mouseenter="paused = true"
          @mouseleave="paused = false"
        >
          <div class="flex items-center justify-between border-b border-ink/6 bg-white px-5 py-3.5">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">Auto showcase</div>
              <div class="mt-1 text-[13px] font-semibold text-ink">Switches every 3 seconds</div>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition hover:border-ink/20 hover:text-ink"
                aria-label="Previous university"
                @click="goTo(currentIndex - 1)"
              >
                <i class="ti ti-chevron-left text-[18px]"></i>
              </button>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/60 transition hover:border-ink/20 hover:text-ink"
                aria-label="Next university"
                @click="goTo(currentIndex + 1)"
              >
                <i class="ti ti-chevron-right text-[18px]"></i>
              </button>
            </div>
          </div>

          <div class="relative min-h-[380px] overflow-hidden sm:min-h-[430px]">
            <Transition name="hero-card" mode="default">
              <RouterLink
                v-if="heroUniversity"
                :key="heroUniversity.slug"
                :to="`/university/${heroUniversity.slug}`"
                class="group absolute inset-0 block overflow-hidden transition duration-300 hover:shadow-lift"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-[#10233c] via-[#193960] to-[#0f766e]" />
                <img
                  v-if="heroUniversity.image"
                  :src="heroUniversity.image"
                  :alt="heroUniversity.name"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#08111d] via-[#08111d]/45 to-transparent" />
                <div class="absolute inset-0 opacity-25" style="background: radial-gradient(circle at 18% 20%, #ffffff 0%, transparent 32%)" />
                <div class="absolute inset-0 texture-grid opacity-25" />
                <div class="absolute inset-x-6 top-6 flex items-start justify-between gap-4">
                  <div class="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                    Featured university
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur">
                      {{ currentIndex + 1 }} / {{ featured.length }}
                    </div>
                    <div class="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink">
                      #{{ heroUniversity.ranking }}
                    </div>
                  </div>
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08111d] via-[#08111d]/85 to-transparent p-6 sm:p-8">
                  <div class="flex items-start gap-4">
                    <span class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/95 font-display text-[14px] font-extrabold text-ink">
                      {{ heroUniversity.code?.slice(0, 3) }}
                    </span>
                    <div class="min-w-0">
                      <h3 class="font-display text-[1.35rem] font-extrabold leading-tight text-white sm:text-[1.65rem]">
                        {{ heroUniversity.name }}
                      </h3>
                      <p class="mt-2 text-[13px] text-white/65">
                        {{ heroUniversity.city }} , {{ heroUniversity.province }}
                      </p>
                    </div>
                  </div>
                  <div class="mt-5 flex flex-wrap gap-2">
                    <span class="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 ring-1 ring-white/10">
                      Ranked campus
                    </span>
                    <span
                      v-if="heroUniversity.scholarship"
                      class="rounded-full bg-jade/20 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/10"
                    >
                      Scholarship available
                    </span>
                  </div>
                  <div class="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                    View university
                    <i class="ti ti-arrow-up-right transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
                  </div>
                </div>
              </RouterLink>
            </Transition>
          </div>

          <div class="border-t border-white/10 bg-white px-5 py-4">
            <div class="mb-3 h-1.5 overflow-hidden rounded-full bg-ink/8">
              <div
                class="h-full rounded-full bg-gradient-to-r from-crimson to-jade transition-all duration-500"
                :style="{ width: `${((currentIndex + 1) / featured.length) * 100}%` }"
              ></div>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-wrap items-center gap-1.5">
                <button
                  v-for="(uni, i) in featured"
                  :key="uni.slug"
                  type="button"
                  class="h-1.5 rounded-full transition-all"
                  :class="i === currentIndex ? 'w-6 bg-crimson' : 'w-2 bg-ink/15 hover:bg-ink/30'"
                  :aria-label="`Show ${uni.name}`"
                  @click="goTo(i)"
                ></button>
              </div>
              <div class="text-right">
                <div class="text-[12px] font-semibold text-ink/70">{{ heroUniversity.name }}</div>
                <div class="text-[11px] text-ink/35">{{ heroUniversity.city }} · {{ heroUniversity.province }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <RouterLink
            v-for="uni in sideUniversities"
            :key="uni.slug"
            :to="`/university/${uni.slug}`"
            class="group flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:ring-crimson/20"
          >
            <div class="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#11233c] to-[#28557c]">
              <img
                v-if="uni.image"
                :src="uni.image"
                :alt="uni.name"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <template v-else>
                <div class="absolute inset-0 texture-grid opacity-25" />
                <span class="relative font-display text-xl font-extrabold text-white/90">
                  {{ uni.code?.slice(0, 3) }}
                </span>
              </template>
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">#{{ uni.ranking }}</div>
              <h3 class="mt-1 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink group-hover:text-crimson">
                {{ uni.name }}
              </h3>
              <p class="mt-1 text-[12px] text-ink/45">{{ uni.city }} · {{ uni.province }}</p>
            </div>
            <i class="ti ti-arrow-right text-[16px] text-ink/25 transition group-hover:text-crimson"></i>
          </RouterLink>
        </div>
      </div>

      <template v-if="featured.length">
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in gridUniversities" :key="uni.slug" :university="uni" />
      </div>

      <div
        class="mt-10 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-ink px-5 py-6 text-white sm:flex-row sm:items-center sm:px-8 sm:py-7"
      >
        <div>
          <div class="font-display text-lg font-bold sm:text-xl">Explore all {{ featured.length }}+ universities</div>
          <p class="mt-1 text-[13px] text-white/50">Filter by city, ranking, scholarship and subject.</p>
        </div>
        <RouterLink
          to="/universities"
          class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
        >
          Explore universities
          <i class="ti ti-arrow-right"></i>
        </RouterLink>
      </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.hero-card-enter-active,
.hero-card-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-card-enter-from {
  opacity: 0;
  transform: translateX(24px) scale(0.985);
}

.hero-card-leave-to {
  opacity: 0;
  transform: translateX(-24px) scale(0.985);
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
