<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'

const slides = ref([])
const index = ref(0)
const paused = ref(false)
let timer = null

const visibleSlides = computed(() => {
  const list = slides.value
  if (!list.length) return []
  const count = Math.min(4, list.length)
  return Array.from({ length: count }, (_, i) => list[(index.value + i) % list.length])
})

function photoNumber(slide) {
  const found = slides.value.findIndex((item) => item.id === slide.id)
  return found >= 0 ? found + 1 : ''
}

function go(step) {
  const total = slides.value.length || 1
  index.value = (index.value + step + total) % total
}

function start() {
  stop()
  if (slides.value.length <= 1) return
  timer = setInterval(() => {
    if (!paused.value) go(1)
  }, 2800)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

const { successPhotos } = useHomeBootstrap()

function applyPhotos(rows) {
  slides.value = rows?.length ? rows : []
  index.value = 0
  start()
}

onMounted(() => {
  applyPhotos(successPhotos.value)
})

watch(successPhotos, applyPhotos)
onUnmounted(stop)
</script>

<template>
  <section v-if="slides.length" class="site-container py-14 sm:py-16">
    <div class="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/8 lg:rounded-[2.5rem]">
      <div class="flex flex-col gap-5 border-b border-ink/8 px-6 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5">
            <i class="ti ti-photo text-[14px] text-jade"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">Our gallery</span>
          </div>
          <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            See Our Success Photos
          </h2>
          <p class="mt-3 text-[14.5px] leading-relaxed text-ink/50">
            Real moments from counselling, university applications, visa support and student success stories.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 hover:border-ink/20 hover:text-ink"
            aria-label="Previous photos"
            @click="go(-1)"
          >
            <i class="ti ti-chevron-left text-[18px]"></i>
          </button>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 hover:border-ink/20 hover:text-ink"
            aria-label="Next photos"
            @click="go(1)"
          >
            <i class="ti ti-chevron-right text-[18px]"></i>
          </button>
        </div>
      </div>

      <div class="p-4 sm:p-5 lg:p-6" @mouseenter="paused = true" @mouseleave="paused = false">
        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-[12px] text-ink/45">Showing 4 photos at a time, sliding one by one</div>
          <div class="text-[12px] font-semibold text-crimson">{{ index + 1 }} / {{ slides.length }}</div>
        </div>

        <div class="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
          <div
            v-for="slide in visibleSlides"
            :key="`${slide.id}-${index}`"
            class="group min-w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.45rem] bg-white ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-soft sm:min-w-0"
          >
            <div class="relative aspect-[210/297] overflow-hidden">
              <img
                :src="slide.image"
                :alt="slide.title"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#08111d]/85 via-[#08111d]/20 to-transparent"></div>
              <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                Photo {{ photoNumber(slide) }}
              </div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="font-display text-[1rem] font-extrabold leading-tight text-white">{{ slide.title }}</div>
                <div v-if="slide.place" class="mt-1 text-[11px] text-white/75">{{ slide.place }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
