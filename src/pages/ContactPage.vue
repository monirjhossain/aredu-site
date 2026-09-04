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
  <div class="site-container py-10">
    <div class="relative overflow-hidden rounded-2xl px-6 py-9 sm:px-10 sm:py-12" style="background: var(--color-secondary)">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full" style="background: var(--color-primary); opacity: 0.16"></div>
      <div class="relative max-w-2xl">
        <span class="text-[10.5px] font-semibold uppercase tracking-widest" style="color: var(--color-accent)">Get in touch</span>
        <h1 class="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Let's plan your study in China</h1>
        <p class="mt-2.5 text-[13.5px] leading-relaxed" style="color: #aeb8c9">
          Free counselling in Bangla — university choice, scholarships, admission and the student visa.
        </p>
      </div>
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
      <div class="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div class="text-[16px] font-bold text-[var(--color-secondary)]">Send us a message</div>
        <div class="mb-4 mt-0.5 text-[12.5px] text-gray-400">Saved to admin inquiries via API.</div>
        <div v-if="submitted" class="mb-4 rounded-lg bg-green-50 px-4 py-3 text-[13px] text-green-700">
          Message sent! We'll be in touch soon.
        </div>
        <div v-if="error" class="mb-4 rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {{ error }}
        </div>
        <form class="flex flex-col gap-2.5" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2.5 sm:flex-row">
            <input v-model="form.name" type="text" required placeholder="Full name" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
            <input v-model="form.phone" type="tel" required placeholder="Phone / WhatsApp" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          </div>
          <input v-model="form.email" type="email" placeholder="Email (optional)" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
          <select v-model="form.interest" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] text-gray-600 focus:outline-none">
            <option value="">I'm interested in…</option>
            <option v-for="opt in interests" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <textarea v-model="form.message" rows="4" placeholder="Your message" class="w-full rounded-[9px] border border-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"></textarea>
          <button type="submit" :disabled="submitting" class="rounded-[10px] py-3 text-[13.5px] font-semibold text-white transition hover:opacity-90 disabled:opacity-60" style="background: var(--color-primary)">
            {{ submitting ? 'Sending...' : 'Send message' }}
          </button>
        </form>
      </div>

      <div class="flex flex-col gap-2.5">
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="flex items-center gap-3 rounded-xl bg-[#16A34A] p-4 text-white">
          <div><div class="text-[13.5px] font-bold">WhatsApp us</div><div class="text-[10.5px]" style="color: #dcfce7">Fastest reply</div></div>
        </a>
        <a :href="`tel:${PHONE}`" class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div><div class="text-[13px] font-bold text-[var(--color-secondary)]">Call us</div><div class="text-[10.5px] text-gray-400">{{ PHONE }}</div></div>
        </a>
        <a :href="`mailto:${EMAIL}`" class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div><div class="text-[13px] font-bold text-[var(--color-secondary)]">Email</div><div class="text-[10.5px] text-gray-400">{{ EMAIL }}</div></div>
        </a>
        <div class="rounded-xl border border-gray-200 bg-[#fbfbfc] p-4">
          <div class="text-[12px] font-bold text-[var(--color-secondary)]">Why students trust us</div>
          <ul class="mt-2 space-y-1.5">
            <li v-for="item in trustReasons" :key="item" class="text-[11.5px] text-gray-500">• {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
