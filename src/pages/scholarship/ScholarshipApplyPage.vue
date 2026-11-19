<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { fetchEducationLevels, fetchScholarshipBySlug } from '../../api/scholarships.js'
import { submitInquiry } from '../../api/universities.js'

const route = useRoute()
const loading = ref(true)
const program = ref(null)
const error = ref('')
const educationLevels = ref([])
const submitted = ref(false)
const submitting = ref(false)
const trackingId = ref('')

const facts = computed(() => {
  const p = program.value
  if (!p) return []
  return [
    { label: 'Program ID', value: p.programId || '-' },
    { label: 'City', value: p.city || '-' },
    { label: 'Degree', value: p.degree || '-' },
    { label: 'Language', value: p.teachingLanguage || '-' },
    { label: 'Intake', value: p.intake || '-' },
    { label: 'Scholarship', value: p.scholarshipType || p.coverage || '-' },
    { label: 'Deadline', value: p.deadline || '-' },
  ]
})

const form = ref({
  givenName: '',
  familyName: '',
  gender: '',
  birthday: '',
  email: '',
  mobile: '',
  passport: '',
  nationality: 'Bangladesh',
  lastEducation: '',
  result: '',
  passingYear: '',
  note: '',
})

onMounted(async () => {
  try {
    const result = await fetchScholarshipBySlug(route.params.slug)
    program.value = result.scholarship
    if (!result.scholarship) error.value = 'Program not found'
    educationLevels.value = await fetchEducationLevels()
  } catch (e) {
    error.value = e.message || 'Could not load this program'
  } finally {
    loading.value = false
  }
})

async function onSubmit() {
  if (!program.value) return
  error.value = ''
  submitting.value = true
  try {
    const p = program.value
    const message = [
      'Scholarship application',
      `Program: ${p.name}`,
      p.programId ? `Program ID: ${p.programId}` : '',
      p.city ? `City: ${p.city}` : '',
      p.degree ? `Degree: ${p.degree}` : '',
      p.teachingLanguage ? `Language: ${p.teachingLanguage}` : '',
      p.intake ? `Intake: ${p.intake}` : '',
      p.scholarshipType ? `Type: ${p.scholarshipType}` : '',
      `Gender: ${form.value.gender || '-'}`,
      `Birthday: ${form.value.birthday || '-'}`,
      `Passport: ${form.value.passport || '-'}`,
      `Passing year: ${form.value.passingYear || '-'}`,
      form.value.note ? `Note: ${form.value.note}` : '',
    ].filter(Boolean).join('\n')

    const result = await submitInquiry({
      first_name: form.value.givenName,
      last_name: form.value.familyName || null,
      email: form.value.email,
      mobile_no: form.value.mobile,
      country: form.value.nationality,
      country_preferred: 'China',
      course: p.name,
      last_education: form.value.lastEducation || null,
      message,
      type: 'From Web - Scholarship Apply',
    })
    trackingId.value = result?.data?.inquiry?.tracking_id || ''
    submitted.value = true
  } catch (e) {
    error.value = e.message || 'Could not submit application'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[70vh] bg-[#F4F6F8] pb-12 pt-6 sm:pb-16 sm:pt-8">
    <div class="site-container max-w-3xl">
      <RouterLink
        to="/scholarships"
        class="inline-flex items-center gap-1.5 text-[13px] font-semibold text-crimson hover:underline"
      >
        <i class="ti ti-arrow-left text-[14px]"></i>
        Back to programs
      </RouterLink>

      <div v-if="loading" class="mt-4 h-[420px] animate-pulse rounded-[1.5rem] bg-white ring-1 ring-ink/8 sm:h-[520px]"></div>

      <div
        v-else-if="!program"
        class="mt-4 rounded-[1.5rem] bg-white px-6 py-14 text-center text-[14px] text-ink/50 ring-1 ring-ink/8"
      >
        {{ error || 'Program not found' }}
      </div>

      <div v-else class="mt-4 overflow-hidden rounded-[1.5rem] bg-white shadow-lift ring-1 ring-ink/8 sm:rounded-[1.75rem]">
        <header class="border-b border-ink/6 bg-gradient-to-b from-[#FBFAF7] to-white px-5 py-6 sm:px-8 sm:py-7">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-crimson">Scholarship application</p>
          <h1 class="mt-2 font-display text-[1.55rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.9rem]">
            Fill in student info
          </h1>
          <p class="mt-2 text-[13.5px] leading-relaxed text-ink/50 sm:text-[14px]">{{ program.name }}</p>
        </header>

        <div class="grid grid-cols-2 gap-2 px-4 py-4 sm:grid-cols-3 sm:gap-3 sm:px-8 sm:py-5 lg:grid-cols-4">
          <div
            v-for="item in facts"
            :key="item.label"
            class="rounded-xl bg-[#F8F9FB] px-3 py-2.5 sm:rounded-[0.9rem] sm:px-3.5 sm:py-3"
          >
            <span class="block text-[10px] font-medium text-ink/40 sm:text-[11px]">{{ item.label }}</span>
            <strong class="mt-0.5 block text-[12.5px] font-semibold text-ink sm:text-[13px]">{{ item.value }}</strong>
          </div>
        </div>

        <div v-if="submitted" class="px-5 py-12 text-center sm:px-8 sm:py-16">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-jade/15 text-jade">
            <i class="ti ti-check text-xl"></i>
          </div>
          <h2 class="mt-4 font-display text-xl font-extrabold text-ink sm:text-2xl">Application received</h2>
          <p class="mt-2 text-[14px] text-ink/50">A counsellor will contact you about this program.</p>
          <p v-if="trackingId" class="mt-3 text-[13px] font-bold text-crimson">Tracking ID {{ trackingId }}</p>
        </div>

        <form v-else class="space-y-7 px-4 pb-6 pt-2 sm:space-y-8 sm:px-8 sm:pb-8" @submit.prevent="onSubmit">
          <section>
            <h2 class="mb-3 border-b border-ink/8 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45 sm:mb-4">
              Personal
            </h2>
            <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Given name *
                <input v-model="form.givenName" required class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Family name
                <input v-model="form.familyName" class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Gender
                <select v-model="form.gender" class="field">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Date of birth
                <input v-model="form.birthday" type="date" class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Passport number
                <input v-model="form.passport" class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Nationality
                <input v-model="form.nationality" class="field" />
              </label>
            </div>
          </section>

          <section>
            <h2 class="mb-3 border-b border-ink/8 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45 sm:mb-4">
              Contact
            </h2>
            <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Email *
                <input v-model="form.email" type="email" required class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Mobile *
                <input v-model="form.mobile" required placeholder="01XXXXXXXXX" class="field" />
              </label>
            </div>
          </section>

          <section>
            <h2 class="mb-3 border-b border-ink/8 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink/45 sm:mb-4">
              Education
            </h2>
            <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Last education
                <select v-model="form.lastEducation" class="field">
                  <option value="">Select last education</option>
                  <option v-for="level in educationLevels" :key="level" :value="level">{{ level }}</option>
                </select>
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Result
                <input v-model="form.result" placeholder="GPA" class="field" />
              </label>
              <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
                Passing year
                <input v-model="form.passingYear" placeholder="2024" class="field" />
              </label>
            </div>
          </section>

          <label class="flex flex-col gap-1.5 text-[12px] font-semibold text-ink/60">
            Additional note
            <textarea v-model="form.note" rows="3" class="field"></textarea>
          </label>

          <p v-if="error" class="text-[13px] font-medium text-crimson">{{ error }}</p>

          <div class="flex flex-col-reverse gap-3 border-t border-ink/8 pt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
            <RouterLink
              to="/scholarships"
              class="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-[13px] font-semibold text-ink/50 hover:text-ink sm:w-auto"
            >
              Cancel
            </RouterLink>
            <button
              type="submit"
              :disabled="submitting"
              class="inline-flex w-full items-center justify-center rounded-xl bg-crimson px-6 py-3.5 text-[13.5px] font-semibold text-white transition hover:brightness-110 disabled:cursor-default disabled:opacity-60 sm:w-auto"
            >
              {{ submitting ? 'Submitting...' : 'Submit application' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(10, 22, 40, 0.12);
  border-radius: 0.75rem;
  background: #fcfcfd;
  color: #0a1628;
  padding: 0.7rem 0.8rem;
  font-size: 14px;
  font-weight: 500;
  outline: none;
}
.field:focus {
  border-color: #d61f26;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(214, 31, 38, 0.12);
}
</style>
