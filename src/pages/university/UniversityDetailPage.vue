<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { WHATSAPP } from '../../data/site.js'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()
const sliderIndex = ref(0)
const sliderPaused = ref(false)
let sliderTimer = null

const uni = computed(() => universities.find((u) => u.slug === route.params.slug))

const sliderUniversities = computed(() => {
  if (!uni.value) return universities.slice(0, 8)
  const rest = universities.filter((u) => u.slug !== uni.value.slug)
  return [uni.value, ...rest].slice(0, 10)
})

const activeSlide = computed(() => sliderUniversities.value[sliderIndex.value] || uni.value)

const similar = computed(() => {
  if (!uni.value) return []
  return universities
    .filter((u) => u.slug !== uni.value.slug && u.city === uni.value.city)
    .slice(0, 3)
})

const highlights = computed(() => {
  if (!uni.value) return []
  return [
    {
      label: 'Global rank',
      value: `#${uni.value.ranking}`,
      note: 'Dummy ranking for UI preview',
    },
    {
      label: 'Scholarship',
      value: uni.value.scholarship ? 'Available' : 'Ask us',
      note: 'Depends on programme and profile',
    },
    {
      label: 'Location',
      value: `${uni.value.city}, China`,
      note: uni.value.province,
    },
  ]
})

const overviewPoints = computed(() => {
  if (!uni.value) return []
  return [
    `${uni.value.name} welcomes international students from Bangladesh across undergraduate and postgraduate pathways.`,
    `Students usually shortlist this university for its location in ${uni.value.city}, practical campus environment and affordable study route.`,
    uni.value.scholarship
      ? 'Scholarship options may be available for strong academic profiles and complete applications.'
      : 'Scholarship availability can vary, so we help you check the best route before you apply.',
    'We guide admission, documents, visa planning and the full student journey in Bangla.',
  ]
})

const quickFacts = computed(() => {
  if (!uni.value) return []
  return [
    { title: 'Degree paths', value: 'Bachelor · Master · Language' },
    { title: 'Application help', value: 'Full support from AR Education' },
    { title: 'Popular with BD students', value: 'Yes, especially budget-conscious applicants' },
    { title: 'Best next step', value: 'Check scholarship + total cost in Taka' },
  ]
})

function goToSlide(index) {
  sliderIndex.value = (index + sliderUniversities.value.length) % sliderUniversities.value.length
}

function startSlider() {
  stopSlider()
  if (sliderUniversities.value.length <= 1) return
  sliderTimer = setInterval(() => {
    if (!sliderPaused.value) {
      goToSlide(sliderIndex.value + 1)
    }
  }, 3400)
}

function stopSlider() {
  if (sliderTimer) clearInterval(sliderTimer)
  sliderTimer = null
}

watch(
  () => route.params.slug,
  () => {
    sliderIndex.value = 0
    startSlider()
  },
)

onMounted(() => {
  startSlider()
})

onUnmounted(() => {
  stopSlider()
})
</script>

<template>
  <div v-if="uni">
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-30"></div>
      <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/45">
          <RouterLink to="/" class="hover:text-white">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/universities" class="hover:text-white">Universities</RouterLink>
          <span>/</span>
          <span class="text-white/80">{{ uni.name }}</span>
        </nav>

        <div class="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                University profile
              </span>
              <span
                v-if="uni.scholarship"
                class="rounded-full bg-jade/20 px-3 py-1 text-[11px] font-semibold text-white ring-1 ring-white/10"
              >
                Scholarship available
              </span>
            </div>
            <h1 class="mt-5 max-w-3xl font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {{ uni.name }}
            </h1>
            <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              A China study option for Bangladeshi students looking at {{ uni.city }}, {{ uni.province }} with guidance on admission, scholarship and visa planning.
            </p>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RouterLink to="/contact" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-sand sm:w-auto">
                Apply with guidance
              </RouterLink>
              <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110 sm:w-auto">
                <i class="ti ti-brand-whatsapp"></i>
                WhatsApp us
              </a>
            </div>
          </div>

          <div
            class="rounded-[1.75rem] bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur sm:p-5"
            @mouseenter="sliderPaused = true"
            @mouseleave="sliderPaused = false"
          >
            <div class="mb-3 flex items-center justify-between gap-3 px-1">
              <div class="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">University showcase</div>
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Previous university"
                  @click="goToSlide(sliderIndex - 1)"
                >
                  <i class="ti ti-chevron-left text-[16px]"></i>
                </button>
                <button
                  type="button"
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  aria-label="Next university"
                  @click="goToSlide(sliderIndex + 1)"
                >
                  <i class="ti ti-chevron-right text-[16px]"></i>
                </button>
              </div>
            </div>

            <Transition name="uni-slide" mode="out-in">
              <RouterLink
                :key="activeSlide.slug"
                :to="`/university/${activeSlide.slug}`"
                class="relative block overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-[#143153] to-[#2c5f7f] p-5 sm:p-6"
              >
                <div class="absolute inset-0 opacity-20" style="background: radial-gradient(circle at 20% 20%, #fff 0%, transparent 32%)"></div>
                <div class="absolute inset-0 texture-grid opacity-20"></div>
                <div class="relative flex items-start justify-between gap-4">
                  <span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 font-display text-lg font-extrabold text-ink">
                    {{ activeSlide.code }}
                  </span>
                  <div class="text-right">
                    <div class="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ink">#{{ activeSlide.ranking }}</div>
                    <div class="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/55">Views {{ activeSlide.views }}</div>
                  </div>
                </div>
                <div class="mt-16 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/45">
                  {{ activeSlide.city }}, {{ activeSlide.province }}
                </div>
                <div class="mt-2 font-display text-[1.35rem] font-bold leading-tight text-white">
                  {{ activeSlide.name }}
                </div>
                <div class="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold text-white/80">
                  View university
                  <i class="ti ti-arrow-up-right"></i>
                </div>
              </RouterLink>
            </Transition>

            <div class="mt-3 flex justify-center gap-1.5">
              <button
                v-for="(item, i) in sliderUniversities"
                :key="item.slug"
                type="button"
                class="h-1.5 rounded-full transition-all"
                :class="i === sliderIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/55'"
                :aria-label="`Show ${item.name}`"
                @click="goToSlide(i)"
              ></button>
            </div>

            <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              <button
                v-for="(item, i) in sliderUniversities.slice(0, 6)"
                :key="`${item.slug}-thumb`"
                type="button"
                class="rounded-xl px-3 py-2 text-left text-[11px] font-semibold transition"
                :class="
                  i === sliderIndex
                    ? 'bg-white text-ink shadow-sm'
                    : 'bg-white/8 text-white/70 hover:bg-white/12 hover:text-white'
                "
                @click="goToSlide(i)"
              >
                <div class="truncate">{{ item.name }}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 sm:py-12">
      <div class="site-container grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div class="space-y-8">
          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="rounded-2xl bg-white p-5 ring-1 ring-ink/8"
            >
              <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/35">{{ item.label }}</div>
              <div class="mt-2 font-display text-2xl font-extrabold text-ink">{{ item.value }}</div>
              <div class="mt-1 text-[12px] text-ink/45">{{ item.note }}</div>
            </div>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Overview</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Why students look at this university</h2>
              <div class="mt-5 space-y-3">
                <div
                  v-for="point in overviewPoints"
                  :key="point"
                  class="flex items-start gap-3 rounded-2xl bg-[#F7F8FA] px-4 py-3.5"
                >
                  <span class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-crimson text-white">
                    <i class="ti ti-check text-[14px]"></i>
                  </span>
                  <span class="text-[14px] leading-relaxed text-ink/75">{{ point }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-[1.75rem] bg-[#F7FAF9] p-6 ring-1 ring-jade/10 sm:p-8">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">Quick facts</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">At a glance</h2>
              <div class="mt-5 space-y-3">
                <div
                  v-for="fact in quickFacts"
                  :key="fact.title"
                  class="rounded-2xl bg-white px-4 py-3.5 ring-1 ring-ink/6"
                >
                  <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/35">{{ fact.title }}</div>
                  <div class="mt-1 text-[14px] font-medium leading-relaxed text-ink/80">{{ fact.value }}</div>
                </div>
              </div>
            </div>
          </div>

          <section v-if="similar.length">
            <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 class="font-display text-xl font-extrabold text-ink sm:text-2xl">Other universities in {{ uni.city }}</h2>
              <RouterLink to="/universities" class="text-[13px] font-semibold text-crimson">Browse all →</RouterLink>
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <UniversityCard v-for="s in similar" :key="s.slug" :university="s" />
            </div>
          </section>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-7">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Interested in this university?</div>
            <h3 class="mt-2 font-display text-xl font-extrabold">Let us guide your shortlist</h3>
            <p class="mt-3 text-[13px] leading-relaxed text-white/55">
              Free counselling in Bangla — we check eligibility, scholarship chance and study cost in Taka.
            </p>
            <RouterLink to="/contact" class="mt-6 flex w-full items-center justify-center rounded-xl bg-crimson py-3 text-[13px] font-semibold text-white hover:brightness-110">
              Apply with guidance
            </RouterLink>
            <a :href="WHATSAPP" target="_blank" rel="noopener" class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-[13px] font-semibold text-white ring-1 ring-white/10 hover:bg-white/15">
              <i class="ti ti-brand-whatsapp"></i>
              WhatsApp
            </a>
          </div>

          <RouterLink
            :to="{ path: '/compare', query: { add: uni.slug } }"
            class="block rounded-2xl bg-white p-5 text-center text-[13px] font-semibold text-ink ring-1 ring-ink/8 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            Add to compare →
          </RouterLink>
          <RouterLink :to="`/city/${uni.city?.toLowerCase()}`" class="block break-words rounded-2xl bg-[#F7F8FA] p-5 text-[13px] font-semibold text-crimson ring-1 ring-ink/6">
            Explore {{ uni.city }} →
          </RouterLink>
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">University not found</h1>
    <RouterLink to="/universities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Browse universities</RouterLink>
  </div>
</template>

<style scoped>
.uni-slide-enter-active,
.uni-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.uni-slide-enter-from {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

.uni-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}
</style>
