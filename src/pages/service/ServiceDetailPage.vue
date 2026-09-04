<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { SERVICES, FAQS, WHATSAPP } from '../../data/site.js'
import FaqItem from '../../components/ui/FaqItem.vue'

const route = useRoute()

const service = computed(() => SERVICES.find((s) => s.slug === route.params.slug))

const otherServices = computed(() =>
  SERVICES.filter((s) => s.slug !== route.params.slug).slice(0, 3),
)

const relatedFaqs = computed(() => {
  if (route.params.slug === 'csca-university-interview-duolingo-support') {
    return [
      {
        q: 'Do I need CSCA for every Chinese university?',
        a: 'Not always. Many universities now require or prefer CSCA for certain programmes. We confirm the exact requirement for your shortlisted universities.',
      },
      {
        q: 'Is Duolingo accepted instead of IELTS?',
        a: 'Many English-taught programmes accept Duolingo. Requirements vary by university — we check what your target schools accept and help you prepare.',
      },
      {
        q: 'How do mock interviews help?',
        a: 'Mocks build confidence on motivation, major choice, scholarship answers and common follow-ups — in Bangla first, then English practice if needed.',
      },
    ]
  }
  return FAQS.slice(0, 3)
})
</script>

<template>
  <div v-if="service">
    <!-- Hero -->
    <section class="relative overflow-hidden text-white" :style="{ background: `linear-gradient(145deg, #0A1628 0%, #12233d 45%, ${service.color} 160%)` }">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-30" />
      <div class="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full opacity-40 blur-3xl" :style="{ background: service.color }" />

      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
          <RouterLink to="/" class="hover:text-white">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/services" class="hover:text-white">Services</RouterLink>
          <span>/</span>
          <span class="text-white/80">{{ service.name }}</span>
        </nav>

        <div class="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div
              class="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[26px]"
              :style="{ background: service.bg, color: service.color }"
            >
              <i class="ti" :class="service.icon"></i>
            </div>
            <h1 class="mt-5 max-w-2xl font-display text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem]">
              {{ service.name }}
            </h1>
            <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
              {{ service.long || service.short }}
            </p>
            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110 sm:w-auto">
                <i class="ti ti-brand-whatsapp text-[16px]"></i>
                Talk on WhatsApp
              </a>
              <RouterLink to="/contact" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-[13px] font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 sm:w-auto">
                Request counselling
              </RouterLink>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div class="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-xl font-extrabold sm:text-2xl">Free</div>
              <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">Counselling</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-xl font-extrabold sm:text-2xl">2000+</div>
              <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">Students</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-4 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-xl font-extrabold sm:text-2xl">5+</div>
              <div class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/50">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pillars (CSCA page) -->
    <section v-if="service.pillars?.length" class="border-b border-ink/6 bg-[#F7FAF9] py-12 sm:py-14">
      <div class="site-container">
        <div class="text-center">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">Three focus areas</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">What we prepare you for</h2>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div
            v-for="(p, i) in service.pillars"
            :key="p.title"
            class="rounded-2xl bg-white p-6 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-lift"
          >
            <div class="flex items-center justify-between">
              <span
                class="flex h-12 w-12 items-center justify-center rounded-2xl text-[22px]"
                :style="{ background: service.bg, color: service.color }"
              >
                <i class="ti" :class="p.icon"></i>
              </span>
              <span class="font-display text-sm font-extrabold text-crimson">0{{ i + 1 }}</span>
            </div>
            <h3 class="mt-5 font-display text-lg font-bold text-ink">{{ p.title }}</h3>
            <p class="mt-2 text-[13.5px] leading-relaxed text-ink/50">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Includes + steps -->
    <section class="py-12 sm:py-16">
      <div class="site-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">What's included</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">Support built for BD students</h2>
          <ul class="mt-6 space-y-3">
            <li
              v-for="item in service.includes || []"
              :key="item"
              class="flex items-start gap-3 rounded-2xl bg-[#F7F8FA] px-4 py-3.5"
            >
              <span
                class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-white"
                :style="{ background: service.color }"
              >
                <i class="ti ti-check text-[14px]"></i>
              </span>
              <span class="text-[14px] font-medium text-ink/80">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">How it works</div>
          <h2 class="mt-2 font-display text-xl font-extrabold sm:text-2xl">Simple 3-step process</h2>
          <div class="mt-6 space-y-5">
            <div v-for="(step, i) in service.steps || []" :key="step.title" class="flex gap-4">
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-[13px] font-bold"
                :style="{ background: service.color }"
              >
                {{ i + 1 }}
              </div>
              <div>
                <div class="font-display text-[15px] font-bold">{{ step.title }}</div>
                <p class="mt-1 text-[13px] leading-relaxed text-white/55">{{ step.desc }}</p>
              </div>
            </div>
          </div>
          <a
            :href="WHATSAPP"
            target="_blank"
            rel="noopener"
            class="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3.5 text-[13px] font-semibold text-white hover:brightness-110"
          >
            Start preparation on WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="border-y border-ink/6 bg-[#F7F8FA] py-12 sm:py-14">
      <div class="site-container max-w-3xl">
        <h2 class="text-center font-display text-2xl font-extrabold text-ink">Frequently asked</h2>
        <div class="mt-6 space-y-2.5">
          <FaqItem v-for="faq in relatedFaqs" :key="faq.q" :q="faq.q" :a="faq.a" />
        </div>
      </div>
    </section>

    <!-- Other services -->
    <section class="py-12 sm:py-14">
      <div class="site-container">
        <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 class="font-display text-xl font-extrabold text-ink sm:text-2xl">More services</h2>
          <RouterLink to="/services" class="text-[13px] font-semibold text-crimson">View all →</RouterLink>
        </div>
        <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="s in otherServices"
            :key="s.slug"
            :to="`/service/${s.slug}`"
            class="group rounded-2xl bg-white p-5 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-lift hover:ring-crimson/20"
          >
            <span
              class="flex h-11 w-11 items-center justify-center rounded-xl text-[20px]"
              :style="{ background: s.bg, color: s.color }"
            >
              <i class="ti" :class="s.icon"></i>
            </span>
            <h3 class="mt-4 font-display text-[15px] font-bold text-ink group-hover:text-crimson">{{ s.name }}</h3>
            <p class="mt-1.5 text-[12.5px] leading-relaxed text-ink/50">{{ s.short }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="font-display text-2xl font-extrabold text-ink">Service not found</h1>
    <RouterLink to="/services" class="mt-4 inline-block text-[13px] font-semibold text-crimson">View all services</RouterLink>
  </div>
</template>
