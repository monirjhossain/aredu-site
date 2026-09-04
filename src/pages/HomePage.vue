<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  TOOLS,
  SERVICES,
  DEGREES,
  FIELD_GROUPS,
  FAQS,
  SCHOLARSHIP_META,
  WHATSAPP,
  BRAND,
} from '../data/site.js'
import scholarships from '../data/scholarships.json'
import cities from '../data/cities.json'
import FaqItem from '../components/ui/FaqItem.vue'
import StatCounter from '../components/ui/StatCounter.vue'
import HeroUniSlider from '../components/home/HeroUniSlider.vue'
import PopularCoursesSection from '../components/home/PopularCoursesSection.vue'
import PopularUniversitiesSection from '../components/home/PopularUniversitiesSection.vue'
import AskExpertsSection from '../components/home/AskExpertsSection.vue'
import GallerySection from '../components/home/GallerySection.vue'
import VideoShowcaseSection from '../components/home/VideoShowcaseSection.vue'

const router = useRouter()
const searchQuery = ref('')

const featuredCities = computed(() =>
  cities
    .map((c) => ({ ...c, uniCount: c.universities || 1 }))
    .sort((a, b) => b.uniCount - a.uniCount)
    .slice(0, 5),
)

function onSearch() {
  router.push({ path: '/universities', query: { q: searchQuery.value } })
}

const whyChoose = [
  {
    title: 'Affordable in Taka',
    desc: 'See the full cost in BDT before you apply — tuition, living, visa and flights.',
    num: '01',
  },
  {
    title: 'Scholarships that pay you',
    desc: 'CSC and provincial awards can cover tuition, dorm, insurance and a monthly stipend.',
    num: '02',
  },
  {
    title: 'World-ranked degrees',
    desc: '985 & 211 universities with strong engineering, medical and business programmes.',
    num: '03',
  },
  {
    title: 'Guided end-to-end',
    desc: 'From shortlist to student visa — free counselling on WhatsApp, in Bangla.',
    num: '04',
  },
]

const howSteps = [
  { step: '01', title: 'Discover', desc: 'Convert grades, estimate costs in Taka, and shortlist universities.' },
  { step: '02', title: 'Shortlist', desc: 'Check scholarship eligibility and compare best-fit options.' },
  { step: '03', title: 'Apply', desc: 'We prepare your file and submit to your chosen universities.' },
  { step: '04', title: 'Fly', desc: 'Admission, JW202, student visa — then depart Dhaka ready.' },
]
</script>

<template>
  <div>
  <!-- HERO: one composition -->
  <section class="relative min-h-[min(92vh,880px)] overflow-hidden text-white">
    <div class="pointer-events-none absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=2400&q=80"
        alt="China cityscape"
        class="h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-[linear-gradient(165deg,rgba(10,22,40,0.88)_0%,rgba(18,35,61,0.78)_48%,rgba(15,28,48,0.9)_100%)]" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_85%_20%,rgba(225,29,46,0.18),transparent_55%),radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(15,118,110,0.14),transparent_50%)]" />
    </div>
    <div class="pointer-events-none absolute inset-0 texture-grid opacity-20" />
    <div class="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] animate-float rounded-full bg-crimson/15 blur-3xl" />
    <div class="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-jade/20 blur-3xl" />

    <div class="relative site-container grid min-h-[min(92vh,880px)] items-end gap-8 pb-12 pt-10 sm:gap-10 sm:pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-8">
      <div class="reveal">
        <div class="font-display text-[clamp(1.9rem,4.5vw,2.75rem)] font-extrabold leading-tight tracking-tight">
          {{ BRAND }}
        </div>
        <h1 class="mt-4 max-w-lg font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-snug text-white/95">
          Study in China,<br />guided from Bangladesh.
        </h1>
        <p class="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
          Universities, scholarships and real costs in Taka — with step-by-step help from admission to visa.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink to="/tools/find-university" class="btn-primary shadow-lg shadow-crimson/30">
            Find my university
          </RouterLink>
          <RouterLink to="/scholarships" class="btn-ghost border-white/20 bg-white/10 text-white hover:bg-white/15">
            Browse scholarships
          </RouterLink>
        </div>

        <form
          class="mt-6 flex max-w-md flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md sm:flex-row sm:items-center sm:p-1.5 sm:pl-4"
          @submit.prevent="onSearch"
        >
          <div class="flex items-center gap-2 px-2 sm:flex-1 sm:px-0">
            <i class="ti ti-search text-white/50"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search universities, majors…"
              class="w-full bg-transparent py-2 text-[14px] text-white placeholder:text-white/40 outline-none"
            />
          </div>
          <button type="submit" class="w-full rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-ink sm:w-auto">
            Search
          </button>
        </form>
      </div>

      <!-- Dominant visual + university slider -->
      <div class="relative reveal" style="animation-delay: 0.15s">
        <HeroUniSlider />
      </div>
    </div>
  </section>

  <!-- Impact strip — soft bar under hero -->
  <section class="relative z-10 -mt-10 sm:-mt-12 lg:-mt-14">
    <div class="site-container">
      <div class="overflow-hidden rounded-2xl bg-[#E8F3F1] px-5 py-7 shadow-soft ring-1 ring-jade/15 sm:px-8 sm:py-8 lg:rounded-3xl lg:px-10">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
          <div class="shrink-0 lg:max-w-[220px] lg:border-r lg:border-jade/20 lg:pr-10">
            <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-crimson">AR Education</div>
            <p class="mt-2 text-[14px] font-semibold leading-snug text-ink">
              Numbers that matter for your China journey.
            </p>
          </div>

          <div class="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:pl-2">
            <div class="lg:border-r lg:border-jade/15 lg:px-6">
              <StatCounter :target="98" label="Universities" />
            </div>
            <div class="lg:border-r lg:border-jade/15 lg:px-6">
              <StatCounter :target="9" label="Scholarships" />
            </div>
            <div class="lg:border-r lg:border-jade/15 lg:px-6">
              <StatCounter :target="52" label="Cities" />
            </div>
            <div class="lg:border-r lg:border-jade/15 lg:px-6">
              <StatCounter :target="121" label="Majors" />
            </div>
            <div class="col-span-2 sm:col-span-1 lg:px-6">
              <StatCounter :target="2000" label="Students" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <PopularCoursesSection />

  <PopularUniversitiesSection />

  <!-- Tools — journey list -->
  <section class="py-16 lg:py-24">
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

  <AskExpertsSection />

  <!-- Services -->
  <section class="relative overflow-hidden py-14 sm:py-16 lg:py-20">
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
            v-for="(svc, i) in SERVICES"
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
  <section class="relative overflow-hidden border-y border-ink/8 bg-[#FBFAF7] py-16 lg:py-20">
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
          :to="`/study/${DEGREES[0].slug}`"
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
                  Dummy visual
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
  <section class="section-pad">
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
  <section class="relative overflow-hidden py-16 lg:py-24">
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
                {{ SCHOLARSHIP_META[s.slug]?.coverage || 'Award' }}
              </span>
              <span class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
            </div>
            <div class="mt-5 font-display text-[1.05rem] font-bold leading-snug text-white sm:text-[1.1rem]" :class="i === 0 ? 'max-w-md text-[1.4rem] sm:text-[1.6rem]' : ''">
              {{ s.name }}
            </div>
            <p class="mt-2 text-[12.5px] leading-relaxed text-white/60">
              {{ SCHOLARSHIP_META[s.slug]?.desc || 'Funding opportunity for international applicants.' }}
            </p>
            <div v-if="i === 0" class="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Coverage</div>
                <div class="mt-1 text-[13px] font-semibold text-white">{{ SCHOLARSHIP_META[s.slug]?.coverage || 'Award' }}</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Universities</div>
                <div class="mt-1 text-[13px] font-semibold text-white">{{ SCHOLARSHIP_META[s.slug]?.universities || '—' }}</div>
              </div>
              <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[10px] uppercase tracking-[0.12em] text-white/35">Best for</div>
                <div class="mt-1 text-[13px] font-semibold text-white">Strong profiles</div>
              </div>
            </div>
            <div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span class="text-[12px] text-white/45">
                {{ SCHOLARSHIP_META[s.slug]?.universities || '—' }} universities
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
  <section class="site-container pb-8">
    <div class="overflow-hidden rounded-[2rem] bg-sand px-6 py-12 text-center sm:px-12">
      <h2 class="headline text-3xl sm:text-4xl">Not sure where to start?</h2>
      <p class="mx-auto mt-3 max-w-md text-[15px] text-ink/55">Answer a few questions — we'll match universities and scholarships free, in minutes.</p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <RouterLink to="/tools/find-university" class="btn-primary w-full sm:w-auto">Find my university →</RouterLink>
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="btn-ghost w-full sm:w-auto">WhatsApp us</a>
      </div>
    </div>
  </section>

  <!-- Why -->
  <section class="section-pad">
    <div class="overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/8 lg:rounded-[2.5rem]">
      <div class="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="relative overflow-hidden bg-[#F7FAF9] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div class="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-jade/10 blur-3xl"></div>
          <div class="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-crimson/8 blur-3xl"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink/8">
              <i class="ti ti-world text-[14px] text-crimson"></i>
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-crimson">Why China</span>
            </div>
            <h2 class="mt-4 max-w-md font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              Why Bangladeshi students choose China.
            </h2>
            <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/50">
              Affordable education, scholarship access and a faster path to globally relevant degrees make China one of the strongest options for Bangladeshi students.
            </p>

            <div class="mt-8 rounded-[1.6rem] bg-ink p-5 text-white sm:p-6">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Fast summary</div>
              <div class="mt-2 font-display text-xl font-extrabold">Lower cost, better options, clearer support.</div>
              <p class="mt-2 text-[13px] leading-relaxed text-white/55">
                Students can compare tuition in Taka, aim for funded routes and get end-to-end help from Bangladesh.
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
                <i
                  class="ti"
                  :class="
                    item.num === '01'
                      ? 'ti-wallet'
                      : item.num === '02'
                        ? 'ti-rosette-discount-check'
                        : item.num === '03'
                          ? 'ti-building-bank'
                          : 'ti-users-group'
                  "
                ></i>
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
  <section class="border-y border-ink/8 bg-white py-16 lg:py-24">
    <div class="site-container">
      <div class="mx-auto max-w-2xl text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5">
          <i class="ti ti-route-2 text-[14px] text-jade"></i>
          <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">How it works</span>
        </div>
        <h2 class="mt-4 font-display text-[1.8rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          Your path from first search to class day.
        </h2>
        <p class="mt-4 text-[14.5px] leading-relaxed text-ink/50">
          A simple four-step process for Bangladeshi students planning admission, scholarship and visa support for China.
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
                  <i
                    class="ti"
                    :class="
                      i === 0
                        ? 'ti-search'
                        : i === 1
                          ? 'ti-list-check'
                          : i === 2
                            ? 'ti-file-check'
                            : 'ti-plane-departure'
                    "
                  ></i>
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

  <GallerySection />

  <VideoShowcaseSection />

  <!-- FAQ -->
  <section class="section-pad">
    <div class="overflow-hidden rounded-[2rem] bg-[#FBFAF7] ring-1 ring-ink/8 lg:rounded-[2.5rem]">
      <div class="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
        <div class="relative overflow-hidden bg-ink px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
          <div class="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-crimson/20 blur-3xl"></div>
          <div class="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-jade/20 blur-3xl"></div>
          <div class="pointer-events-none absolute inset-0 texture-grid opacity-20"></div>

          <div class="relative">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <i class="ti ti-help-circle text-[14px] text-jade"></i>
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">FAQ</span>
            </div>
            <h2 class="mt-4 max-w-md font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
            <p class="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/58">
              Quick answers to the questions Bangladeshi students ask most about universities, scholarships, costs and admission in China.
            </p>

            <div class="mt-8 rounded-[1.6rem] bg-white/8 p-5 ring-1 ring-white/10">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">Need a direct answer?</div>
              <p class="mt-2 text-[13px] leading-relaxed text-white/55">
                If your question is not listed here, our team can guide you directly in Bangla.
              </p>
              <a
                :href="WHATSAPP"
                target="_blank"
                rel="noopener"
                class="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-sand"
              >
                Ask on WhatsApp
                <i class="ti ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="bg-[linear-gradient(145deg,rgba(232,238,244,0.55)_0%,rgba(255,255,255,1)_42%,rgba(230,244,242,0.55)_100%)] p-4 sm:p-5 lg:p-6">
          <div class="grid gap-3">
            <FaqItem v-for="faq in FAQS" :key="faq.q" :q="faq.q" :a="faq.a" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="pb-20">
    <div class="site-container">
      <div class="overflow-hidden rounded-[2rem] mesh-hero px-6 py-14 text-center text-white sm:px-12">
        <div class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to study in China?</div>
        <p class="mx-auto mt-3 max-w-lg text-[15px] text-white/60">Free counselling in Bangla — pick a university, apply, win a scholarship, reach class day one.</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="btn-primary w-full sm:w-auto">Chat on WhatsApp</a>
          <RouterLink to="/tools/find-university" class="btn-ghost w-full border-white/20 bg-white/10 text-white hover:bg-white/15 sm:w-auto">Find my university</RouterLink>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
