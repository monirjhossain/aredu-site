<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'

const { universities } = useHomeBootstrap()
const slides = ref([])
const index = ref(0)
const paused = ref(false)
let timer = null

const current = computed(() => slides.value[index.value] || null)

function go(i) {
  if (!slides.value.length) return
  index.value = (i + slides.value.length) % slides.value.length
}

function start() {
  stop()
  if (slides.value.length <= 1) return
  timer = setInterval(() => {
    if (!paused.value) go(index.value + 1)
  }, 3500)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

function applyUniversities(list) {
  slides.value = list?.length ? list.slice(0, 8) : []
  index.value = 0
  start()
}

onMounted(() => {
  applyUniversities(universities.value)
})

watch(universities, applyUniversities)

onUnmounted(stop)
</script>

<template>
  <div
    v-if="current"
    class="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.5rem] sm:min-h-[420px] sm:rounded-[2rem] lg:ml-auto lg:max-w-[440px] lg:min-h-[480px]"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <Transition name="uni-fade" mode="out-in">
      <div :key="current?.slug || index" class="absolute inset-0">
        <img
          v-if="current?.image"
          :src="current.image"
          :alt="current.name"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <div
          v-else
          class="absolute inset-0 bg-gradient-to-br from-[#1c3a5c] via-[#0A1628] to-[#7a1520]"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#08111d] via-[#08111d]/55 to-[#08111d]/25" />
        <div class="absolute inset-0 opacity-25" style="background: radial-gradient(circle at 30% 18%, #fff 0%, transparent 42%)" />
      </div>
    </Transition>

    <div class="relative z-10 flex flex-1 flex-col justify-end p-6 sm:p-8">
      <div class="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Featured universities</div>
      <h3 class="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-[1.7rem]">
        {{ current?.name }}
      </h3>
      <p class="mt-2 text-[13px] text-white/60">{{ current?.city || 'China' }}</p>
      <RouterLink
        :to="`/university/${current?.slug}`"
        class="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink"
      >
        View university
        <i class="ti ti-arrow-right"></i>
      </RouterLink>

      <div v-if="slides.length > 1" class="mt-8 flex gap-2">
        <button
          v-for="(_, i) in slides"
          :key="i"
          type="button"
          class="h-1.5 flex-1 rounded-full transition"
          :class="i === index ? 'bg-white' : 'bg-white/25'"
          @click="go(i)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.uni-fade-enter-active,
.uni-fade-leave-active {
  transition: opacity 0.45s ease;
}
.uni-fade-enter-from,
.uni-fade-leave-to {
  opacity: 0;
}
</style>
