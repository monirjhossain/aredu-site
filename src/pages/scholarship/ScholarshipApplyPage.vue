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
  <div class="apply-page">
    <div class="apply-wrap">
      <RouterLink to="/scholarships" class="back-link">Back to programs</RouterLink>

      <div v-if="loading" class="sheet skeleton" />

      <div v-else-if="!program" class="sheet empty">{{ error || 'Program not found' }}</div>

      <div v-else class="sheet">
        <header class="hero">
          <div>
            <p class="eyebrow">Scholarship application</p>
            <h1>Fill in student info</h1>
            <p class="program-name">{{ program.name }}</p>
          </div>
        </header>

        <div class="facts">
          <div v-for="item in facts" :key="item.label" class="fact">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>

        <div v-if="submitted" class="done">
          <h2>Application received</h2>
          <p>A counsellor will contact you about this program.</p>
          <p v-if="trackingId" class="track">Tracking ID {{ trackingId }}</p>
        </div>

        <form v-else @submit.prevent="onSubmit">
          <section>
            <h2>Personal</h2>
            <div class="grid">
              <label>Given name *<input v-model="form.givenName" required /></label>
              <label>Family name<input v-model="form.familyName" /></label>
              <label>Gender
                <select v-model="form.gender">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label>Date of birth<input v-model="form.birthday" type="date" /></label>
              <label>Passport number<input v-model="form.passport" /></label>
              <label>Nationality<input v-model="form.nationality" /></label>
            </div>
          </section>

          <section>
            <h2>Contact</h2>
            <div class="grid">
              <label>Email *<input v-model="form.email" type="email" required /></label>
              <label>Mobile *<input v-model="form.mobile" required placeholder="01XXXXXXXXX" /></label>
            </div>
          </section>

          <section>
            <h2>Education</h2>
            <div class="grid three">
              <label>Last education
                <select v-model="form.lastEducation">
                  <option value="">Select last education</option>
                  <option v-for="level in educationLevels" :key="level" :value="level">{{ level }}</option>
                </select>
              </label>
              <label>Result<input v-model="form.result" placeholder="GPA" /></label>
              <label>Passing year<input v-model="form.passingYear" placeholder="2024" /></label>
            </div>
          </section>

          <label class="note">Additional note<textarea v-model="form.note" rows="3"></textarea></label>

          <p v-if="error" class="error">{{ error }}</p>

          <div class="actions">
            <RouterLink to="/scholarships">Cancel</RouterLink>
            <button type="submit" :disabled="submitting">{{ submitting ? 'Submitting...' : 'Submit application' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apply-page {
  min-height: 70vh;
  background:
    radial-gradient(900px 280px at 10% -10%, rgba(124, 58, 237, 0.16), transparent 60%),
    linear-gradient(180deg, #f3f0ff 0%, #f7f8fa 220px);
  padding: 28px 16px 48px;
}
.apply-wrap { max-width: 860px; margin: 0 auto; }
.back-link { color: #6d28d9; font-size: 13px; font-weight: 600; text-decoration: none; }
.sheet {
  margin-top: 14px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 24px 60px -36px rgba(76, 29, 149, 0.45);
  overflow: hidden;
}
.skeleton { height: 520px; }
.empty { padding: 48px; text-align: center; color: #6b7280; }
.hero {
  padding: 28px 28px 8px;
  background: linear-gradient(180deg, #faf8ff 0%, #fff 100%);
}
.eyebrow {
  margin: 0;
  color: #7c3aed;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
h1 { margin: 8px 0 0; font-size: 32px; line-height: 1.1; color: #111827; }
.program-name { margin: 8px 0 0; color: #6b7280; font-size: 14px; }
.facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 8px 28px 22px;
}
.fact {
  background: #f8f5ff;
  border-radius: 12px;
  padding: 10px 12px;
}
.fact span { display: block; color: #8b87a0; font-size: 11px; }
.fact strong { display: block; margin-top: 2px; color: #1f1633; font-size: 13px; }
form { padding: 8px 28px 28px; }
section + section { margin-top: 22px; }
h2 {
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0e9ff;
  color: #4c1d95;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 16px; }
.grid.three { grid-template-columns: 1fr 1fr 1fr; }
label, .note {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
}
input, select, textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e7e5ef;
  border-radius: 12px;
  background: #fcfcfd;
  color: #111827;
  padding: 11px 12px;
  font-size: 14px;
  font-weight: 500;
  outline: none;
}
input:focus, select:focus, textarea:focus {
  border-color: #7c3aed;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
}
.note { margin-top: 16px; }
.error { color: #dc2626; font-size: 13px; }
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
}
.actions a { color: #6b7280; font-size: 13px; font-weight: 600; text-decoration: none; }
button {
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #8b5cf6, #6d28d9);
  color: #fff;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
button:disabled { opacity: 0.6; cursor: default; }
.done { padding: 56px 28px; text-align: center; }
.done h2 { border: 0; color: #111827; font-size: 24px; letter-spacing: 0; text-transform: none; }
.done p { color: #6b7280; }
.track { color: #6d28d9 !important; font-weight: 700; }
@media (max-width: 720px) {
  .facts, .grid, .grid.three { grid-template-columns: 1fr 1fr; }
  h1 { font-size: 26px; }
  .hero, form, .facts { padding-left: 16px; padding-right: 16px; }
}
</style>
