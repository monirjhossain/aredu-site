<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import universities from '../../data/universities.json'

const slides = universities.slice(0, 10)
const index = ref(0)
const paused = ref(false)
let timer = null

const current = computed(() => slides[index.value])

function go(i) {
  index.value = (i + slides.length) % slides.length
}

function start() {
  stop()
  timer = setInterval(() => {
    if (!paused.value) go(index.value + 1)
  }, 3500)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <div
    class="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[2rem] sm:min-h-[480px] lg:max-w-[440px] lg:ml-auto"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-[#1c3a5c] via-[#0A1628] to-[#7a1520]" />
    <div class="absolute inset-0 opacity-35" style="background: radial-gradient(circle at 30% 18%, #fff 0%, transparent 42%)" />
    <div class="absolute inset-0 texture-grid opacity-40" />

    <div class="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
      <div class="mb-4 flex items-center justify-between">
        <span class="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Featured universities</span>
        <div class="flex gap-1.5">
          <button
            type="button"
            aria-label="Previous"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            @click="go(index - 1)"
          >
            <i class="ti ti-chevron-left text-[16px]"></i>
          </button>
          <button
            type="button"
            aria-label="Next"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            @click="go(index + 1)"
          >
            <i class="ti ti-chevron-right text-[16px]"></i>
          </button>
        </div>
      </div>

      <div class="relative min-h-[220px] flex-1 sm:min-h-[250px]">
        <Transition name="hero-uni" mode="out-in">
          <RouterLink
            :key="current.slug"
            :to="`/university/${current.slug}`"
            class="block h-full"
          >
            <div class="flex h-full min-h-[220px] flex-col rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15 sm:min-h-[250px] sm:p-5">
              <div class="flex items-start justify-between gap-3">
                <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white font-display text-[13px] font-extrabold text-ink">
                  {{ current.code?.slice(0, 3) }}
                </span>
                <div class="flex flex-col items-end gap-1.5">
                  <span class="rounded-md bg-crimson px-2 py-0.5 text-[11px] font-bold text-white">#{{ current.ranking }}</span>
                  <span
                    v-if="current.scholarship"
                    class="rounded-md bg-jade/90 px-2 py-0.5 text-[10px] font-semibold text-white"
                  >Scholarship</span>
                </div>
              </div>

              <h3 class="mt-5 font-display text-[1.35rem] font-extrabold leading-snug text-white sm:text-[1.5rem]">
                {{ current.name }}
              </h3>
              <p class="mt-2 flex items-center gap-1.5 text-[13px] text-white/60">
                <i class="ti ti-map-pin text-crimson"></i>
                {{ current.city }}<span v-if="current.province">, {{ current.province }}</span>
              </p>

              <div class="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                <span class="text-[12px] text-white/45">{{ index + 1 }} / {{ slides.length }}</span>
                <span class="inline-flex items-center gap-1 text-[13px] font-semibold text-white">
                  View university
                  <i class="ti ti-arrow-right"></i>
                </span>
              </div>
            </div>
          </RouterLink>
        </Transition>
      </div>

      <div class="mt-4 flex justify-center gap-1.5">
        <button
          v-for="(s, i) in slides"
          :key="s.slug"
          type="button"
          class="h-1.5 rounded-full transition-all"
          :class="i === index ? 'w-5 bg-crimson' : 'w-1.5 bg-white/30 hover:bg-white/50'"
          :aria-label="`Slide ${i + 1}`"
          @click="go(i)"
        />
      </div>

      <div class="mt-5 border-t border-white/10 pt-5">
        <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-jade">Dhaka → China</div>
        <p class="mt-2 font-display text-[1.15rem] font-bold leading-snug text-white sm:text-xl">
          Your next classroom is waiting across the Silk Road.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-uni-enter-active,
.hero-uni-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-uni-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.hero-uni-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (prefers-reduced-motion: reduce) {
  .hero-uni-enter-active,
  .hero-uni-leave-active {
    transition: none;
  }
}
</style>
