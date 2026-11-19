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

function goHome() {
  closeAll()
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
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
  <header class="site-header sticky top-0 z-50" :class="{ 'is-scrolled': scrolled }" @mouseleave="mega = null">
    <div class="site-container flex items-center justify-between gap-4 py-3 lg:py-3.5">
      <RouterLink to="/" class="group flex shrink-0 items-center" @click="goHome">
        <img
          src="/images/ar-logo.webp"
          :alt="BRAND"
          class="h-10 w-auto max-w-[148px] object-contain transition duration-300 group-hover:opacity-80 sm:h-11 sm:max-w-[168px]"
        />
      </RouterLink>

      <nav class="hidden min-w-0 flex-1 items-center justify-center lg:flex">
        <div v-for="item in nav" :key="item.key" @mouseenter="mega = item.key">
          <RouterLink
            :to="item.to"
            class="nav-link"
            :class="{ 'is-open': mega === item.key }"
          >
            {{ item.label }}
            <svg class="nav-caret" :class="mega === item.key && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </RouterLink>
        </div>
        <div class="relative" @mouseenter="mega = 'company'">
          <RouterLink to="/about" class="nav-link" :class="{ 'is-open': mega === 'company' }">
            Company
            <svg class="nav-caret" :class="mega === 'company' && 'rotate-180'" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </RouterLink>
          <div v-show="mega === 'company'" class="absolute right-0 top-full z-50 hidden pt-3 lg:block" @mouseenter="mega = 'company'">
            <div class="w-64 overflow-hidden rounded-2xl border border-ink/8 bg-white/95 shadow-[0_24px_60px_-28px_rgba(10,22,40,0.45)] backdrop-blur-xl">
              <div class="border-b border-ink/6 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">Company</div>
              <div class="p-2">
                <RouterLink to="/about" class="block rounded-xl px-3 py-2.5 transition hover:bg-sand" @click="mega = null">
                  <span class="block text-[13.5px] font-semibold text-ink">About us</span>
                  <span class="block text-[11.5px] text-ink/45">Who we are</span>
                </RouterLink>
                <RouterLink to="/contact" class="block rounded-xl px-3 py-2.5 transition hover:bg-sand" @click="mega = null">
                  <span class="block text-[13.5px] font-semibold text-ink">Contact</span>
                  <span class="block text-[11.5px] text-ink/45">Talk to a counsellor</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex shrink-0 items-center gap-2">
        <button type="button" aria-label="Search" class="nav-icon" @click="openSearch">
          <i class="ti ti-search text-[17px]"></i>
          <span class="hidden text-[12.5px] font-semibold xl:inline">Search</span>
        </button>
        <RouterLink to="/login" aria-label="Student profile" class="nav-icon nav-icon-round">
          <i class="ti ti-user text-[18px]"></i>
        </RouterLink>
        <button type="button" aria-label="Menu" class="nav-icon nav-icon-round nav-menu lg:hidden" @click="mobileOpen = true">
          <i class="ti ti-menu-2 text-[20px]"></i>
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

<style scoped>
.site-header {
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.site-header.is-scrolled {
  background: rgba(255, 255, 255, 0.94);
  border-bottom-color: rgba(10, 22, 40, 0.06);
  box-shadow: 0 14px 36px -28px rgba(10, 22, 40, 0.55);
}

.site-header::after {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(225, 29, 46, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-header.is-scrolled::after {
  opacity: 1;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;
  margin: 0 1px;
  padding: 8px 9px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgba(10, 22, 40, 0.62);
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 9px;
  right: 20px;
  bottom: 5px;
  height: 1.5px;
  border-radius: 99px;
  background: #e11d2e;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s ease;
}

.nav-link:hover,
.nav-link.is-open,
.nav-link.router-link-active {
  color: #0a1628;
}

.nav-link:hover::after,
.nav-link.is-open::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.nav-caret {
  height: 12px;
  width: 12px;
  opacity: 0.45;
  transition: transform 0.2s ease;
}

.nav-icon {
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 999px;
  border: 1px solid rgba(10, 22, 40, 0.08);
  background: rgba(255, 255, 255, 0.8);
  padding: 0 0.85rem;
  color: rgba(10, 22, 40, 0.7);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.nav-icon:hover {
  border-color: rgba(10, 22, 40, 0.16);
  background: #f4f1ec;
  color: #0a1628;
  transform: translateY(-1px);
}

.nav-icon-round {
  width: 2.5rem;
  padding: 0;
}

@media (min-width: 1024px) {
  .nav-icon.nav-menu {
    display: none;
  }
}
</style>
