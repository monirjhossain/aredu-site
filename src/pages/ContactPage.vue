<script setup>
import { ref } from 'vue'
import { useSiteSettings } from '../composables/useSiteSettings.js'
import { submitInquiry } from '../api/universities.js'

const { whatsapp: WHATSAPP, phone: PHONE, email: EMAIL } = useSiteSettings()

const form = ref({
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
})

const interests = ['Bachelor', 'Master', 'PhD', 'MBBS / Medicine', 'Chinese Language', 'Scholarship', 'General enquiry']
const submitted = ref(false)
const submitting = ref(false)
const error = ref('')

const trustReasons = [
  'Free expert counselling',
  'Scholarship application support',
  'Full visa and pre-departure guidance',
]

async function onSubmit() {
  error.value = ''
  submitting.value = true
  try {
    const parts = String(form.value.name || '').trim().split(/\s+/)
    const firstName = parts[0] || form.value.name
    const lastName = parts.slice(1).join(' ')

    await submitInquiry({
      first_name: firstName,
      last_name: lastName || null,
      email: form.value.email || `${form.value.phone.replace(/\D/g, '') || 'guest'}@areducation.local`,
      mobile_no: form.value.phone,
      course: form.value.interest || null,
      message: form.value.message || null,
      type: 'From Web - Contact',
    })

    submitted.value = true
    form.value = { name: '', phone: '', email: '', interest: '', message: '' }
  } catch (e) {
    console.error(e)
    const apiErrors = e.data?.errors
    if (apiErrors) {
      error.value = Object.values(apiErrors).flat().join(' ')
    } else {
      error.value = e.message || 'Could not submit. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-crimson/20 blur-3xl"></div>
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <span class="h-1.5 w-1.5 rounded-full bg-jade"></span>
            Get in touch
          </div>
          <h1 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:mt-5 sm:text-4xl">
            Let's plan your study in China
          </h1>
          <p class="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/60 sm:mt-4 sm:text-[15px]">
            Free counselling in Bangla — university choice, scholarships, admission and the student visa.
          </p>
        </div>
      </div>
    </section>

    <section class="site-container py-8 sm:py-10 lg:py-12">
      <div class="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
        <div class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8 sm:rounded-[1.75rem] sm:p-7">
          <div class="font-display text-lg font-bold text-ink sm:text-xl">Send us a message</div>
          <p class="mt-1 text-[12.5px] text-ink/40">Saved to admin inquiries via API.</p>

          <div v-if="submitted" class="mt-4 rounded-xl bg-jade/10 px-4 py-3 text-[13px] font-medium text-jade">
            Message sent! We'll be in touch soon.
          </div>
          <div v-if="error" class="mt-4 rounded-xl bg-crimson/10 px-4 py-3 text-[13px] font-medium text-crimson">
            {{ error }}
          </div>

          <form class="mt-5 flex flex-col gap-3.5" @submit.prevent="onSubmit">
            <div class="flex flex-col gap-3.5 sm:flex-row">
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Full name"
                class="w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
              />
              <input
                v-model="form.phone"
                type="tel"
                required
                placeholder="Phone / WhatsApp"
                class="w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
              />
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email (optional)"
              class="w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            />
            <select
              v-model="form.interest"
              class="w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3.5 py-2.5 text-[13.5px] text-ink/70 outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            >
              <option value="">I'm interested in…</option>
              <option v-for="opt in interests" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Your message"
              class="w-full rounded-xl border border-ink/12 bg-[#FCFCFD] px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/15"
            ></textarea>
            <button type="submit" :disabled="submitting" class="btn-primary w-full disabled:opacity-60">
              {{ submitting ? 'Sending...' : 'Send message' }}
            </button>
          </form>
        </div>

        <aside class="flex flex-col gap-3">
          <a
            :href="WHATSAPP"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-3 rounded-[1.25rem] bg-[#16A34A] p-4 text-white transition hover:brightness-110 sm:p-5"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <i class="ti ti-brand-whatsapp text-[20px]"></i>
            </span>
            <div>
              <div class="text-[14px] font-bold">WhatsApp us</div>
              <div class="text-[11px] text-white/75">Fastest reply</div>
            </div>
          </a>
          <a
            :href="`tel:${PHONE}`"
            class="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/8 sm:p-5"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/10 text-crimson">
              <i class="ti ti-phone text-[18px]"></i>
            </span>
            <div>
              <div class="text-[14px] font-bold text-ink">Call us</div>
              <div class="text-[11px] text-ink/40">{{ PHONE }}</div>
            </div>
          </a>
          <a
            :href="`mailto:${EMAIL}`"
            class="flex items-center gap-3 rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/8 sm:p-5"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 text-ink">
              <i class="ti ti-mail text-[18px]"></i>
            </span>
            <div>
              <div class="text-[14px] font-bold text-ink">Email</div>
              <div class="text-[11px] text-ink/40">{{ EMAIL }}</div>
            </div>
          </a>
          <div class="rounded-[1.25rem] bg-[#FBFAF7] p-4 ring-1 ring-ink/8 sm:p-5">
            <div class="text-[12px] font-bold text-ink">Why students trust us</div>
            <ul class="mt-3 space-y-2">
              <li v-for="item in trustReasons" :key="item" class="flex items-start gap-2 text-[12.5px] text-ink/55">
                <i class="ti ti-check text-[14px] text-crimson"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
