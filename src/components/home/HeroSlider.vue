<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUniversitiesCatalog } from '../../composables/useUniversitiesCatalog.js'

const ACCENTS = ['#D61F26', '#182640', '#DD9F2B', '#0E7490', '#7C3AED', '#16A34A', '#DB2777', '#B45309']

const { items: universities, load } = useUniversitiesCatalog()

const slides = computed(() =>
  universities.value.slice(0, 8).map((u, i) => ({
    ...u,
    accent: ACCENTS[i % ACCENTS.length],
  })),
)

const index = ref(0)
const paused = ref(false)
let timer = null

const current = computed(() => slides.value[index.value] || slides.value[0])
const prev = computed(() =>
  slides.value.length
    ? slides.value[(index.value - 1 + slides.value.length) % slides.value.length]
    : null,
)
const next = computed(() =>
  slides.value.length ? slides.value[(index.value + 1) % slides.value.length] : null,
)

function go(i) {
  if (!slides.value.length) return
  index.value = (i + slides.value.length) % slides.value.length
}

function start() {
  stop()
  timer = setInterval(() => {
    if (!paused.value) go(index.value + 1)
  }, 4200)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(async () => {
  await load()
  start()
})
onUnmounted(stop)
</script>

<template>
  <div
    v-if="slides.length && current"
    class="hero-slider relative isolate overflow-hidden rounded-[28px] border border-gray-200/80 bg-white shadow-[0_20px_60px_-28px_rgba(24,38,64,0.35)]"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Atmosphere -->
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#FCEBEB_0%,transparent_55%),radial-gradient(ellipse_at_90%_80%,#FBF3E2_0%,transparent_50%),linear-gradient(160deg,#FFF 0%,#F7F8FA 100%)]" />
    <div class="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-30 blur-2xl" style="background: var(--color-primary)" />
    <div class="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full opacity-25 blur-2xl" style="background: var(--color-accent)" />

    <!-- Soft China map silhouette -->
    <svg
      class="pointer-events-none absolute right-[-8%] top-[8%] h-[78%] w-[78%] opacity-[0.12]"
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="var(--color-primary)"
        d="M72 58c18-22 52-34 86-30 28 3 48 18 74 16 22-2 40-16 62-12 26 5 46 24 58 46 10 18 8 40 2 60-4 14 2 30-6 44-10 18-30 28-48 38-20 11-42 22-66 22-28 0-48-16-74-18-24-2-48 10-70 2-20-7-34-26-40-46-8-26-6-54 4-78 6-14 10-30 18-44z"
      />
    </svg>

    <div class="relative z-10 p-5 sm:p-6 lg:p-7">
      <div class="mb-5 flex items-center justify-between gap-3">
        <div>
          <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Featured universities</div>
          <div class="mt-0.5 text-[13px] font-semibold text-[var(--color-secondary)]">Explore top picks for BD students</div>
        </div>
        <div class="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-[var(--color-primary)]"
            @click="go(index - 1)"
          >
            <i class="ti ti-chevron-left text-[18px]"></i>
          </button>
          <button
            type="button"
            aria-label="Next"
            class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-gray-300 hover:text-[var(--color-primary)]"
            @click="go(index + 1)"
          >
            <i class="ti ti-chevron-right text-[18px]"></i>
          </button>
        </div>
      </div>

      <!-- Stage -->
      <div class="relative mx-auto h-[280px] max-w-[420px] sm:h-[300px]">
        <!-- Side cards -->
        <button
          type="button"
          class="absolute left-0 top-1/2 z-[1] hidden w-[42%] -translate-y-1/2 -translate-x-[18%] scale-[0.86] opacity-40 transition duration-500 sm:block"
          @click="go(index - 1)"
        >
          <div class="overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-3 shadow-md backdrop-blur">
            <div class="flex items-center gap-2.5">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-bold text-white"
                :style="{ background: prev.accent }"
              >{{ prev.code?.slice(0, 3) }}</span>
              <span class="min-w-0 text-left">
                <span class="block truncate text-[12px] font-semibold text-[var(--color-secondary)]">{{ prev.name }}</span>
                <span class="block text-[10px] text-gray-400">{{ prev.city }}</span>
              </span>
            </div>
          </div>
        </button>

        <button
          type="button"
          class="absolute right-0 top-1/2 z-[1] hidden w-[42%] -translate-y-1/2 translate-x-[18%] scale-[0.86] opacity-40 transition duration-500 sm:block"
          @click="go(index + 1)"
        >
          <div class="overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-3 shadow-md backdrop-blur">
            <div class="flex items-center gap-2.5">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-bold text-white"
                :style="{ background: next.accent }"
              >{{ next.code?.slice(0, 3) }}</span>
              <span class="min-w-0 text-left">
                <span class="block truncate text-[12px] font-semibold text-[var(--color-secondary)]">{{ next.name }}</span>
                <span class="block text-[10px] text-gray-400">{{ next.city }}</span>
              </span>
            </div>
          </div>
        </button>

        <!-- Active card -->
        <Transition name="hero-fade" mode="out-in">
          <RouterLink
            :key="current.slug"
            :to="`/university/${current.slug}`"
            class="absolute inset-x-[6%] top-0 z-[2] block sm:inset-x-[12%]"
          >
            <article
              class="overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-[0_18px_40px_-20px_rgba(24,38,64,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-18px_rgba(24,38,64,0.5)]"
            >
              <div class="relative h-[148px] overflow-hidden sm:h-[160px]" :style="{ background: `linear-gradient(135deg, ${current.accent}, #182640)` }">
                <img
                  v-if="current.image"
                  :src="current.image"
                  :alt="current.name"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-cover"
                />
                <div v-else class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at 70% 30%, #fff 0%, transparent 45%)" />
                <div v-if="!current.image" class="absolute inset-0 flex items-center justify-center">
                  <span class="text-[64px] font-extrabold tracking-tight text-white/20 sm:text-[72px]">{{ current.code?.slice(0, 3) }}</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div class="absolute left-4 top-4 flex items-center gap-2">
                  <span v-if="current.ranking" class="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[var(--color-secondary)]">
                    #{{ current.ranking }}
                  </span>
                  <span v-if="current.scholarship" class="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#166534]" style="background: #dcfce7">
                    Scholarship
                  </span>
                </div>
                <div class="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/30">
                  <i class="ti ti-arrow-up-right text-[20px]"></i>
                </div>
              </div>

              <div class="p-4 sm:p-5">
                <div class="flex items-start gap-3">
                  <span
                    class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-[12px] font-bold text-white shadow-sm"
                    :style="{ background: current.accent }"
                  >
                    {{ current.code?.slice(0, 4) }}
                  </span>
                  <div class="min-w-0 flex-1">
                    <h3 class="truncate text-[16px] font-extrabold leading-snug text-[var(--color-secondary)] sm:text-[17px]">
                      {{ current.name }}
                    </h3>
                    <p class="mt-1 flex items-center gap-1.5 text-[12.5px] text-gray-500">
                      <i class="ti ti-map-pin text-[14px]" style="color: var(--color-primary)"></i>
                      {{ current.city }}<span v-if="current.province">, {{ current.province }}</span>
                    </p>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3.5">
                  <span class="text-[12px] text-gray-400">Slide {{ index + 1 }} / {{ slides.length }}</span>
                  <span class="inline-flex items-center gap-1 text-[12.5px] font-semibold" style="color: var(--color-primary)">
                    View university
                    <i class="ti ti-arrow-right text-[14px]"></i>
                  </span>
                </div>
              </div>
            </article>
          </RouterLink>
        </Transition>
      </div>

      <!-- Dots + progress -->
      <div class="mt-5 flex flex-col items-center gap-3">
        <div class="flex items-center gap-1.5">
          <button
            v-for="(s, i) in slides"
            :key="s.slug"
            type="button"
            class="h-2 rounded-full transition-all duration-300"
            :class="i === index ? 'w-6' : 'w-2 bg-gray-300 hover:bg-gray-400'"
            :style="i === index ? { background: 'var(--color-primary)' } : {}"
            :aria-label="`Go to slide ${i + 1}`"
            @click="go(i)"
          />
        </div>
        <div class="h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-gray-100">
          <div
            class="hero-progress h-full rounded-full"
            :class="{ 'hero-progress--paused': paused }"
            :key="index"
            style="background: linear-gradient(90deg, var(--color-primary), var(--color-accent))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-fade-enter-from {
  opacity: 0;
  transform: translateX(28px) scale(0.98);
}
.hero-fade-leave-to {
  opacity: 0;
  transform: translateX(-28px) scale(0.98);
}

.hero-progress {
  width: 100%;
  transform-origin: left center;
  animation: hero-progress 4.2s linear forwards;
}
.hero-progress--paused {
  animation-play-state: paused;
}

@keyframes hero-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade-enter-active,
  .hero-fade-leave-active,
  .hero-progress {
    animation: none !important;
    transition: none !important;
  }
}
</style>