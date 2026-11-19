<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSiteSettings } from '../composables/useSiteSettings.js'
import { fetchAbout, getCachedAbout } from '../api/about.js'

const EMPTY_ABOUT = {
  visibility: {},
  hero: {},
  stats: [],
  story: {},
  values: { items: [] },
  journey: { steps: [] },
  team: { members: [] },
  trust: { items: [] },
  cta: {},
}

const { brand: BRAND, whatsapp: WHATSAPP } = useSiteSettings()
const about = ref(getCachedAbout() || EMPTY_ABOUT)
const loading = ref(!getCachedAbout())

const visibility = computed(() => about.value.visibility || {})
const hero = computed(() => about.value.hero || {})
const stats = computed(() => (about.value.stats || []).filter((s) => s?.value || s?.label))
const story = computed(() => about.value.story || {})
const values = computed(() => about.value.values || { items: [] })
const journey = computed(() => about.value.journey || { steps: [] })
const team = computed(() => about.value.team || { members: [] })
const trust = computed(() => about.value.trust || { items: [] })
const cta = computed(() => about.value.cta || {})

const valueItems = computed(() => (values.value.items || []).filter((i) => i?.title))
const journeySteps = computed(() => (journey.value.steps || []).filter((i) => i?.title))
const trustItems = computed(() => (trust.value.items || []).filter((i) => i?.title))
const teamMembers = computed(() => (team.value.members || []).filter((m) => m?.name))

function flagged(key) {
  return visibility.value[key] !== false
}

function withBrand(text = '') {
  return String(text || '').replace(/AR Education/g, BRAND.value || 'AR Education')
}

const heroTitle = computed(() => withBrand(hero.value.title))
const heroSubtitle = computed(() => withBrand(hero.value.subtitle))
const storyTitle = computed(() => withBrand(story.value.title))
const storyParagraphs = computed(() =>
  String(story.value.body || '')
    .split(/\n\s*\n/)
    .map((p) => withBrand(p.trim()))
    .filter(Boolean),
)

const showStats = computed(() => flagged('stats') && stats.value.length > 0)
const showStory = computed(
  () =>
    flagged('story') &&
    !!(storyTitle.value || storyParagraphs.value.length || story.value.quote || story.value.image),
)
const showValues = computed(() => flagged('values') && valueItems.value.length > 0)
const showJourney = computed(() => flagged('journey') && journeySteps.value.length > 0)
const showTeam = computed(() => flagged('team') && teamMembers.value.length > 0)
const showTrust = computed(() => flagged('trust') && trustItems.value.length > 0)
const showCta = computed(() => flagged('cta') && !!(cta.value.title || cta.value.button_label))

const collage = computed(() => [
  { src: hero.value.image_1, fallback: 'linear-gradient(145deg, #fcebeb 0%, #d61f26 100%)' },
  { src: hero.value.image_2, fallback: 'linear-gradient(145deg, #eef1f6 0%, #182640 100%)' },
  { src: hero.value.image_3, fallback: 'linear-gradient(145deg, #fbf3e2 0%, #dd9f2b 100%)' },
])

const hasCollage = computed(() => collage.value.some((c) => c.src))

const statsGridClass = computed(() => {
  const n = stats.value.length
  if (n <= 1) return 'grid-cols-1'
  if (n === 2) return 'grid-cols-2'
  if (n === 3) return 'grid-cols-3'
  return 'grid-cols-2 lg:grid-cols-4'
})

const valuesGridClass = computed(() => {
  const n = valueItems.value.length
  if (n === 1) return 'grid-cols-1 max-w-md mx-auto'
  if (n === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (n === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
})

const journeyGridClass = computed(() => {
  const n = journeySteps.value.length
  if (n <= 1) return 'grid-cols-1'
  if (n === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (n === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
})

onMounted(async () => {
  try {
    about.value = await fetchAbout()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-crimson/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-jade/15 blur-3xl"></div>

      <div class="relative site-container py-10 sm:py-14 lg:py-16" :class="showStats ? 'pb-14 sm:pb-20' : ''">
        <div
          class="grid items-center gap-8 sm:gap-10 lg:gap-14"
          :class="hasCollage ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-1'"
        >
          <div :class="hasCollage ? '' : 'mx-auto max-w-3xl text-center'">
            <div
              v-if="hero.eyebrow"
              class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-crimson"></span>
              {{ hero.eyebrow }}
            </div>
            <h1
              v-if="heroTitle"
              class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl lg:text-[2.65rem]"
              :class="hasCollage ? 'max-w-xl' : 'mx-auto max-w-3xl'"
            >
              {{ heroTitle }}
            </h1>
            <p
              v-if="heroSubtitle"
              class="mt-3 text-[14.5px] leading-relaxed text-white/65 sm:mt-4 sm:text-[15px]"
              :class="hasCollage ? 'max-w-xl' : 'mx-auto max-w-2xl'"
            >
              {{ heroSubtitle }}
            </p>
            <div
              v-if="hero.primary_cta_label || hero.secondary_cta_label"
              class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
              :class="hasCollage ? '' : 'sm:justify-center'"
            >
              <RouterLink
                v-if="hero.primary_cta_label"
                :to="hero.primary_cta_url || '/contact'"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-5 py-3.5 text-[13.5px] font-semibold text-white shadow-lg shadow-crimson/25 transition hover:brightness-110 sm:w-auto"
              >
                {{ hero.primary_cta_label }}
                <i class="ti ti-arrow-right text-[15px]"></i>
              </RouterLink>
              <a
                v-if="hero.secondary_cta_label"
                :href="WHATSAPP"
                target="_blank"
                rel="noopener"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3.5 text-[13.5px] font-semibold text-white transition hover:brightness-110 sm:w-auto"
              >
                <i class="ti ti-brand-whatsapp text-[17px]"></i>
                {{ hero.secondary_cta_label }}
              </a>
            </div>
          </div>

          <div v-if="hasCollage" class="relative mx-auto w-full max-w-md lg:max-w-none">
            <div class="grid h-[220px] grid-cols-[1.35fr_1fr] grid-rows-2 gap-2.5 sm:h-[320px] sm:gap-3 lg:h-[380px]">
              <div
                class="row-span-2 overflow-hidden rounded-[1.25rem] bg-cover bg-center ring-1 ring-white/10 sm:rounded-[1.5rem]"
                :style="collage[0].src ? { backgroundImage: `url('${collage[0].src}')` } : { background: collage[0].fallback }"
              ></div>
              <div
                class="overflow-hidden rounded-[1.1rem] bg-cover bg-center ring-1 ring-white/10 sm:rounded-[1.35rem]"
                :style="collage[1].src ? { backgroundImage: `url('${collage[1].src}')` } : { background: collage[1].fallback }"
              ></div>
              <div
                class="overflow-hidden rounded-[1.1rem] bg-cover bg-center ring-1 ring-white/10 sm:rounded-[1.35rem]"
                :style="collage[2].src ? { backgroundImage: `url('${collage[2].src}')` } : { background: collage[2].fallback }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section v-if="showStats" class="relative z-10 -mt-7 sm:-mt-10">
      <div class="site-container">
        <div
          class="grid gap-1 rounded-[1.35rem] bg-white p-1.5 shadow-lift ring-1 ring-ink/8 sm:rounded-[1.5rem] sm:p-2"
          :class="statsGridClass"
        >
          <div
            v-for="(item, i) in stats"
            :key="`${item.label}-${i}`"
            class="rounded-[1.1rem] px-3 py-4 text-center sm:rounded-[1.2rem] sm:px-5 sm:py-6"
            :class="stats.length === 3 && i === 2 ? 'sm:col-span-1' : ''"
          >
            <div class="font-display text-[1.45rem] font-extrabold tracking-tight text-ink sm:text-[1.85rem]">
              {{ item.value }}
            </div>
            <div class="mt-1 text-[11.5px] font-medium leading-snug text-ink/45 sm:text-[12.5px]">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section v-if="showStory" class="site-container py-10 sm:py-14 lg:py-20">
      <div
        class="grid items-start gap-8 sm:gap-10 lg:gap-14"
        :class="story.image || story.quote ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-1'"
      >
        <!-- Copy first on mobile for readability -->
        <div
          class="order-1"
          :class="[
            story.image || story.quote ? 'lg:order-2 lg:pt-1' : 'mx-auto max-w-3xl text-center',
          ]"
        >
          <div v-if="story.eyebrow" class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">
            {{ story.eyebrow }}
          </div>
          <h2
            v-if="storyTitle"
            class="mt-3 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.7rem] md:text-3xl"
            :class="story.image || story.quote ? 'max-w-lg' : ''"
          >
            {{ storyTitle }}
          </h2>
          <div
            v-if="storyParagraphs.length"
            class="mt-4 space-y-3.5 sm:mt-5 sm:space-y-4"
            :class="story.image || story.quote ? 'max-w-xl' : 'mx-auto max-w-2xl'"
          >
            <p
              v-for="(para, i) in storyParagraphs"
              :key="i"
              class="text-[14.5px] leading-relaxed text-ink/60 sm:text-[15px]"
            >
              {{ para }}
            </p>
          </div>
        </div>

        <!-- Media / quote panel -->
        <div v-if="story.image" class="relative order-2 pb-8 lg:order-1">
          <div
            class="aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-cover bg-center ring-1 ring-ink/8 sm:aspect-[4/5] sm:rounded-[1.75rem]"
            :style="{ backgroundImage: `url('${story.image}')` }"
          ></div>
          <div
            v-if="story.quote"
            class="absolute bottom-0 left-4 right-4 rounded-2xl bg-white p-4 shadow-lift ring-1 ring-ink/8 sm:left-8 sm:right-auto sm:max-w-sm sm:p-5"
          >
            <p class="text-[13.5px] font-medium leading-relaxed text-ink sm:text-[14px]">“{{ withBrand(story.quote) }}”</p>
            <div v-if="story.quote_author" class="mt-2 text-[12px] font-semibold text-crimson">
              {{ withBrand(story.quote_author) }}
            </div>
          </div>
        </div>

        <aside
          v-else-if="story.quote"
          class="relative order-2 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] p-6 text-white sm:rounded-[1.75rem] sm:p-8 lg:order-1 lg:min-h-[320px]"
        >
          <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-crimson/20 blur-3xl"></div>
          <div class="relative flex h-full flex-col justify-between gap-6 sm:gap-8">
            <i class="ti ti-quote text-3xl text-crimson/80"></i>
            <div>
              <p class="font-display text-lg font-bold leading-snug sm:text-2xl">
                “{{ withBrand(story.quote) }}”
              </p>
              <div v-if="story.quote_author" class="mt-3 text-[12.5px] font-semibold text-white/55 sm:mt-4 sm:text-[13px]">
                — {{ withBrand(story.quote_author) }}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- Values -->
    <section v-if="showValues" class="bg-[#F4F6F8] py-10 sm:py-14 lg:py-20">
      <div class="site-container">
        <div class="mx-auto max-w-2xl text-center">
          <div v-if="values.eyebrow" class="inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1.5">
            <i class="ti ti-sparkles text-[14px] text-crimson"></i>
            <span class="text-[11px] font-semibold uppercase tracking-[0.12em] text-crimson">{{ values.eyebrow }}</span>
          </div>
          <h2
            v-if="values.title"
            class="mt-4 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.7rem] md:text-3xl"
          >
            {{ withBrand(values.title) }}
          </h2>
          <p v-if="values.subtitle" class="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-ink/50 sm:text-[14.5px]">
            {{ withBrand(values.subtitle) }}
          </p>
        </div>

        <div class="mt-8 grid gap-3 sm:mt-10 sm:gap-4" :class="valuesGridClass">
          <article
            v-for="(item, i) in valueItems"
            :key="`${item.title}-${i}`"
            class="rounded-[1.25rem] bg-white p-5 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-lift sm:rounded-[1.4rem] sm:p-6"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-crimson/10 text-crimson sm:h-11 sm:w-11">
              <i class="ti text-[17px] sm:text-[18px]" :class="item.icon || 'ti-check'"></i>
            </span>
            <h3 class="mt-4 font-display text-[1.05rem] font-bold text-ink sm:mt-5 sm:text-lg">{{ item.title }}</h3>
            <p v-if="item.description" class="mt-2 text-[13px] leading-relaxed text-ink/50 sm:text-[13.5px]">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Journey -->
    <section v-if="showJourney" class="site-container py-10 sm:py-14 lg:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <div v-if="journey.eyebrow" class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">
          {{ journey.eyebrow }}
        </div>
        <h2
          v-if="journey.title"
          class="mt-3 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.7rem] md:text-3xl"
        >
          {{ withBrand(journey.title) }}
        </h2>
        <p v-if="journey.subtitle" class="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-ink/50 sm:text-[14.5px]">
          {{ withBrand(journey.subtitle) }}
        </p>
      </div>

      <div class="relative mt-8 sm:mt-12">
        <div
          v-if="journeySteps.length >= 3"
          class="pointer-events-none absolute left-[8%] right-[8%] top-10 hidden h-px bg-gradient-to-r from-crimson/20 via-jade/35 to-crimson/20 lg:block"
        ></div>
        <div class="grid gap-3 sm:gap-4 lg:gap-3" :class="journeyGridClass">
          <article
            v-for="(step, i) in journeySteps"
            :key="`${step.title}-${i}`"
            class="relative rounded-[1.25rem] bg-[#F8F9FB] p-4 ring-1 ring-ink/8 sm:rounded-[1.4rem] sm:p-6"
          >
            <div class="flex items-center justify-between">
              <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white sm:h-11 sm:w-11">
                <i class="ti text-[17px] sm:text-[18px]" :class="step.icon || 'ti-circle-check'"></i>
              </span>
              <span class="font-display text-sm font-bold text-ink/25">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="mt-4 font-display text-[1.05rem] font-bold text-ink sm:mt-5 sm:text-lg">{{ step.title }}</h3>
            <p v-if="step.description" class="mt-2 text-[13px] leading-relaxed text-ink/50 sm:text-[13.5px]">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section v-if="showTeam" class="bg-[#FBFAF7] py-10 sm:py-14 lg:py-20">
      <div class="site-container">
        <div class="mx-auto max-w-2xl text-center">
          <div v-if="team.eyebrow" class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">
            {{ team.eyebrow }}
          </div>
          <h2
            v-if="team.title"
            class="mt-3 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.7rem] md:text-3xl"
          >
            {{ withBrand(team.title) }}
          </h2>
          <p v-if="team.subtitle" class="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-ink/50 sm:text-[14.5px]">
            {{ withBrand(team.subtitle) }}
          </p>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <article
            v-for="(member, i) in teamMembers"
            :key="`${member.name}-${i}`"
            class="overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-lift sm:rounded-[1.5rem]"
            :class="teamMembers.length === 1 ? 'col-span-2 mx-auto w-full max-w-[280px] lg:col-span-1' : ''"
          >
            <div class="relative overflow-hidden" style="aspect-ratio: 4 / 5">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="h-full w-full object-cover"
                loading="lazy"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center text-3xl font-extrabold text-white sm:text-5xl"
                :style="{ background: member.color || '#D61F26' }"
              >
                {{ member.initials || member.name.slice(0, 2).toUpperCase() }}
              </div>
            </div>
            <div class="p-3.5 sm:p-5">
              <div v-if="member.role" class="text-[10px] font-bold uppercase tracking-[0.12em] text-crimson sm:text-[11px]">
                {{ member.role }}
              </div>
              <h3 class="mt-1 font-display text-[14px] font-bold leading-snug text-ink sm:mt-1.5 sm:text-lg">{{ member.name }}</h3>
              <p v-if="member.bio" class="mt-1.5 text-[12px] leading-relaxed text-ink/50 sm:mt-2 sm:text-[13px]">{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Trust -->
    <section v-if="showTrust" class="site-container py-10 sm:py-14 lg:py-20">
      <div class="grid gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
        <div>
          <div v-if="trust.eyebrow" class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">
            {{ trust.eyebrow }}
          </div>
          <h2
            v-if="trust.title"
            class="mt-3 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.7rem] md:text-3xl"
          >
            {{ withBrand(trust.title) }}
          </h2>
          <p v-if="trust.subtitle" class="mt-3 max-w-md text-[14px] leading-relaxed text-ink/50 sm:text-[14.5px]">
            {{ withBrand(trust.subtitle) }}
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <article
            v-for="(item, i) in trustItems"
            :key="`${item.title}-${i}`"
            class="rounded-[1.25rem] bg-[#F8F9FB] p-4 ring-1 ring-ink/8 sm:rounded-[1.35rem] sm:p-6"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-crimson/10 text-crimson sm:h-11 sm:w-11">
              <i class="ti text-[17px] sm:text-[18px]" :class="item.icon || 'ti-check'"></i>
            </span>
            <h3 class="mt-3 text-[14.5px] font-bold text-ink sm:mt-4 sm:text-[15px]">{{ item.title }}</h3>
            <p v-if="item.description" class="mt-1.5 text-[12.5px] leading-relaxed text-ink/50 sm:text-[13px]">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section v-if="showCta" class="site-container pb-10 sm:pb-14 lg:pb-20">
      <div class="relative overflow-hidden rounded-[1.5rem] bg-ink px-5 py-8 text-white sm:rounded-[1.75rem] sm:px-10 sm:py-12 lg:rounded-[2rem]">
        <div class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-crimson/25 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-jade/25 blur-3xl"></div>

        <div class="relative flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-xl">
            <h2 v-if="cta.title" class="font-display text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl">
              {{ withBrand(cta.title) }}
            </h2>
            <p v-if="cta.subtitle" class="mt-2 text-[14px] text-white/55 sm:text-[14.5px]">{{ withBrand(cta.subtitle) }}</p>
          </div>
          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <RouterLink
              v-if="cta.button_label"
              :to="cta.button_url || '/contact'"
              class="inline-flex w-full items-center justify-center rounded-xl bg-crimson px-6 py-3.5 text-[13.5px] font-semibold text-white transition hover:brightness-110 sm:w-auto"
            >
              {{ cta.button_label }}
            </RouterLink>
            <a
              v-if="cta.secondary_label"
              :href="WHATSAPP"
              target="_blank"
              rel="noopener"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-[13.5px] font-semibold text-white transition hover:bg-white/15 sm:w-auto"
            >
              <i class="ti ti-brand-whatsapp text-[16px]"></i>
              {{ cta.secondary_label }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <div v-if="loading" class="sr-only">Loading about content…</div>
  </div>
</template>
