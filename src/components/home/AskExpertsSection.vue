<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'
const { whatsapp: WHATSAPP, phone: PHONE } = useSiteSettings()
const { sections } = useHomeBootstrap()

const ask = computed(() => sections.value?.ask_experts || {})
const quickQuestions = computed(() => ask.value.quick_questions || [])
const experts = computed(() => ask.value.experts || [])

const question = ref('')
const name = ref('')
const phone = ref('')
const sent = ref(false)

function useQuick(q) {
  question.value = q
}

function submit() {
  if (!question.value.trim()) return
  sent.value = true
  const text = encodeURIComponent(
    `Hello AR Education,\n\nName: ${name.value || '—'}\nPhone: ${phone.value || '—'}\n\nQuestion:\n${question.value}`,
  )
  window.open(`${WHATSAPP.value}?text=${text}`, '_blank', 'noopener')
  setTimeout(() => {
    sent.value = false
  }, 4000)
}
</script>

<template>
  <section v-if="ask.title" class="py-14 sm:py-16 lg:py-20">
    <div class="site-container">
      <div class="relative overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/8 lg:rounded-[2.5rem]">
        <div class="absolute inset-y-0 left-0 hidden w-[42%] bg-[#0B172A] lg:block"></div>
        <div class="absolute left-[42%] top-0 hidden h-full w-24 -translate-x-1/2 bg-[linear-gradient(135deg,rgba(11,23,42,1)_0%,rgba(11,23,42,1)_45%,rgba(255,255,255,0)_100%)] lg:block"></div>

        <div class="relative grid lg:grid-cols-[0.9fr_1.1fr]">
          <div class="bg-[#0B172A] px-6 py-8 text-white sm:px-8 lg:bg-transparent lg:px-10 lg:py-10">
            <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
              <span class="h-2 w-2 rounded-full bg-jade"></span>
              {{ ask.eyebrow }}
            </div>

            <h2 class="mt-5 max-w-sm font-display text-[1.8rem] font-extrabold leading-tight tracking-tight sm:text-3xl">
              {{ ask.title }}
            </h2>
            <p class="mt-4 max-w-sm text-[14px] leading-relaxed text-white/58">
              {{ ask.subtitle }}
            </p>

            <div v-if="quickQuestions[0]" class="mt-8 space-y-3">
              <div class="max-w-[270px] rounded-[1.4rem] rounded-tl-md bg-white/8 px-4 py-3 ring-1 ring-white/10">
                <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">Student</div>
                <div class="mt-1 text-[13px] leading-relaxed text-white/85">{{ quickQuestions[0] }}</div>
              </div>
              <div class="max-w-[250px] rounded-[1.4rem] rounded-tl-md bg-crimson px-4 py-3 text-white shadow-soft">
                <div class="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Fast support</div>
                <div class="mt-1 text-[13px] leading-relaxed">Ask once, get a practical answer in Bangla.</div>
              </div>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div
                v-for="ex in experts"
                :key="ex.initials"
                class="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-3 py-3"
              >
                <span
                  class="flex h-11 w-11 items-center justify-center rounded-2xl text-[12px] font-bold text-white"
                  :style="{ background: ex.color }"
                >
                  {{ ex.initials }}
                </span>
                <span>
                  <span class="block text-[13px] font-semibold text-white">{{ ex.name }}</span>
                  <span class="block text-[11px] text-white/45">{{ ex.role }}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Ask any question</div>
                <h3 class="mt-2 font-display text-2xl font-extrabold text-ink sm:text-[2rem]">Get your answer on WhatsApp</h3>
              </div>
              <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[12px] font-medium text-ink/50 ring-1 ring-ink/6">
                No appointment needed
              </div>
            </div>

            <div class="mt-6 rounded-[1.75rem] bg-[#FCFAF6] p-4 ring-1 ring-[#EFE7DA] sm:p-5">
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-ink/35">Quick prompts</div>
              <div class="mt-3 flex flex-wrap gap-2.5">
                <button
                  v-for="q in quickQuestions"
                  :key="q"
                  type="button"
                  class="rounded-full border border-ink/10 bg-white px-3.5 py-2 text-left text-[12.5px] text-ink/70 transition hover:border-jade/30 hover:bg-jade/5 hover:text-ink"
                  @click="useQuick(q)"
                >
                  {{ q }}
                </button>
              </div>
            </div>

            <form class="mt-5 space-y-4" @submit.prevent="submit">
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block">
                  <span class="mb-2 block text-[12px] font-semibold text-ink/55">Your name</span>
                  <input
                    v-model="name"
                    type="text"
                    placeholder="Enter your name"
                    class="w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] outline-none transition focus:border-jade focus:bg-white"
                  />
                </label>
                <label class="block">
                  <span class="mb-2 block text-[12px] font-semibold text-ink/55">WhatsApp number</span>
                  <input
                    v-model="phone"
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    class="w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] outline-none transition focus:border-jade focus:bg-white"
                  />
                </label>
              </div>

              <label class="block">
                <span class="mb-2 block text-[12px] font-semibold text-ink/55">Your question</span>
                <textarea
                  v-model="question"
                  rows="6"
                  placeholder="Ask about scholarships, tuition, admission documents, medical, visa or university choice..."
                  class="w-full resize-none rounded-[1.5rem] border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] outline-none transition focus:border-jade focus:bg-white"
                  required
                />
              </label>

              <div class="flex flex-col gap-4 border-t border-ink/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex flex-wrap items-center gap-3 text-[12.5px] text-ink/45">
                  <a :href="WHATSAPP" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 font-semibold text-jade hover:underline">
                    <i class="ti ti-brand-whatsapp"></i> Chat now
                  </a>
                  <a :href="`tel:${PHONE}`" class="inline-flex items-center gap-1.5 hover:text-ink">
                    <i class="ti ti-phone"></i> {{ PHONE }}
                  </a>
                  <RouterLink to="/contact" class="hover:text-ink">Contact page →</RouterLink>
                </div>

                <button
                  type="submit"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-crimson px-6 py-3.5 text-[14px] font-semibold text-white transition hover:brightness-110 sm:w-auto"
                >
                  <i class="ti ti-brand-whatsapp text-[18px]"></i>
                  {{ sent ? 'Opening WhatsApp…' : 'Ask our experts' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
