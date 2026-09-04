<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { DEGREES, SCHOLARSHIP_META } from '../../data/site.js'
import scholarships from '../../data/scholarships.json'

const gpa = ref('')
const degree = ref('')
const checked = ref(false)

const matched = computed(() => {
  if (!checked.value) return []
  const score = parseFloat(gpa.value) || 0
  return scholarships.filter((sch) => {
    const meta = SCHOLARSHIP_META[sch.slug]
    if (!meta) return true
    if (meta.coverage === 'Full' && score < 3.0) return false
    if (meta.coverage === 'Partial' && score < 2.5) return false
    return true
  })
})

function check() {
  if (gpa.value && degree.value) checked.value = true
}

const degreeLabel = computed(() => DEGREES.find((d) => d.slug === degree.value)?.name || 'Not selected')

const profileNote = computed(() => {
  const score = parseFloat(gpa.value) || 0
  if (!score) return 'Enter your GPA to see your funding route.'
  if (score >= 4.5) return 'Strong academic profile with excellent scholarship potential.'
  if (score >= 3.5) return 'Competitive profile for many scholarship routes.'
  if (score >= 3.0) return 'Possible fit for several partial and university-based options.'
  return 'You may still find options, but profile strategy matters more.'
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#132746] to-[#1f4b67] text-white">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-25"></div>
      <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

      <div class="relative site-container py-12 sm:py-14 lg:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            <i class="ti ti-award text-[14px]"></i>
            Free tool
          </div>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
            Check your scholarship options in minutes.
          </h1>
          <p class="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60">
            Enter your GPA and degree level to see which scholarship routes may fit your profile before you shortlist universities.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3 text-[12px] text-white/55">
          <span class="rounded-full bg-white/10 px-3 py-1">GPA-based preview</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Full + partial awards</span>
          <span class="rounded-full bg-white/10 px-3 py-1">BD student friendly</span>
        </div>
      </div>
    </section>

    <section class="site-container py-10 sm:py-12 lg:py-14">
      <div class="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <aside class="rounded-[1.75rem] bg-ink p-6 text-white sm:p-8">
          <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Scholarship profile</div>
          <h2 class="mt-2 font-display text-2xl font-extrabold sm:text-3xl">See your likely routes.</h2>
          <p class="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/55">
            This quick checker gives you a fast funding view before you apply, so you can plan the right universities and expectations.
          </p>

          <div class="mt-7 space-y-3">
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">GPA / CGPA</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ gpa || 'Not entered' }}</div>
            </div>
            <div class="rounded-2xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">Degree level</div>
              <div class="mt-1 text-[13px] font-semibold text-white">{{ degreeLabel }}</div>
            </div>
            <div class="rounded-[1.35rem] bg-white px-4 py-4 text-ink shadow-soft">
              <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-jade">Profile note</div>
              <div class="mt-2 text-[13px] leading-relaxed text-ink/75">{{ profileNote }}</div>
            </div>
          </div>
        </aside>

        <div class="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/8 sm:p-8">
          <div class="flex flex-col gap-2 border-b border-ink/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Eligibility checker</div>
              <h2 class="mt-2 font-display text-2xl font-extrabold text-ink">Enter your academic profile</h2>
            </div>
            <div class="rounded-full bg-[#F7F8FA] px-4 py-2 text-[12px] font-medium text-ink/50 ring-1 ring-ink/6">
              Fast preview only
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div>
              <label class="block text-[12px] font-semibold text-ink/55">Your GPA / CGPA (out of 4 or 5)</label>
              <input
                v-model="gpa"
                type="number"
                step="0.01"
                min="0"
                max="5"
                placeholder="e.g. 3.50"
                class="mt-2 w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] text-ink outline-none transition focus:border-jade focus:bg-white"
              />
            </div>
            <div>
              <label class="block text-[12px] font-semibold text-ink/55">Degree level</label>
              <select
                v-model="degree"
                class="mt-2 w-full rounded-2xl border border-ink/10 bg-[#F7F8FA] px-4 py-3 text-[14px] text-ink outline-none transition focus:border-jade focus:bg-white"
              >
                <option value="">Select degree…</option>
                <option v-for="deg in DEGREES" :key="deg.slug" :value="deg.slug">{{ deg.name }}</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            class="mt-6 w-full rounded-xl bg-crimson py-3 text-[14px] font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
            :disabled="!gpa || !degree"
            @click="check"
          >
            Check scholarships
          </button>
        </div>
      </div>

      <div v-if="checked" class="mt-8 space-y-6">
        <div class="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/8">
          <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div class="inline-flex items-center gap-2 rounded-full bg-jade/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">
                <i class="ti ti-sparkles text-[14px]"></i>
                Results ready
              </div>
              <h2 class="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {{ matched.length }} matching scholarship{{ matched.length !== 1 ? 's' : '' }}
              </h2>
              <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink/50">
                Based on <span class="font-semibold text-ink">{{ gpa }}</span> GPA and <span class="font-semibold text-ink">{{ degreeLabel }}</span>.
              </p>
            </div>

            <button
              type="button"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 px-5 py-3 text-[13px] font-semibold text-ink transition hover:bg-[#F7F8FA] sm:w-auto"
              @click="checked = false"
            >
              <i class="ti ti-edit"></i>
              Edit inputs
            </button>
          </div>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <RouterLink
            v-for="sch in matched"
            :key="sch.slug"
            :to="`/scholarship/${sch.slug}`"
            class="group block rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/8 transition duration-300 hover:-translate-y-1 hover:shadow-soft hover:ring-crimson/20 sm:p-6"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">Scholarship option</div>
                <h3 class="mt-2 font-display text-[1.05rem] font-bold leading-snug text-ink group-hover:text-crimson">{{ sch.name }}</h3>
              </div>
              <span
                v-if="SCHOLARSHIP_META[sch.slug]"
                class="shrink-0 rounded-full bg-ink px-3 py-1 text-[10px] font-bold text-white"
              >
                {{ SCHOLARSHIP_META[sch.slug].coverage }}
              </span>
            </div>
            <p v-if="SCHOLARSHIP_META[sch.slug]" class="mt-3 text-[13px] leading-relaxed text-ink/50">
              {{ SCHOLARSHIP_META[sch.slug].desc }}
            </p>
            <div class="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-crimson">
              View scholarship
              <i class="ti ti-arrow-right transition group-hover:translate-x-0.5"></i>
            </div>
          </RouterLink>
        </div>

        <div class="flex flex-col items-center justify-between gap-4 rounded-[1.75rem] bg-ink px-6 py-7 text-white sm:flex-row sm:px-8">
          <div class="text-center sm:text-left">
            <div class="font-display text-xl font-extrabold">Want a stronger scholarship plan?</div>
            <p class="mt-1 text-[13px] text-white/55">We can help shortlist universities where your profile has better funding chances.</p>
          </div>
          <RouterLink
            to="/contact"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-crimson px-6 py-3 text-[13px] font-semibold text-white transition hover:brightness-110 sm:w-auto"
          >
            Talk to a counsellor
            <i class="ti ti-arrow-right"></i>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
