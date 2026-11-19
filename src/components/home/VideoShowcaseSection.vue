<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'

const videos = ref([])
const index = ref(0)
const activeVideo = ref(null)

const visibleVideos = computed(() => {
  const list = videos.value
  if (!list.length) return []
  const count = Math.min(4, list.length)
  return Array.from({ length: count }, (_, i) => list[(index.value + i) % list.length])
})

function poster(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function go(step) {
  const total = videos.value.length || 1
  index.value = (index.value + step + total) % total
}

function goTo(next) {
  index.value = next
}

const { videos: homeVideos } = useHomeBootstrap()

function applyVideos(rows) {
  videos.value = rows?.length ? rows : []
  index.value = 0
}

onMounted(() => {
  applyVideos(homeVideos.value)
})

watch(homeVideos, applyVideos)

function openVideo(video) {
  activeVideo.value = video
}

function closeVideo() {
  activeVideo.value = null
}
</script>

<template>
  <section v-if="videos.length" class="site-container pb-14 sm:pb-16">
    <div class="reel-stage relative overflow-hidden rounded-[2rem] text-white ring-1 ring-white/10 lg:rounded-[2.75rem]">
      <div class="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full bg-crimson/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-jade/15 blur-3xl"></div>

      <div class="relative flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div class="max-w-xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            <i class="ti ti-brand-youtube text-[14px] text-crimson"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Video gallery</span>
          </div>
          <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
            Watch student guidance videos
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" class="reel-nav" aria-label="Previous videos" @click="go(-1)">
            <i class="ti ti-chevron-left text-[18px]"></i>
          </button>
          <button type="button" class="reel-nav" aria-label="Next videos" @click="go(1)">
            <i class="ti ti-chevron-right text-[18px]"></i>
          </button>
        </div>
      </div>

      <div class="relative px-4 pb-7 sm:px-6 lg:px-8 lg:pb-9">
        <div class="flex snap-x snap-mandatory items-end gap-3 overflow-x-auto pb-2 scrollbar-none lg:grid lg:snap-none lg:grid-cols-[1.25fr_0.85fr_0.85fr_0.85fr] lg:items-stretch lg:gap-4 lg:overflow-visible lg:pb-0">
          <button
            v-if="visibleVideos[0]"
            type="button"
            class="reel-card reel-card-feature min-w-[78vw] shrink-0 snap-center sm:min-w-[340px] lg:min-w-0"
            @click="openVideo(visibleVideos[0])"
          >
            <span class="reel-bezel aspect-[4/5]">
              <img
                :src="poster(visibleVideos[0].id)"
                alt=""
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-700 group-hover:scale-125"
              />
              <span class="reel-shade"></span>
              <span class="reel-glass"></span>
              <span class="reel-play">
                <i class="ti ti-player-play-filled ml-0.5 text-[18px]"></i>
              </span>
            </span>
          </button>

          <button
            v-for="(video, sideIndex) in visibleVideos.slice(1)"
            :key="`${video.id}-${index}-${sideIndex}`"
            type="button"
            class="reel-card min-w-[58vw] shrink-0 snap-center sm:min-w-[220px] lg:min-w-0"
            :style="{ transitionDelay: `${sideIndex * 40}ms` }"
            @click="openVideo(video)"
          >
            <span class="reel-bezel aspect-[4/5]">
              <img
                :src="poster(video.id)"
                alt=""
                loading="lazy"
                decoding="async"
                class="absolute inset-0 h-full w-full scale-110 object-cover transition duration-700 group-hover:scale-125"
              />
              <span class="reel-shade"></span>
              <span class="reel-play reel-play-sm">
                <i class="ti ti-player-play-filled ml-0.5 text-[16px]"></i>
              </span>
            </span>
          </button>
        </div>

        <div v-if="videos.length > 1" class="mt-5 flex items-center justify-center gap-1.5">
          <button
            v-for="(_, dot) in videos"
            :key="dot"
            type="button"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="dot === index ? 'w-7 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/55'"
            :aria-label="`Show video ${dot + 1}`"
            @click="goTo(dot)"
          ></button>
        </div>
      </div>
    </div>

    <div
      v-if="activeVideo"
      class="fixed inset-0 z-[80] flex items-center justify-center bg-[#05080e]/80 p-4 backdrop-blur-md"
      @click.self="closeVideo"
    >
      <div class="relative w-full max-w-[380px]">
        <div class="pointer-events-none absolute -inset-8 rounded-full bg-crimson/20 blur-3xl"></div>
        <div class="relative overflow-hidden rounded-[1.8rem] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
          <button
            type="button"
            class="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur hover:bg-black/80"
            aria-label="Close video"
            @click="closeVideo"
          >
            <i class="ti ti-x text-[20px]"></i>
          </button>
          <div class="aspect-[9/16] bg-black">
            <iframe
              class="h-full w-full"
              :src="`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reel-stage {
  background:
    radial-gradient(ellipse 70% 45% at 50% -10%, rgba(225, 29, 46, 0.16), transparent 55%),
    linear-gradient(180deg, #080d16 0%, #10192a 55%, #0b1220 100%);
}

.reel-nav {
  display: flex;
  height: 2.6rem;
  width: 2.6rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  transition: background 0.2s ease, transform 0.2s ease;
}

.reel-nav:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.reel-card {
  display: block;
  text-align: left;
  transition: transform 0.45s ease;
}

.reel-card:hover {
  transform: translateY(-6px);
}

.reel-card-feature:hover {
  transform: translateY(-8px);
}

.reel-bezel {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 1.7rem;
  background: #070b12;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.38),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.reel-glass {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent 28%, transparent 70%, rgba(0, 0, 0, 0.28));
}

.reel-shade {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 13, 22, 0.05), rgba(8, 13, 22, 0.18));
  transition: background 0.3s ease;
}

.reel-card:hover .reel-shade {
  background: linear-gradient(180deg, rgba(8, 13, 22, 0.02), rgba(8, 13, 22, 0.28));
}

.reel-play {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  height: 3.4rem;
  width: 3.4rem;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: white;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8px);
  opacity: 1;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.reel-play-sm {
  height: 3rem;
  width: 3rem;
}

.reel-card:hover .reel-play {
  transform: translate(-50%, -50%) scale(1.05);
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
