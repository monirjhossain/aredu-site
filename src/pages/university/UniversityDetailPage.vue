<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchUniversities, fetchUniversityBySlug, mapPostToUniversity } from '../../api/universities.js'
import { buildApiPath, peekApi, subscribeApi } from '../../api/client.js'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const { whatsapp: WHATSAPP } = useSiteSettings()
const route = useRoute()
const sliderIndex = ref(0)
const sliderPaused = ref(false)
const loading = ref(true)
const error = ref('')
const uni = ref(null)
const allUniversities = ref([])
let sliderTimer = null
let unsubDetail = null

const sliderUniversities = computed(() => {
  if (!uni.value) return allUniversities.value.slice(0, 8)
  const rest = allUniversities.value.filter((u) => u.slug !== uni.value.slug)
  return [uni.value, ...rest].slice(0, 10)
})

const activeSlide = computed(() => sliderUniversities.value[sliderIndex.value] || uni.value)

const similar = computed(() => {
  if (!uni.value) return []
  return allUniversities.value
    .filter((u) => u.slug !== uni.value.slug && u.city === uni.value.city)
    .slice(0, 3)
})

const highlights = computed(() => {
  if (!uni.value) return []
  return [
    {
      label: 'Reference',
      value: `#${uni.value.id || uni.value.ranking}`,
      note: 'Admin university ID',
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
  if (uni.value.excerpt) {
    return [
      uni.value.excerpt,
      `Students usually shortlist this university for study pathways with AR Education counselling support.`,
      uni.value.scholarship
        ? 'Scholarship options may be available for strong academic profiles and complete applications.'
        : 'Scholarship availability can vary — we help you check the best route before you apply.',
      'We guide admission, documents, visa planning and the full student journey in Bangla.',
    ]
  }
  return [
    `${uni.value.name} welcomes international students from Bangladesh across undergraduate and postgraduate pathways.`,
    `Students usually shortlist this university with AR Education guidance for admission and visa planning.`,
    'We guide admission, documents, visa planning and the full student journey in Bangla.',
  ]
})

const quickFacts = computed(() => {
  if (!uni.value) return []
  return [
    { title: 'Degree paths', value: 'Bachelor · Master · Language' },
    { title: 'Application help', value: 'Full support from AR Education' },
    { title: 'Source', value: 'Live from admin CMS' },
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

async function load() {
  const slug = route.params.slug
  const detailPath = buildApiPath(`/posts/${encodeURIComponent(slug)}`)
  error.value = ''

  if (unsubDetail) unsubDetail()
  unsubDetail = subscribeApi(detailPath, (payload) => {
    if (payload?.data?.post) uni.value = mapPostToUniversity(payload.data.post)
  })

  const cached = peekApi(detailPath)
  if (cached?.data?.post) {
    uni.value = mapPostToUniversity(cached.data.post)
    loading.value = false
  } else {
    loading.value = true
  }

  try {
    const [detail, list] = await Promise.all([
      fetchUniversityBySlug(slug),
      fetchUniversities({ perPage: 40 }),
    ])
    uni.value = detail
    allUniversities.value = list.items
    sliderIndex.value = 0
    startSlider()
  } catch (e) {
    console.error(e)
    if (!uni.value) {
      error.value = e.message || 'Failed to load university'
      uni.value = null
    }
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  () => {
    load()
  },
)

onMounted(load)

onUnmounted(() => {
  stopSlider()
  if (unsubDetail) unsubDetail()
})
</script>

<template>
  <div v-if="loading && !uni" class="site-container py-20 text-center text-[14px] text-ink/45">
    Loading university from admin...
  </div>

  <div v-else-if="error" class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">Could not load university</h1>
    <p class="mt-2 text-[13px] text-ink/50">{{ error }}</p>
    <RouterLink to="/universities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Browse universities</RouterLink>
  </div>

  <div v-else-if="uni">
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <img
        v-if="uni.image"
        :src="uni.image"
        :alt="uni.name"
        loading="eager"
        decoding="async"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(8,16,32,0.88)_0%,rgba(10,22,40,0.78)_55%,rgba(10,22,40,0.7)_100%)]" />
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
              A China study option for Bangladeshi students — admission, scholarship and visa planning with AR Education.
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
            class="overflow-hidden rounded-[1.75rem] bg-white/10 p-2 ring-1 ring-white/12 backdrop-blur sm:p-3"
            @mouseenter="sliderPaused = true"
            @mouseleave="sliderPaused = false"
          >
            <div v-if="uni.image" class="overflow-hidden rounded-[1.35rem]">
              <img :src="uni.image" :alt="uni.name" loading="eager" decoding="async" class="h-56 w-full object-cover sm:h-72" />
            </div>
            <div v-else class="flex h-56 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-[#143153] to-[#2c5f7f] sm:h-72">
              <span class="font-display text-4xl font-extrabold text-white/80">{{ uni.code }}</span>
            </div>
            <div class="px-3 py-3 text-[12px] text-white/70">
              {{ uni.city }} · {{ uni.province }}
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

          <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
            <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Overview</div>
            <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">About this university</h2>
            <div v-if="uni.content" class="prose mt-5 max-w-none text-[14px] leading-relaxed text-ink/75" v-html="uni.content"></div>
            <div v-else class="mt-5 space-y-3">
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
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">University not found</h1>
    <RouterLink to="/universities" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Browse universities</RouterLink>
  </div>
</template>
