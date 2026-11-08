<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadSiteSettings, provideSiteSettings, useSiteSettings } from './composables/useSiteSettings.js'
import { loadHomeBootstrap, provideHomeBootstrap } from './composables/useHomeBootstrap.js'
import { prefetchCatalogs } from './api/prefetch.js'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

provideSiteSettings()
provideHomeBootstrap()
const { whatsapp } = useSiteSettings()

const route = useRoute()
const showScrollTop = ref(false)

function onScroll() {
  showScrollTop.value = window.scrollY > 240
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.fullPath,
  () => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  },
)

onMounted(() => {
  // One cached home call feeds the homepage; settings come with it.
  // If home fails, fall back to settings-only.
  loadHomeBootstrap()
    .then(() => prefetchCatalogs())
    .catch(() => {
      loadSiteSettings()
      prefetchCatalogs()
    })
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <AppHeader />
    <main id="main-content" class="flex-1 bg-white" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />

    <div class="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <a
        :href="whatsapp"
        target="_blank"
        rel="noopener"
        class="group flex items-center gap-3 rounded-full bg-transparent text-white"
        aria-label="Chat on WhatsApp"
      >
        <span class="hidden items-center gap-2 rounded-full border border-ink/8 bg-white px-4 py-2 text-[12px] font-semibold text-ink shadow-[0_12px_30px_rgba(10,22,40,0.12)] sm:inline-flex">
          <span class="inline-flex h-2.5 w-2.5 rounded-full bg-[#16A34A]"></span>
          Talk to a free consultant
        </span>
        <span class="flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A] shadow-[0_14px_32px_rgba(22,163,74,0.28)] transition group-hover:scale-105 group-hover:brightness-110">
          <i class="ti ti-brand-whatsapp text-[28px]"></i>
        </span>
      </a>

      <button
        v-show="showScrollTop"
        type="button"
        class="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-[0_12px_30px_rgba(10,22,40,0.25)] transition hover:bg-[#132038]"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <i class="ti ti-arrow-up text-[20px]"></i>
      </button>
    </div>
  </div>
</template>
