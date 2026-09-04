<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { WHATSAPP, PHONE, EMAIL, ADDRESS } from '../data/site.js'

const form = ref({
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
})

const interests = ['Bachelor', 'Master', 'PhD', 'MBBS / Medicine', 'Chinese Language', 'Scholarship', 'General enquiry']
const submitted = ref(false)

const trustReasons = [
  'Free expert counselling',
  'Scholarship application support',
  'Full visa and pre-departure guidance',
]

function onSubmit() {
  submitted.value = true
  alert('Thank you! A counsellor will contact you within 24 hours.')
  form.value = { name: '', phone: '', email: '', interest: '', message: '' }
}
</script>

<template>
  <div class="site-container py-10">
    <!-- Dark hero -->
    <div class="relative overflow-hidden rounded-2xl px-6 py-9 sm:px-10 sm:py-12" style="background: var(--color-secondary)">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full" style="background: var(--color-primary); opacity: 0.16"></div>
      <div class="absolute -bottom-12 right-24 h-28 w-28 rounded-full" style="background: var(--color-accent); opacity: 0.14"></div>
      <div class="relative max-w-2xl">
        <span class="text-[10.5px] font-semibold uppercase tracking-widest" style="color: var(--color-accent)">Get in touch</span>
        <h1 class="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Let's plan your study in China</h1>
        <p class="mt-2.5 text-[13.5px] leading-relaxed" style="color: #aeb8c9">
          Free counselling in Bangla — university choice, scholarships, admission and the student visa.
        </p>
          <div class="mt-5 grid gap-4 sm:flex sm:flex-wrap sm:gap-6">
          <div><div class="text-xl font-extrabold text-white">2000+</div><div class="text-[11px]" style="color: #aeb8c9">Students guided</div></div>
          <div><div class="text-xl font-extrabold text-white">5++</div><div class="text-[11px]" style="color: #aeb8c9">Years experience</div></div>
          <div><div class="text-xl font-extrabold text-white">&lt; 24h</div><div class="text-[11px]" style="color: #aeb8c9">Typical reply</div></div>
        </div>
      </div>
    </div>

    <!-- Form + sidebar -->
    <div class="mt-6 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
      <div class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div class="text-[16px] font-bold text-[var(--color-secondary)]">Send us a message</div>
        <div class="mb-4 mt-0.5 text-[12.5px] text-gray-400">Free counselling — we usually reply within a day.</div>
        <div v-if="submitted" class="mb-4 rounded-lg bg-green-50 px-4 py-3 text-[13px] text-green-700">
          Message sent! We'll be in touch soon.
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2.5 sm:flex-row">
            <input v-model="form.name" type="text" required placeholder="Full name" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
            <input v-model="form.phone" type="tel" required placeholder="Phone / WhatsApp" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <input v-model="form.email" type="email" placeholder="Email" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          <select v-model="form.interest" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none">
            <option value="">I'm interested in…</option>
            <option v-for="opt in interests" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <textarea v-model="form.message" rows="4" placeholder="Your message" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"></textarea>
          <button type="submit" class="rounded-[10px] py-3 text-[13.5px] font-semibold text-white transition hover:opacity-90" style="background: var(--color-primary)">
            Send message
          </button>
        </form>
      </div>

      <div class="flex flex-col gap-2.5">
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl bg-[#16A34A] p-4 text-white">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 004.74 1.2c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0012.04 2Z"/></svg>
          <div><div class="text-[13.5px] font-bold">WhatsApp us</div><div class="text-[10.5px]" style="color: #dcfce7">Fastest reply</div></div>
        </a>
        <a :href="`tel:${PHONE}`" class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg" style="background: #fcebeb">
            <i class="ti ti-phone text-[18px]" style="color: var(--color-primary)"></i>
          </span>
          <div><div class="text-[13px] font-bold text-[var(--color-secondary)]">Call us</div><div class="text-[10.5px] text-gray-400">{{ PHONE }}</div></div>
        </a>
        <a :href="`mailto:${EMAIL}`" class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <span class="flex h-9 w-9 items-center justify-center rounded-lg" style="background: #fcebeb">
            <i class="ti ti-mail text-[18px]" style="color: var(--color-primary)"></i>
          </span>
          <div><div class="text-[13px] font-bold text-[var(--color-secondary)]">Email</div><div class="text-[10.5px] text-gray-400">{{ EMAIL }}</div></div>
        </a>
        <div class="rounded-xl border border-gray-200 bg-[#fbfbfc] p-4">
          <div class="text-[12px] font-bold text-[var(--color-secondary)]">What happens next</div>
          <ol class="mt-2 flex flex-col gap-2">
            <li v-for="(step, i) in ['We review your details and shortlist options.', 'A counsellor calls or messages you in Bangla.', 'We plan admission, scholarship and visa together.']" :key="i" class="flex gap-2.5 text-[11.5px] text-gray-500">
              <span class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style="background: var(--color-primary)">{{ i + 1 }}</span>
              {{ step }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- Trust -->
    <div class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Why students contact us</h2>
      <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <div v-for="reason in trustReasons" :key="reason" class="rounded-2xl border border-gray-200 bg-white p-5">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl" style="background: #fcebeb">
            <svg class="h-5 w-5" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div class="mt-3 text-[14px] font-bold text-[var(--color-secondary)]">{{ reason }}</div>
        </div>
      </div>
    </div>

    <!-- Office -->
    <div class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Visit our office</h2>
      <div class="mt-4 grid overflow-hidden rounded-2xl border border-gray-200 lg:grid-cols-2">
        <div class="p-6 sm:p-8">
          <div class="inline-block rounded-full px-3 py-1 text-[11px] font-semibold" style="background: #fcebeb; color: var(--color-primary)">Dhaka Head Office</div>
          <div class="mt-4 flex flex-col gap-3 text-[13px] text-gray-600">
            <div class="flex items-start gap-3">
              <i class="ti ti-map-pin mt-0.5 text-[20px]" style="color: var(--color-primary)"></i>
              <span><span class="block font-semibold text-[var(--color-secondary)]">Address</span>{{ ADDRESS }}</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="ti ti-clock mt-0.5 text-[20px]" style="color: var(--color-primary)"></i>
              <span><span class="block font-semibold text-[var(--color-secondary)]">Opening hours</span>Sat–Thu (10:00 AM to 06:00 PM)</span>
            </div>
            <div class="flex items-start gap-3">
              <i class="ti ti-phone mt-0.5 text-[20px]" style="color: var(--color-primary)"></i>
              <span><span class="block font-semibold text-[var(--color-secondary)]">Phone</span>{{ PHONE }}</span>
            </div>
          </div>
          <div class="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-4 py-2.5 text-center text-[12.5px] font-semibold text-white">WhatsApp</a>
            <a :href="`tel:${PHONE}`" class="rounded-xl border border-gray-200 px-4 py-2.5 text-center text-[12.5px] font-semibold text-[var(--color-secondary)]">Call office</a>
          </div>
        </div>
        <div class="flex min-h-[240px] items-center justify-center bg-gray-100">
          <div class="text-center text-gray-400">
            <i class="ti ti-map-2 text-[48px]"></i>
            <p class="mt-2 text-[13px]">Map placeholder — Tropical Tower, Bata Signal, Elephant Road, Dhaka</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mt-10 flex flex-col items-center gap-4 rounded-2xl px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left" style="background: #fbf3e2">
      <div>
        <div class="text-lg font-extrabold text-[var(--color-secondary)]">Prefer a quick match instead?</div>
        <p class="mt-1 text-[13px] text-[#8A6A16]">Answer a few questions and get ranked university matches.</p>
      </div>
      <RouterLink to="/tools/find-university" class="w-full rounded-xl px-6 py-3.5 text-[13.5px] font-semibold text-white sm:w-auto sm:shrink-0" style="background: var(--color-primary)">
        Find my university →
      </RouterLink>
    </div>
  </div>
</template>
