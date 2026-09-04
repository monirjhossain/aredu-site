<script setup>
import { RouterLink } from 'vue-router'
import { SERVICES, FAQS, WHATSAPP } from '../data/site.js'
import FaqItem from '../components/ui/FaqItem.vue'

const howWeWork = [
  { step: 1, title: 'Free consultation', desc: 'Tell us your background, budget and goals — we shortlist universities and scholarships.' },
  { step: 2, title: 'Document preparation', desc: 'We prepare your complete application file and submit to your chosen universities.' },
  { step: 3, title: 'Admission & visa', desc: 'Once admitted, we guide you through JW202, medical check and the X1/X2 student visa.' },
  { step: 4, title: 'Pre-departure', desc: 'Airport pickup coordination, settling-in tips and ongoing support after you land.' },
]

const serviceFaqs = FAQS.slice(0, 4)
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
              <i class="ti ti-briefcase text-[14px]"></i>
              Our services
            </div>
            <h1 class="mt-5 max-w-3xl font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
              End-to-end support from Dhaka to China.
            </h1>
            <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
              From university application and scholarships to visa and pre-departure — AR Education guides every step in Bangla.
            </p>
            <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RouterLink to="/contact" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-ink hover:bg-sand sm:w-auto">
                Talk to a counsellor
              </RouterLink>
              <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110 sm:w-auto">
                <i class="ti ti-brand-whatsapp"></i>
                WhatsApp us
              </a>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <div class="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-2xl font-extrabold">5+</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Years</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-2xl font-extrabold">2000+</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Students</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-2xl font-extrabold">5</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Core services</div>
            </div>
            <div class="rounded-2xl bg-white/10 p-5 text-center ring-1 ring-white/10 backdrop-blur">
              <div class="font-display text-2xl font-extrabold">Free</div>
              <div class="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/45">Counselling</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-12 lg:py-14">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <RouterLink
          v-for="(svc, i) in SERVICES"
          :key="svc.slug"
          :to="`/service/${svc.slug}`"
          class="group relative overflow-hidden rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift hover:ring-crimson/20"
        >
          <div class="absolute right-4 top-4 font-display text-sm font-extrabold text-ink/15">0{{ i + 1 }}</div>
          <span
            class="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
            :style="{ background: svc.bg, color: svc.color }"
          >
            <i class="ti text-[22px]" :class="svc.icon"></i>
          </span>
          <h2 class="mt-5 font-display text-[16px] font-bold leading-snug text-ink group-hover:text-crimson">{{ svc.name }}</h2>
          <p class="mt-2 text-[13px] leading-relaxed text-ink/50">{{ svc.short }}</p>
          <div class="mt-5 flex items-center gap-2 text-[12px] font-semibold text-crimson">
            Learn more
            <i class="ti ti-arrow-right transition group-hover:translate-x-0.5"></i>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="border-y border-ink/6 bg-[#F7FAF9] py-12 sm:py-14 lg:py-16">
      <div class="site-container">
        <div class="mb-8 max-w-2xl">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-jade">How we work</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">A clear process, step by step.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="item in howWeWork"
            :key="item.step"
            class="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/8 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div class="flex items-center justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-crimson text-[14px] font-extrabold text-white">
                {{ item.step }}
              </div>
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/25">Step</div>
            </div>
            <h3 class="mt-4 font-display text-[16px] font-bold text-ink">{{ item.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-ink/50">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="site-container py-12 sm:py-14">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Why students choose us</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold">Simple guidance, real support.</h2>
          <div class="mt-6 space-y-3">
            <div class="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">University shortlist based on budget and profile</div>
            <div class="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">Scholarship route checked before you apply</div>
            <div class="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">Visa and pre-departure support in Bangla</div>
          </div>
        </div>

        <div>
          <h2 class="font-display text-2xl font-extrabold text-ink sm:text-3xl">Common questions about our services</h2>
          <div class="mt-6 grid gap-2.5">
            <FaqItem v-for="faq in serviceFaqs" :key="faq.q" :q="faq.q" :a="faq.a" />
          </div>
        </div>
      </div>
    </section>

    <section class="site-container pb-12 sm:pb-16">
      <div class="flex flex-col items-center gap-4 rounded-[1.75rem] bg-[#FBF3E2] px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div>
          <h3 class="font-display text-xl font-extrabold text-ink">Ready to get started?</h3>
          <p class="mt-1 text-[13px] text-[#8A6A16]">Free counselling — we usually reply within a day.</p>
        </div>
        <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <RouterLink to="/contact" class="rounded-xl bg-crimson px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110">
            Contact us
          </RouterLink>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-110">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
