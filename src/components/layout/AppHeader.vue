<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import MegaUniversities from './mega/MegaUniversities.vue'
import MegaScholarships from './mega/MegaScholarships.vue'
import MegaMajors from './mega/MegaMajors.vue'
import MegaCities from './mega/MegaCities.vue'
import MegaServices from './mega/MegaServices.vue'
import MegaTools from './mega/MegaTools.vue'
import MobileDrawer from './MobileDrawer.vue'

const { brand: BRAND } = useSiteSettings()

const mega = ref(null)
const searchOpen = ref(false)
const mobileOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const scrolled = ref(false)

const nav = [
  { key: 'universities', label: 'Universities', to: '/universities' },
  { key: 'scholarships', label: 'Scholarships', to: '/scholarships' },
  { key: 'majors', label: 'Majors', to: '/majors' },
  { key: 'cities', label: 'Cities', to: '/cities' },
  { key: 'services', label: 'Services', to: '/services' },
  { key: 'tools', label: 'Tools', to: '/tools/find-university' },
]

function closeAll() {
  mega.value = null
  searchOpen.value = false
  mobileOpen.value = false
}

function onKey(e) {
  if (e.key === 'Escape') closeAll()
}

function onScroll() {
  scrolled.value = window.scrollY > 12
}

let desktopMq = null
function onDesktopChange(e) {
  if (e.matches) mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  desktopMq = window.matchMedia('(min-width: 1024px)')
  desktopMq.addEventListener('change', onDesktopChange)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', onScroll)
  desktopMq?.removeEventListener('change', onDesktopChange)
})

function openSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) setTimeout(() => searchInput.value?.focus(), 40)
}

const megaComponent = computed(() => {
  const map = {
    universities: MegaUniversities,
    scholarships: MegaScholarships,
    majors: MegaMajors,
    cities: MegaCities,
    services: MegaServices,
    tools: MegaTools,
  }
  return map[mega.value] || null
})

watch(mobileOpen, (open) => {
  if (open) mega.value = null
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'border-b border-ink/8 bg-white/95 shadow-soft backdrop-blur-xl' : 'border-b border-transparent bg-white/80 backdrop-blur-md'"
    @mouseleave="mega = null"
  >
    <div class="site-container flex items-center justify-between gap-3 py-3 lg:py-3.5">
      <RouterLink to="/" class="group flex shrink-0 items-center" @click="closeAll">
        <img
          src="/images/ar-logo.webp"
          :alt="BRAND"
          class="h-9 w-auto max-w-[140px] object-contain sm:h-10 sm:max-w-[160px]"
        />
      </RouterLink>

      <nav class="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
        <div v-for="item in nav" :key="item.key" @mouseenter="mega = item.key">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-0.5 rounded-lg px-2 py-2 text-[12px] font-medium text-ink/75 transition hover:bg-ink/5 hover:text-ink xl:gap-1 xl:px-2.5 xl:text-[13px]"
            :class="mega === item.key && 'bg-ink/5 text-ink'"
          >
            {{ item.label }}
            <svg class="h-3 w-3 opacity-50 transition" :class="mega === item.key && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </RouterLink>
        </div>
        <div class="relative" @mouseenter="mega = 'company'">
          <RouterLink
            to="/about"
            class="flex items-center gap-0.5 rounded-lg px-2 py-2 text-[12px] font-medium text-ink/75 hover:bg-ink/5 hover:text-ink xl:gap-1 xl:px-2.5 xl:text-[13px]"
            :class="mega === 'company' && 'bg-ink/5 text-ink'"
          >
            Company
            <svg class="h-3 w-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </RouterLink>
          <div v-show="mega === 'company'" class="absolute right-0 top-full z-50 hidden pt-2 lg:block" @mouseenter="mega = 'company'">
            <div class="w-64 overflow-hidden rounded-xl border border-ink/8 bg-white shadow-[0_20px_50px_-24px_rgba(10,22,40,0.4)]">
              <div class="border-b border-ink/6 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">Company</div>
              <div class="p-2">
                <RouterLink to="/about" class="block rounded-lg px-3 py-2.5 transition hover:bg-[#F4F6F8]" @click="mega = null">
                  <span class="block text-[13px] font-semibold text-ink">About us</span>
                  <span class="block text-[11.5px] text-ink/45">Who we are</span>
                </RouterLink>
                <RouterLink to="/contact" class="block rounded-lg px-3 py-2.5 transition hover:bg-[#F4F6F8]" @click="mega = null">
                  <span class="block text-[13px] font-semibold text-ink">Contact</span>
                  <span class="block text-[11.5px] text-ink/45">Talk to a counsellor</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          class="flex h-10 items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-3 text-[12px] font-semibold text-ink/70 transition hover:border-ink/20 hover:bg-sand hover:text-ink"
          @click="openSearch"
        >
          <i class="ti ti-search text-[16px]"></i>
          <span class="hidden xl:inline">Search</span>
        </button>
        <RouterLink
          to="/login"
          aria-label="Student profile"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink/70 transition hover:border-ink/20 hover:bg-sand hover:text-ink"
        >
          <i class="ti ti-user text-[18px]"></i>
        </RouterLink>
        <button type="button" aria-label="Menu" class="flex h-10 w-10 items-center justify-center rounded-xl text-ink lg:hidden" @click="mobileOpen = true">
          <i class="ti ti-menu-2 text-[22px]"></i>
        </button>
      </div>
    </div>

    <div
      v-if="mega && mega !== 'company' && megaComponent"
      class="absolute inset-x-0 top-full hidden border-t border-ink/8 bg-[#F4F6F8]/95 py-5 shadow-[0_24px_60px_-28px_rgba(10,22,40,0.35)] backdrop-blur-xl lg:block"
      @mouseenter="mega = mega"
    >
      <component :is="megaComponent" @close="mega = null" />
    </div>

    <div v-show="searchOpen" class="border-t border-ink/8 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <form class="mx-auto flex max-w-2xl items-center gap-3 rounded-[1.4rem] border border-ink/10 bg-[#FBFAF7] px-4 py-2.5 shadow-soft" @submit.prevent>
        <i class="ti ti-search text-ink/40"></i>
        <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search universities, majors, cities…" class="w-full bg-transparent text-[14px] outline-none" />
        <RouterLink
          :to="{ path: '/universities', query: { q: searchQuery } }"
          class="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#132038]"
          @click="searchOpen = false"
        >
          Search
          <i class="ti ti-arrow-right text-[14px]"></i>
        </RouterLink>
      </form>
    </div>

    <MobileDrawer :open="mobileOpen" @close="mobileOpen = false" />
  </header>
</template>
