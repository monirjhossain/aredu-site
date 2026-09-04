<script setup>
import { computed, ref } from 'vue'

const videos = [
  { id: 'ysz5S6PUM-U', title: 'How to study in China from Bangladesh', tag: 'Student guide' },
  { id: 'ScMzIvxBSi4', title: 'Scholarship and admission roadmap', tag: 'Scholarship tips' },
  { id: 'aqz-KE-bpKQ', title: 'University life and student journey', tag: 'Campus story' },
  { id: 'M7lc1UVf-VE', title: 'Visa and pre-departure support', tag: 'Visa help' },
  { id: 'dQw4w9WgXcQ', title: 'Choosing the right university path', tag: 'University shortlist' },
  { id: '3fumBcKC6RE', title: 'What to expect before landing in China', tag: 'Pre-departure' },
]

const index = ref(0)
const activeVideo = ref(null)

const visibleVideos = computed(() =>
  Array.from({ length: 4 }, (_, i) => videos[(index.value + i) % videos.length]),
)

function go(step) {
  index.value = (index.value + step + videos.length) % videos.length
}

function openVideo(video) {
  activeVideo.value = video
}

function closeVideo() {
  activeVideo.value = null
}
</script>

<template>
  <section class="site-container pb-14 sm:pb-16">
    <div class="overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#06101c,#0b172a_45%,#10233c_100%)] text-white ring-1 ring-white/10 lg:rounded-[2.5rem]">
      <div class="flex flex-col gap-5 border-b border-white/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
            <i class="ti ti-brand-youtube text-[14px] text-crimson"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">Video gallery</span>
          </div>
          <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Watch student guidance videos
          </h2>
          <p class="mt-3 text-[14.5px] leading-relaxed text-white/58">
            Vertical video previews keep playing on screen. Click any reel card to open the full video in a popup player.
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
            aria-label="Previous videos"
            @click="go(-1)"
          >
            <i class="ti ti-chevron-left text-[18px]"></i>
          </button>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
            aria-label="Next videos"
            @click="go(1)"
          >
            <i class="ti ti-chevron-right text-[18px]"></i>
          </button>
        </div>
      </div>

      <div class="relative p-4 sm:p-5 lg:p-6">
        <div class="pointer-events-none absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-crimson/15 blur-3xl"></div>
        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-[12px] text-white/45">Showing 4 vertical videos, sliding one by one</div>
          <div class="text-[12px] font-semibold text-crimson">{{ index + 1 }} / {{ videos.length }}</div>
        </div>

        <div class="relative flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-[1.18fr_0.94fr_0.94fr_0.94fr] lg:overflow-visible lg:pb-0">
          <button
            type="button"
            class="group min-w-[82vw] shrink-0 overflow-hidden rounded-[2.2rem] bg-white/8 p-2.5 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(225,29,46,0.18)] sm:min-w-[360px] lg:min-w-0"
            @click="openVideo(visibleVideos[0])"
          >
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#08111d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/35 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
                <div class="mx-auto h-1.5 w-16 rounded-full bg-white/20"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-white/40"></div>
              </div>
              <div class="absolute left-1/2 top-3 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-black/35 blur-sm"></div>
              <iframe
                class="absolute inset-0 h-full w-full scale-[1.18] origin-center"
                :src="`https://www.youtube.com/embed/${visibleVideos[0].id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${visibleVideos[0].id}&playsinline=1&modestbranding=1&rel=0`"
                :title="visibleVideos[0].title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <div class="absolute inset-0 bg-gradient-to-t from-[#08111d]/90 via-[#08111d]/20 to-transparent"></div>
              <div class="absolute left-5 top-14 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                Featured reel
              </div>
              <div class="absolute right-5 top-14 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                <i class="ti ti-player-play-filled ml-0.5 text-[18px]"></i>
              </div>
              <div class="absolute inset-x-5 bottom-5">
                <div class="rounded-[1.4rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                  <div class="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
                    {{ visibleVideos[0].tag }}
                  </div>
                  <div class="mt-3 font-display text-[1.2rem] font-extrabold leading-snug text-white sm:text-[1.35rem]">
                    {{ visibleVideos[0].title }}
                  </div>
                  <div class="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-white/80">
                    Watch in popup
                    <i class="ti ti-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <button
            v-for="(video, sideIndex) in visibleVideos.slice(1)"
            :key="`${video.id}-${index}`"
            type="button"
            class="group min-w-[66vw] shrink-0 overflow-hidden rounded-[1.7rem] bg-white/8 p-2 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,118,110,0.14)] sm:min-w-[250px] lg:min-w-0"
            :class="
              sideIndex === 0
                ? 'lg:-rotate-1'
                : sideIndex === 1
                  ? 'lg:translate-y-3'
                  : 'lg:rotate-1'
            "
            @click="openVideo(video)"
          >
            <div class="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#08111d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] aspect-[4/5]">
              <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/30 to-transparent"></div>
              <div class="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
                <div class="mx-auto h-1.5 w-12 rounded-full bg-white/20"></div>
                <div class="h-2.5 w-2.5 rounded-full bg-white/40"></div>
              </div>
              <iframe
                class="absolute inset-0 h-full w-full scale-[1.18] origin-center"
                :src="`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&playsinline=1&modestbranding=1&rel=0`"
                :title="video.title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <div class="absolute inset-0 bg-gradient-to-t from-[#08111d]/88 via-transparent to-[#08111d]/10"></div>
              <div class="absolute left-4 top-12 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                {{ video.tag }}
              </div>
              <div class="absolute inset-x-4 bottom-4">
                <div class="rounded-[1.2rem] border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                  <div class="font-display text-[0.95rem] font-extrabold leading-snug text-white">
                    {{ video.title }}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="activeVideo"
      class="fixed inset-0 z-[80] flex items-center justify-center bg-[#08111d]/80 p-4 backdrop-blur-sm"
      @click.self="closeVideo"
    >
      <div class="w-full max-w-md overflow-hidden rounded-[1.75rem] bg-black shadow-2xl sm:max-w-3xl">
        <div class="flex items-center justify-between bg-white px-4 py-4 sm:px-5">
          <div class="min-w-0">
            <div class="truncate font-display text-lg font-extrabold text-ink">{{ activeVideo.title }}</div>
            <div class="text-[12px] text-ink/45">{{ activeVideo.tag }}</div>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F8FA] text-ink/60 hover:text-ink"
            aria-label="Close video"
            @click="closeVideo"
          >
            <i class="ti ti-x text-[20px]"></i>
          </button>
        </div>
        <div class="aspect-[9/16] bg-black sm:aspect-[16/10]">
          <iframe
            class="h-full w-full"
            :src="`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`"
            :title="activeVideo.title"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
