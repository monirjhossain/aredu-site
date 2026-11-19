<script setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { HOME_SECTIONS_DEFAULTS } from '../data/homeSectionsDefaults.js'
import { useSiteSettings } from '../composables/useSiteSettings.js'
import { useHomeBootstrap } from '../composables/useHomeBootstrap.js'
import { useSiteCatalogs } from '../composables/useSiteCatalogs.js'
import FaqItem from '../components/ui/FaqItem.vue'
import StatCounter from '../components/ui/StatCounter.vue'
import DeferredMount from '../components/ui/DeferredMount.vue'
import HeroUniSlider from '../components/home/HeroUniSlider.vue'

const PopularCoursesSection = defineAsyncComponent(() => import('../components/home/PopularCoursesSection.vue'))
const PopularUniversitiesSection = defineAsyncComponent(() => import('../components/home/PopularUniversitiesSection.vue'))
const AskExpertsSection = defineAsyncComponent(() => import('../components/home/AskExpertsSection.vue'))
const GallerySection = defineAsyncComponent(() => import('../components/home/GallerySection.vue'))
const VideoShowcaseSection = defineAsyncComponent(() => import('../components/home/VideoShowcaseSection.vue'))
const ToolsBannerSection = defineAsyncComponent(() => import('../components/home/ToolsBannerSection.vue'))

const { brand, whatsapp, faqs } = useSiteSettings()
const {
  scholarships: homeScholarships,
  services: homeServices,
  sections: homeSections,
} = useHomeBootstrap()
const {
  tools: TOOLS,
  degrees: DEGREES,
  fieldGroups: FIELD_GROUPS,
  services: catalogServices,
} = useSiteCatalogs()
const router = useRouter()
const searchQuery = ref('')

const sections = computed(() => homeSections.value || {})
const hero = computed(() => sections.value.hero || {})
const stats = computed(() => sections.value.stats || {})
const why = computed(() => sections.value.why || {})
const how = computed(() => sections.value.how || {})
const midCta = computed(() => sections.value.mid_cta || {})
const finalCta = computed(() => sections.value.final_cta || {})
const faqIntro = computed(() => sections.value.faq || {})

const visibility = computed(() => ({
  ...HOME_SECTIONS_DEFAULTS.visibility,
  ...(sections.value.visibility || {}),
}))

function isVisible(key) {
  return visibility.value?.[key] !== false
}

const heroSlides = computed(() => (Array.isArray(hero.value.slides) ? hero.value.slides : []))
const heroHeadlineLines = computed(() => String(hero.value.headline || '').split(/\n+/).filter(Boolean))
const whyChoose = computed(() => why.value.items || [])
const howSteps = computed(() => how.value.items || [])
const statsItems = computed(() => stats.value.items || [])

const heroBgIndex = ref(0)
let heroBgTimer = null

const scholarships = ref([])
const services = ref([])

function applyHomeLists() {
  scholarships.value = homeScholarships.value?.length ? homeScholarships.value : []
  if (homeServices.value?.length) {
    services.value = homeServices.value
  } else if (catalogServices.value?.length) {
    services.value = catalogServices.value
  } else {
    services.value = []
  }
}

function restartHeroTimer() {
  if (heroBgTimer) clearInterval(heroBgTimer)
  if (!heroSlides.value.length) return
  heroBgTimer = setInterval(() => {
    const total = heroSlides.value.length || 1
    heroBgIndex.value = (heroBgIndex.value + 1) % total
  }, 5000)
}

onMounted(() => {
  restartHeroTimer()
  applyHomeLists()
})

watch(heroSlides, () => {
  heroBgIndex.value = 0
  restartHeroTimer()
})

watch([homeScholarships, homeServices, catalogServices], applyHomeLists)

onUnmounted(() => {
  if (heroBgTimer) clearInterval(heroBgTimer)
  heroBgTimer = null
})

function onSearch() {
  router.push({ path: '/universities', query: { q: searchQuery.value } })
}
</script>

<template>
  <div>
  <!-- HERO -->
  <section v-if="isVisible('hero')" class="relative min-h-[min(78vh,680px)] overflow-hidden text-white sm:min-h-[min(86vh,780px)] lg:min-h-[min(92vh,880px)]">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        v-for="(src, i) in heroSlides"
        :key="`${src}-${i}`"
        class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1400ms] ease-in-out"
        :class="i === heroBgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'"
        :style="Math.abs(i - heroBgIndex) <= 1 || i === 0 ? { backgroundImage: `url('${src}')` } : undefined"
      />
    </div>
    <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(8,16,32,0.86)_0%,rgba(10,22,40,0.72)_42%,rgba(10,22,40,0.45)_100%)]" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_20%,rgba(225,29,46,0.16),transparent_55%),radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(15,118,110,0.12),transparent_50%)]" />
    <div class="pointer-events-none absolute inset-0 texture-grid opacity-10" />
    <div class="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-crimson/15 blur-3xl" />
    <div class="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-jade/20 blur-3xl" />

    <div class="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 lg:bottom-8">
      <button
        v-for="(_, i) in heroSlides"
        :key="i"
        type="button"
        class="pointer-events-auto h-1.5 rounded-full transition-all duration-300"
        :class="i === heroBgIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'"
        :aria-label="`Background slide ${i + 1}`"
        @click="heroBgIndex = i"
      />
    </div>

    <div class="relative site-container grid min-h-[min(68vh,560px)] items-end gap-6 pb-12 pt-6 sm:min-h-[min(86vh,780px)] sm:gap-10 sm:pb-14 sm:pt-10 lg:min-h-[min(92vh,880px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-8">
      <div class="reveal">
        <div class="font-display text-[clamp(1.65rem,4.2vw,2.75rem)] font-extrabold leading-tight tracking-tight">
          {{ brand }}
        </div>
        <h1 class="mt-3 max-w-lg font-display text-[clamp(1.25rem,2.5vw,1.85rem)] font-bold leading-snug text-white/95 sm:mt-4">
          <template v-for="(line, i) in heroHeadlineLines" :key="i">
            <br v-if="i" />{{ line }}
          </template>
        </h1>
        <p class="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-white/60 sm:mt-3 sm:text-[14px]">
          {{ hero.subheadline }}
        </p>

        <div class="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
          <RouterLink :to="hero.primary_cta_url || '/tools/find-university'" class="btn-primary w-full shadow-lg shadow-crimson/30 sm:w-auto">
            {{ hero.primary_cta_label }}
          </RouterLink>
          <RouterLink :to="hero.secondary_cta_url || '/scholarships'" class="btn-ghost w-full border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto">
            {{ hero.secondary_cta_label }}
          </RouterLink>
        </div>

        <form
          class="mt-5 hidden max-w-md flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md sm:mt-6 sm:flex sm:flex-row sm:items-center sm:p-1.5 sm:pl-4"
          @submit.prevent="onSearch"
        >
          <div class="flex items-center gap-2 px-2 sm:flex-1 sm:px-0">
            <i class="ti ti-search text-white/50"></i>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="hero.search_placeholder"
              class="w-full bg-transparent py-2 text-[14px] text-white placeholder:text-white/40 outline-none"
            />
          </div>
          <button type="submit" class="w-full rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink sm:w-auto">
            Search
          </button>
        </form>
      </div>

      <div class="relative hidden reveal sm:block" style="animation-delay: 0.15s">
        <HeroUniSlider v-if="isVisible('popular_universities')" />
      </div>
    </div>
  </section>

  <!-- Impact strip -->
  <section v-if="isVisible('stats')" class="relative z-30 -mt-10 -mb-10 sm:-mt-20 sm:-mb-20">
    <div class="site-container">
      <div class="overflow-hidden rounded-2xl bg-[#E8F3F1] px-5 py-7 shadow-soft ring-1 ring-jade/15 sm:px-8 sm:py-8 lg:rounded-3xl lg:px-10">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
          <div class="shrink-0 lg:max-w-[220px] lg:border-r lg:border-jade/20 lg:pr-10">
            <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">{{ stats.eyebrow }}</div>
            <p class="mt-2 text-[14px] font-semibold leading-snug text-ink">
              {{ stats.intro }}
            </p>
          </div>

          <div class="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:pl-2">
            <div
              v-for="(item, i) in statsItems"
              :key="`${item.label}-${i}`"
              class="lg:px-6"
              :class="[
                i < statsItems.length - 1 ? 'lg:border-r lg:border-jade/15' : '',
                i === statsItems.length - 1 ? 'col-span-2 sm:col-span-1' : '',
              ]"
            >
              <StatCounter :target="Number(item.value) || 0" :label="item.label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <DeferredMount v-if="isVisible('popular_courses')" min-height="420px">
    <PopularCoursesSection />
  </DeferredMount>

  <DeferredMount v-if="isVisible('popular_universities')" min-height="520px">
    <PopularUniversitiesSection />
  </DeferredMount>

  <!-- Tools — journey list -->
  <section v-if="isVisible('tools') && TOOLS.length" class="py-16 lg:py-24">
    <div class="site-container">
      <div class="overflow-hidden rounded-[2rem] bg-[#F4F6F8] lg:rounded-[2.5rem]">
      <div class="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div class="relative flex flex-col justify-between overflow-hidden bg-ink px-7 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[520px]">
          <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-crimson/25 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-jade/30 blur-3xl" />

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              <span class="h-1.5 w-1.5 rounded-full bg-crimson" />
              Free tools · no signup
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
              Plan your China journey in minutes.
            </h2>
            <p class="mt-4 max-w-sm text-[14.5px] leading-relaxed text-white/55">
              Four free tools for Bangladeshi students — convert results, check scholarships, estimate cost in Taka, and find your fit.
            </p>
          </div>

          <div class="relative mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
            <div class="flex -space-x-2">
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-crimson text-[11px] font-bold">01</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-jade text-[11px] font-bold">02</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold">03</span>
              <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold">04</span>
            </div>
            <p class="text-[12.5px] text-white/50">Start with any tool — finish in under 5 minutes.</p>
          </div>
        </div>

        <div class="flex flex-col justify-center divide-y divide-ink/8 p-2 sm:p-3 lg:p-4">
          <RouterLink
            v-for="(tool, i) in TOOLS"
            :key="tool.to"
            :to="tool.to"
            class="group flex items-start gap-4 rounded-2xl px-4 py-5 transition hover:bg-white sm:gap-5 sm:px-6 sm:py-6"
          >
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-[20px] transition group-hover:scale-105"
              :style="{ background: tool.bg, color: tool.color }"
            >
              <i class="ti" :class="tool.icon"></i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
                    Step {{ String(i + 1).padStart(2, '0') }}
                  </div>
                  <h3 class="mt-1 font-display text-lg font-bold text-ink group-hover:text-crimson sm:text-xl">
                    {{ tool.title }}
                  </h3>
                  <p class="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-ink/50">
                    {{ tool.desc }}
                  </p>
                </div>
                <span
                  class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/40 transition group-hover:border-crimson group-hover:bg-crimson group-hover:text-white"
                >
                  <i class="ti ti-arrow-up-right text-[18px]"></i>
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      </div>
    </div>
  </section>

  <ToolsBannerSection v-if="isVisible('tools_banner')" />

  <DeferredMount v-if="isVisible('ask_experts')" min-height="640px">
    <AskExpertsSection />
  </DeferredMount>

  <!-- Services -->
  <section v-if="isVisible('services') && services.length" class="relative overflow-hidden py-14 sm:py-16 lg:py-20">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#F4F6F8] to-transparent" />

    <div class="relative site-container">
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1.5">
          <i class="ti ti-route text-[14px] text-crimson"></i>
          <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-crimson">What we do</span>
        </div>
        <h2 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.4rem]">
          From first question to landing in China.
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-[14.5px] leading-relaxed text-ink/50">
          Application, scholarships, visa, medical and settling-in — free counselling in Bangla at every step.
        </p>
      </div>

      <!-- Journey path -->
      <div class="relative mt-12 lg:mt-14">
        <div class="pointer-events-none absolute left-[7%] right-[7%] top-10 hidden h-px bg-gradient-to-r from-crimson/20 via-jade/40 to-crimson/20 lg:block" />

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          <RouterLink
            v-for="(svc, i) in services"
            :key="svc.slug"
            :to="`/service/${svc.slug}`"
            class="group relative flex flex-col rounded-[1.35rem] p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-crimson/20 sm:p-6"
            :style="{ background: `linear-gradient(145deg, ${svc.bg} 0%, #ffffff 58%, #ffffff 100%)` }"
          >
            <div class="mb-5 flex items-start justify-between gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl text-[22px] transition group-hover:scale-105"
                :style="{ background: svc.bg, color: svc.color }"
              >
                <i class="ti" :class="svc.icon"></i>
              </div>
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full font-display text-[12px] font-extrabold text-white"
                :style="{ background: svc.color }"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>

            <h3 class="font-display text-[15px] font-bold leading-snug text-ink group-hover:text-crimson sm:text-[16px]">
              {{ svc.name }}
            </h3>
            <p class="mt-2 flex-1 text-[13px] leading-relaxed text-ink/50">
              {{ svc.short }}
            </p>

            <div class="mt-5 flex items-center justify-between border-t border-ink/6 pt-4">
              <span class="text-[12px] font-semibold text-ink/35">Step {{ i + 1 }}</span>
              <span class="inline-flex items-center gap-1 text-[12.5px] font-semibold text-crimson">
                Learn more
                <i class="ti ti-arrow-right text-[14px] transition group-hover:translate-x-0.5"></i>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-ink px-6 py-6 text-white sm:flex-row sm:px-8">
        <div class="text-center sm:text-left">
          <div class="font-display text-lg font-bold sm:text-xl">Need the full service map?</div>
          <p class="mt-1 text-[13px] text-white/50">See every step we handle — from documents to airport pickup.</p>
        </div>
        <RouterLink
          to="/services"
          class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110 sm:w-auto sm:shrink-0"
        >
          View all services
          <i class="ti ti-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Degrees -->
  <section v-if="isVisible('degrees') && DEGREES.length" class="relative overflow-hidden border-y border-ink/8 bg-[#FBFAF7] py-16 lg:py-20">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-jade/5 to-transparent"></div>
    <div class="pointer-events-none absolute -left-12 top-12 h-40 w-40 rounded-full bg-crimson/8 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-jade/8 blur-3xl"></div>

    <div class="relative site-container">
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink/8">
          <i class="ti ti-stairs-up text-[14px] text-jade"></i>
          <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">Study pathways</span>
        </div>
        <h2 class="mt-4 font-display text-[1.85rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
          Start from your degree level.
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-ink/50">
          Pick your academic stage first, then explore the right universities, scholarships and admission route for that level.
        </p>
      </div>

      <div class="mt-12 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <RouterLink
          :to="`/study/${DEGREES[0]?.slug || 'bachelor'}`"
          class="group relative overflow-hidden rounded-[2rem] bg-[#0B172A] p-6 text-white shadow-soft sm:p-8"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%)]"></div>
          <div class="absolute inset-0 texture-grid opacity-25"></div>
          <div class="absolute -right-16 top-8 h-40 w-40 rounded-full bg-crimson/20 blur-3xl"></div>
          <div class="absolute bottom-0 left-8 h-32 w-32 rounded-full bg-jade/20 blur-3xl"></div>

          <div class="relative flex h-full flex-col">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">Most popular starting path</div>
                <h3 class="mt-3 font-display text-[1.8rem] font-extrabold leading-tight sm:text-[2.2rem]">
                  {{ DEGREES[0].name }}
                </h3>
              </div>
              <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 font-display text-2xl font-extrabold text-white ring-1 ring-white/10">
                {{ DEGREES[0].letter }}
              </span>
            </div>

            <p class="mt-5 max-w-md text-[14px] leading-relaxed text-white/62">
              Ideal for students beginning their China journey with a full undergraduate degree, long-term campus life and wider scholarship options.
            </p>

            <div class="mt-7 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
              <div class="relative h-44 sm:h-52">
                <div class="absolute inset-0 bg-[linear-gradient(135deg,#173256_0%,#24486e_45%,#0f766e_100%)]"></div>
                <div class="absolute inset-0 texture-grid opacity-30"></div>
                <div class="absolute -right-8 top-3 h-24 w-24 rounded-full bg-white/12 blur-2xl"></div>
                <div class="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75 backdrop-blur">
                  {{ DEGREES[0]?.name || 'Degree' }} path
                </div>

                <div class="absolute inset-x-5 bottom-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div class="max-w-[220px]">
                    <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">Campus preview</div>
                    <div class="mt-2 font-display text-[1.2rem] font-extrabold leading-tight text-white sm:text-[1.35rem]">
                      Your bachelor route can start with a vibrant campus life in China.
                    </div>
                  </div>

                  <div class="hidden h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/15 bg-white/10 text-white/85 backdrop-blur sm:flex">
                    <i class="ti ti-building-skyscraper text-4xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-3">
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Best for</div>
                <div class="mt-1 text-[13px] font-semibold text-white/90">Fresh HSC route</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Focus</div>
                <div class="mt-1 text-[13px] font-semibold text-white/90">Full degree path</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Support</div>
                <div class="mt-1 text-[13px] font-semibold text-white/90">Admission + visa</div>
              </div>
            </div>

            <div class="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
              Explore this pathway
              <i class="ti ti-arrow-right transition group-hover:translate-x-0.5"></i>
            </div>
          </div>
        </RouterLink>

        <div class="grid gap-4 sm:grid-cols-2">
          <RouterLink
            v-for="(deg, i) in DEGREES.slice(1)"
            :key="deg.slug"
            :to="`/study/${deg.slug}`"
            class="group relative overflow-hidden rounded-[1.6rem] p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-crimson/20 sm:p-6"
            :style="{ background: i % 2 === 0 ? 'linear-gradient(145deg, rgba(230,244,242,1) 0%, #ffffff 58%, #ffffff 100%)' : 'linear-gradient(145deg, rgba(252,232,234,1) 0%, #ffffff 58%, #ffffff 100%)' }"
          >
            <div
              class="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              :style="{ background: i % 2 === 0 ? 'linear-gradient(145deg, rgba(15,118,110,0.06), rgba(255,255,255,0))' : 'linear-gradient(145deg, rgba(225,29,46,0.06), rgba(255,255,255,0))' }"
            ></div>

            <div class="relative flex h-full flex-col">
              <div class="flex items-start justify-between gap-4">
                <span class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/30">
                  {{ String(i + 2).padStart(2, '0') }}
                </span>
                <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F8FA] font-display text-xl font-extrabold text-crimson">
                  {{ deg.letter }}
                </span>
              </div>

              <h3 class="mt-7 font-display text-[1.1rem] font-extrabold leading-snug text-ink transition group-hover:text-crimson">
                {{ deg.name }}
              </h3>
              <p class="mt-2 text-[13px] leading-relaxed text-ink/50">
                {{
                  i === 0
                    ? 'For deeper specialisation, better academic positioning and stronger scholarship planning.'
                    : i === 1
                      ? 'Built for research-focused students aiming at advanced study and long-term academic growth.'
                      : i === 2
                        ? 'A focused route for future medical study, campus training and clinical ambitions.'
                        : i === 3
                          ? 'Helpful for students building Chinese proficiency before or alongside degree study.'
                          : 'Choose this route to match your current level and next academic target.'
                }}
              </p>

              <div class="mt-5 flex items-center justify-between border-t border-ink/6 pt-4">
                <span class="text-[12px] font-semibold text-ink/35">Explore pathway</span>
                <i class="ti ti-arrow-right text-[15px] text-crimson transition group-hover:translate-x-0.5"></i>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="mt-6 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] bg-white px-6 py-5 ring-1 ring-ink/8 sm:flex-row sm:px-8">
        <div class="text-center sm:text-left">
          <div class="font-display text-lg font-extrabold text-ink">Not sure where you fit?</div>
          <p class="mt-1 text-[13px] text-ink/50">Use the smart matcher to narrow down your best starting route in minutes.</p>
        </div>
        <RouterLink
          to="/tools/find-university"
          class="inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white transition hover:brightness-110"
        >
          Find my path
          <i class="ti ti-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Fields -->
  <section v-if="isVisible('fields') && FIELD_GROUPS.length" class="section-pad">
    <div class="overflow-hidden rounded-[2rem] bg-[#F7FAF9] ring-1 ring-jade/10 lg:rounded-[2.5rem]">
      <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div class="relative overflow-hidden bg-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
          <div class="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-crimson/20 blur-3xl"></div>
          <div class="pointer-events-none absolute bottom-0 left-6 h-32 w-32 rounded-full bg-jade/20 blur-3xl"></div>
          <div class="pointer-events-none absolute inset-0 texture-grid opacity-20"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <i class="ti ti-book-2 text-[14px] text-jade"></i>
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Majors</span>
            </div>
            <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
              Popular fields of study.
            </h2>
            <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/58">
              Explore the most searched study areas among Bangladeshi students, from engineering and business to medicine and language pathways.
            </p>

            <div class="mt-8 rounded-[1.5rem] bg-white/8 p-5 ring-1 ring-white/10">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Quick direction</div>
              <div class="mt-2 font-display text-xl font-extrabold">Choose your subject first.</div>
              <p class="mt-2 text-[13px] leading-relaxed text-white/55">
                Once your field is clear, shortlist universities, compare tuition and check scholarship-friendly routes faster.
              </p>
            </div>

            <RouterLink
              to="/majors"
              class="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-sand"
            >
              Browse all majors
              <i class="ti ti-arrow-right"></i>
            </RouterLink>
          </div>
        </div>

        <div class="p-4 sm:p-5 lg:p-6">
          <div class="grid gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="(field, i) in FIELD_GROUPS.slice(0, 4)"
              :key="field"
              :to="{ path: '/majors', query: { field } }"
              class="group relative overflow-hidden rounded-[1.45rem] p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-soft hover:ring-crimson/15"
              :style="{ background: i % 3 === 0 ? 'linear-gradient(145deg, rgba(230,244,242,1) 0%, #ffffff 58%, #ffffff 100%)' : i % 3 === 1 ? 'linear-gradient(145deg, rgba(252,232,234,1) 0%, #ffffff 58%, #ffffff 100%)' : 'linear-gradient(145deg, rgba(232,238,244,1) 0%, #ffffff 58%, #ffffff 100%)' }"
            >
              <div
                class="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                :style="{ background: i % 3 === 0 ? 'linear-gradient(145deg, rgba(15,118,110,0.06), rgba(255,255,255,0))' : i % 3 === 1 ? 'linear-gradient(145deg, rgba(225,29,46,0.06), rgba(255,255,255,0))' : 'linear-gradient(145deg, rgba(10,22,40,0.04), rgba(255,255,255,0))' }"
              ></div>

              <div class="relative flex h-full flex-col">
                <div class="flex items-start justify-between gap-4">
                  <span class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/30">
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  <span
                    class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7F8FA] text-[18px]"
                    :class="i % 3 === 0 ? 'text-jade' : i % 3 === 1 ? 'text-crimson' : 'text-ink/70'"
                  >
                    <i
                      class="ti"
                      :class="
                        i % 6 === 0
                          ? 'ti-cpu'
                          : i % 6 === 1
                            ? 'ti-briefcase'
                            : i % 6 === 2
                              ? 'ti-stethoscope'
                              : i % 6 === 3
                                ? 'ti-language'
                                : i % 6 === 4
                                  ? 'ti-flask'
                                  : 'ti-school'
                      "
                    ></i>
                  </span>
                </div>

                <h3 class="mt-7 font-display text-[1.05rem] font-extrabold leading-snug text-ink transition group-hover:text-crimson">
                  {{ field }}
                </h3>
                <p class="mt-2 flex-1 text-[13px] leading-relaxed text-ink/50">
                  {{
                    i % 3 === 0
                      ? 'Strong route for practical skills, global demand and scholarship-focused applications.'
                      : i % 3 === 1
                        ? 'Popular among students planning long-term career growth and versatile study options.'
                        : 'A field with clear academic direction, subject depth and university specialisation.'
                  }}
                </p>

                <div class="mt-5 flex items-center justify-between border-t border-ink/6 pt-4">
                  <span class="text-[12px] font-semibold text-ink/35">Explore subject</span>
                  <i class="ti ti-arrow-right text-[15px] text-crimson transition group-hover:translate-x-0.5"></i>
                </div>
              </div>
            </RouterLink>
          </div>

          <div class="mt-5 flex justify-center sm:justify-start">
            <RouterLink
              to="/majors"
              class="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[#132038]"
            >
              See more
              <i class="ti ti-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Scholarships -->
  <section v-if="isVisible('scholarships') && scholarships.length" class="relative overflow-hidden py-16 lg:py-24">
    <div class="absolute inset-0 bg-[linear-gradient(135deg,#071320_0%,#0b2340_30%,#0f766e_70%,#12324d_100%)]"></div>
    <div class="pointer-events-none absolute inset-0 texture-grid opacity-20"></div>
    <div class="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20" style="background: radial-gradient(circle at 70% 35%, #fff, transparent 55%)" />
    <div class="pointer-events-none absolute -left-12 bottom-8 h-44 w-44 rounded-full bg-crimson/20 blur-3xl"></div>
    <div class="pointer-events-none absolute right-10 top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

    <div class="relative site-container">
      <div class="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div class="rounded-[2rem] bg-white/8 p-6 text-white ring-1 ring-white/10 backdrop-blur sm:p-8">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
            <i class="ti ti-rosette-discount-check text-[14px] text-white"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">Funding</span>
          </div>
          <h2 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
            Fund your studies with a scholarship.
          </h2>
          <p class="mt-4 max-w-lg text-[14.5px] leading-relaxed text-white/65">
            CSC, provincial, university and Confucius awards can cover tuition, dorm and sometimes even a monthly stipend for strong profiles.
          </p>

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/10">
              <div class="font-display text-xl font-extrabold text-white">Full</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Coverage options</div>
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/10">
              <div class="font-display text-xl font-extrabold text-white">9+</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Funding routes</div>
            </div>
            <div class="rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/10">
              <div class="font-display text-xl font-extrabold text-white">BD</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Student focused</div>
            </div>
          </div>

          <div class="mt-8 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#08111d]/55">
            <div class="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
              <div class="p-5 sm:p-6">
                <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Fastest way to start</div>
                <div class="mt-2 font-display text-[1.35rem] font-extrabold text-white">Use the scholarship checker first.</div>
                <p class="mt-2 text-[13px] leading-relaxed text-white/58">
                  Check your funding direction before shortlisting universities, so your choices stay realistic and strategic.
                </p>
                <RouterLink
                  to="/tools/scholarship-checker"
                  class="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-jade transition hover:bg-sand"
                >
                  Check my eligibility
                  <i class="ti ti-arrow-right"></i>
                </RouterLink>
              </div>
              <div class="flex flex-col justify-between border-t border-white/10 bg-white/5 p-5 sm:border-l sm:border-t-0 sm:p-6">
                <div>
                  <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Then explore</div>
                  <div class="mt-2 font-display text-lg font-extrabold text-white">Browse live scholarship options</div>
                </div>
                <RouterLink
                  to="/scholarships"
                  class="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white/90"
                >
                  View all scholarships
                  <i class="ti ti-arrow-right"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <RouterLink
            v-for="(s, i) in scholarships.slice(0, 6)"
            :key="s.slug"
            :to="`/scholarship/${s.slug}`"
            class="group rounded-[1.5rem] bg-white/10 px-5 py-5 text-white ring-1 ring-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/14"
            :class="i === 0 ? 'sm:col-span-2 xl:col-span-2 xl:min-h-[260px]' : ''"
          >
            <div class="flex items-start justify-between gap-3">
              <span class="rounded-full bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">
                {{ s.coverage || 'Award' }}
              </span>
              <span class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>
            <div class="mt-5 font-display text-[1.05rem] font-bold leading-snug text-white sm:text-[1.1rem]" :class="i === 0 ? 'max-w-md text-[1.4rem] sm:text-[1.6rem]' : ''">
              {{ s.name }}
            </div>
            <p class="mt-2 text-[12.5px] leading-relaxed text-white/60">
              {{ s.desc || 'Funding opportunity for international applicants.' }}
            </p>
            <div v-if="i === 0" class="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Coverage</div>
                <div class="mt-1 text-[13px] font-semibold text-white">{{ s.coverage || 'Award' }}</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Universities</div>
                <div class="mt-1 text-[13px] font-semibold text-white">{{ s.universities || '—' }}</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Best for</div>
                <div class="mt-1 text-[13px] font-semibold text-white">Strong profiles</div>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span class="text-[12px] text-white/45">
                {{ s.universities || '—' }} universities
              </span>
              <span class="inline-flex items-center gap-1 text-[12.5px] font-semibold text-white">
                View
                <i class="ti ti-arrow-right transition group-hover:translate-x-0.5"></i>
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Match CTA -->
  <section v-if="isVisible('mid_cta')" class="site-container pb-8">
    <div class="overflow-hidden rounded-[2rem] bg-sand px-6 py-12 text-center sm:px-12">
      <h2 class="headline text-3xl sm:text-4xl">{{ midCta.title }}</h2>
      <p class="mx-auto mt-3 max-w-md text-[15px] text-ink/55">{{ midCta.subtitle }}</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <RouterLink :to="midCta.primary_cta_url || '/tools/find-university'" class="btn-primary w-full sm:w-auto">{{ midCta.primary_cta_label }}</RouterLink>
        <a :href="whatsapp" target="_blank" rel="noopener" class="btn-ghost w-full sm:w-auto">{{ midCta.secondary_cta_label }}</a>
      </div>
    </div>
  </section>

  <!-- Why -->
  <section v-if="isVisible('why')" class="section-pad">
    <div class="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/8 lg:rounded-[2.5rem]">
      <div class="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="relative overflow-hidden bg-[#F7FAF9] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div class="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-jade/10 blur-3xl"></div>
          <div class="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-crimson/8 blur-3xl"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink/8">
              <i class="ti ti-world text-[14px] text-crimson"></i>
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-crimson">{{ why.eyebrow }}</span>
            </div>
            <h2 class="mt-4 max-w-md font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {{ why.title }}
            </h2>
            <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/50">
              {{ why.subtitle }}
            </p>

            <div class="mt-8 rounded-[1.6rem] bg-ink p-5 text-white sm:p-6">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{{ why.summary_label }}</div>
              <div class="mt-2 font-display text-xl font-extrabold">{{ why.summary_title }}</div>
              <p class="mt-2 text-[13px] leading-relaxed text-white/55">
                {{ why.summary_text }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid gap-0 sm:grid-cols-2">
          <div
            v-for="item in whyChoose"
            :key="item.num"
            class="group border-t border-ink/8 p-6 transition sm:border-l sm:[&:nth-child(-n+2)]:border-t-0 lg:p-8"
            :style="{ background: item.num === '01' ? 'linear-gradient(145deg, rgba(252,232,234,0.75) 0%, #ffffff 58%, #ffffff 100%)' : item.num === '02' ? 'linear-gradient(145deg, rgba(230,244,242,0.8) 0%, #ffffff 58%, #ffffff 100%)' : item.num === '03' ? 'linear-gradient(145deg, rgba(232,238,244,0.85) 0%, #ffffff 58%, #ffffff 100%)' : 'linear-gradient(145deg, rgba(244,241,236,0.95) 0%, #ffffff 58%, #ffffff 100%)' }"
          >
            <div class="flex items-start justify-between gap-4">
              <span class="font-display text-sm font-bold text-crimson">{{ item.num }}</span>
              <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F8FA] text-[16px] text-ink/55 transition group-hover:bg-crimson group-hover:text-white">
                <i class="ti" :class="item.icon || 'ti-star'"></i>
              </span>
            </div>
            <h3 class="mt-8 font-display text-[1.08rem] font-bold text-ink group-hover:text-crimson">{{ item.title }}</h3>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/50">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How -->
  <section v-if="isVisible('how')" class="border-y border-ink/8 bg-white py-16 lg:py-24">
    <div class="site-container">
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5">
          <i class="ti ti-route-2 text-[14px] text-jade"></i>
          <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">{{ how.eyebrow }}</span>
        </div>
        <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {{ how.title }}
        </h2>
        <p class="mt-4 text-[14.5px] leading-relaxed text-ink/50">
          {{ how.subtitle }}
        </p>
      </div>

      <div class="relative mt-12">
        <div class="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-crimson/20 via-jade/35 to-crimson/20 lg:block"></div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="(step, i) in howSteps"
            :key="step.step"
            class="group relative overflow-hidden rounded-[1.6rem] bg-[#FBFAF7] p-6 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-soft hover:ring-crimson/15 sm:p-7"
          >
            <div
              class="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
              :style="{ background: i % 2 === 0 ? 'linear-gradient(145deg, rgba(225,29,46,0.05), rgba(255,255,255,0))' : 'linear-gradient(145deg, rgba(15,118,110,0.06), rgba(255,255,255,0))' }"
            ></div>

            <div class="relative flex h-full flex-col">
              <div class="flex items-start justify-between gap-4">
                <span class="flex h-11 w-11 items-center justify-center rounded-full bg-crimson font-display text-[13px] font-extrabold text-white">
                  {{ step.step }}
                </span>
                <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[16px] text-ink/60 ring-1 ring-ink/6 transition group-hover:bg-ink group-hover:text-white">
                  <i class="ti" :class="step.icon || 'ti-circle-check'"></i>
                </span>
              </div>

              <h3 class="mt-7 font-display text-[1.15rem] font-bold text-ink group-hover:text-crimson sm:text-[1.22rem]">
                {{ step.title }}
              </h3>
              <p class="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink/50">{{ step.desc }}</p>

              <div class="mt-5 flex items-center justify-between border-t border-ink/6 pt-4">
                <span class="text-[12px] font-semibold text-ink/35">Step {{ i + 1 }}</span>
                <i class="ti ti-arrow-right text-[15px] text-crimson transition group-hover:translate-x-0.5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <DeferredMount v-if="isVisible('gallery')" min-height="360px">
    <GallerySection />
  </DeferredMount>

  <DeferredMount v-if="isVisible('videos')" min-height="480px">
    <VideoShowcaseSection />
  </DeferredMount>

  <!-- FAQ -->
  <section v-if="isVisible('faq')" class="section-pad">
    <div class="overflow-hidden rounded-[2rem] bg-[#FBFAF7] ring-1 ring-ink/8 lg:rounded-[2.5rem]">
      <div class="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <div class="relative overflow-hidden bg-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
          <div class="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-crimson/20 blur-3xl"></div>
          <div class="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-jade/20 blur-3xl"></div>
          <div class="pointer-events-none absolute inset-0 texture-grid opacity-20"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <i class="ti ti-help-circle text-[14px] text-jade"></i>
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{{ faqIntro.eyebrow }}</span>
            </div>
            <h2 class="mt-4 max-w-md font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
              {{ faqIntro.title }}
            </h2>
            <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/58">
              {{ faqIntro.subtitle }}
            </p>

            <div class="mt-8 rounded-[1.6rem] bg-white/8 p-5 ring-1 ring-white/10">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{{ faqIntro.help_label }}</div>
              <p class="mt-2 text-[13px] leading-relaxed text-white/55">
                {{ faqIntro.help_text }}
              </p>
              <a
                :href="whatsapp"
                target="_blank"
                rel="noopener"
                class="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-sand"
              >
                {{ faqIntro.help_cta_label }}
                <i class="ti ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="bg-[linear-gradient(145deg,rgba(232,238,244,0.55)_0%,rgba(255,255,255,1)_42%,rgba(230,244,242,0.55)_100%)] p-4 sm:p-5 lg:p-6">
          <div class="grid gap-3">
            <FaqItem v-for="faq in faqs" :key="faq.q" :q="faq.q" :a="faq.a" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section v-if="isVisible('final_cta')" class="pb-20">
    <div class="site-container">
      <div class="overflow-hidden rounded-[2rem] mesh-hero px-6 py-14 text-center text-white sm:px-12">
        <div class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{{ finalCta.title }}</div>
        <p class="mx-auto mt-3 max-w-lg text-[15px] text-white/60">{{ finalCta.subtitle }}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a :href="whatsapp" target="_blank" rel="noopener" class="btn-primary w-full sm:w-auto">{{ finalCta.primary_cta_label }}</a>
          <RouterLink :to="finalCta.secondary_cta_url || '/tools/find-university'" class="btn-ghost w-full border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto">{{ finalCta.secondary_cta_label }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
