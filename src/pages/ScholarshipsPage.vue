<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSiteSettings } from '../composables/useSiteSettings.js'
import { fetchScholarshipOptions, fetchScholarships } from '../api/scholarships.js'

const { whatsapp: WHATSAPP } = useSiteSettings()

const loading = ref(true)
const error = ref('')
const scholarships = ref([])
const options = ref({ degree: [], language: [], intake: [], scholarship_type: [] })
const query = ref('')
const filters = ref({
  degree: '',
  language: '',
  intake: '',
  scholarship_type: '',
})

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const [result, optionLists] = await Promise.all([
      fetchScholarships({ perPage: 100 }),
      fetchScholarshipOptions(),
    ])
    scholarships.value = result.items
    options.value = { ...options.value, ...optionLists }
  } catch (e) {
    console.error(e)
    error.value = e.message || 'Could not load scholarships'
  } finally {
    loading.value = false
  }
})

const rows = computed(() => {
  const q = query.value.trim().toLowerCase()
  return scholarships.value.filter((row) => {
    if (filters.value.degree && row.degree !== filters.value.degree) return false
    if (filters.value.language && row.teachingLanguage !== filters.value.language) return false
    if (filters.value.intake && row.intake !== filters.value.intake) return false
    if (filters.value.scholarship_type && row.scholarshipType !== filters.value.scholarship_type) return false
    if (!q) return true
    return [row.name, row.city, row.programId, row.degree, row.scholarshipType, row.intake]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
})

function cell(value) {
  return value || '—'
}
</script>

<template>
  <div class="bg-[#f5f6f8] py-8">
    <div class="site-container">
      <div class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div class="flex flex-col gap-3 border-b border-black/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-[15px] font-semibold text-[#1f2937]">Programs</h1>
            <p class="text-[12px] text-[#6b7280]">Scholarship offers from the admin dashboard</p>
          </div>
          <input
            v-model="query"
            type="search"
            placeholder="Search program, city, ID…"
            class="w-full rounded-lg border border-black/10 px-3 py-2 text-[13px] outline-none sm:w-64"
          />
        </div>
        <div class="grid gap-2 border-b border-black/5 px-5 py-3 sm:grid-cols-2 lg:grid-cols-4">
          <select v-model="filters.degree" class="rounded-lg border border-black/10 px-3 py-2 text-[13px]">
            <option value="">All degrees</option>
            <option v-for="item in options.degree" :key="item" :value="item">{{ item }}</option>
          </select>
          <select v-model="filters.language" class="rounded-lg border border-black/10 px-3 py-2 text-[13px]">
            <option value="">All languages</option>
            <option v-for="item in options.language" :key="item" :value="item">{{ item }}</option>
          </select>
          <select v-model="filters.intake" class="rounded-lg border border-black/10 px-3 py-2 text-[13px]">
            <option value="">All intakes</option>
            <option v-for="item in options.intake" :key="item" :value="item">{{ item }}</option>
          </select>
          <select v-model="filters.scholarship_type" class="rounded-lg border border-black/10 px-3 py-2 text-[13px]">
            <option value="">All scholarship types</option>
            <option v-for="item in options.scholarship_type" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>

        <p v-if="error" class="px-5 py-3 text-[13px] text-red-600">{{ error }}</p>

        <div v-if="loading" class="space-y-2 p-5">
          <div v-for="n in 6" :key="n" class="h-12 animate-pulse rounded-lg bg-[#f3f4f6]" />
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-[1100px] w-full text-left text-[13px]">
            <thead class="bg-[#f8fafc] text-[12px] font-medium text-[#6b7280]">
              <tr>
                <th class="px-4 py-3 font-medium">City, Province</th>
                <th class="px-4 py-3 font-medium">Program name</th>
                <th class="px-4 py-3 font-medium">Program ID</th>
                <th class="px-4 py-3 font-medium">Degree</th>
                <th class="px-4 py-3 font-medium">Teaching language</th>
                <th class="px-4 py-3 font-medium">Intake</th>
                <th class="px-4 py-3 font-medium">Scholarship type</th>
                <th class="px-4 py-3 font-medium">Deadline</th>
                <th class="px-4 py-3 font-medium">Apply</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.slug" class="border-t border-black/5">
                <td class="px-4 py-4 text-[#374151]">{{ cell(row.city) }}</td>
                <td class="px-4 py-4">
                  <RouterLink :to="`/scholarship/${row.slug}`" class="font-medium text-[#6d28d9] hover:underline">
                    {{ row.name }}
                  </RouterLink>
                  <div v-if="row.coverage" class="mt-1 text-[11px] text-[#9ca3af]">{{ row.coverage }}</div>
                </td>
                <td class="whitespace-pre-line px-4 py-4 text-[#6b7280]">{{ cell(row.programId) }}</td>
                <td class="px-4 py-4 text-[#374151]">{{ cell(row.degree) }}</td>
                <td class="px-4 py-4 text-[#374151]">{{ cell(row.teachingLanguage) }}</td>
                <td class="whitespace-pre-line px-4 py-4 text-[#374151]">{{ cell(row.intake) }}</td>
                <td class="px-4 py-4 text-[#374151]">{{ cell(row.scholarshipType) }}</td>
                <td class="px-4 py-4 text-[#374151]">{{ cell(row.deadline) }}</td>
                <td class="px-4 py-4">
                  <RouterLink
                    :to="`/scholarships/${row.slug}/apply`"
                    class="inline-flex rounded-lg bg-[#7c3aed] px-3 py-1.5 text-[12px] font-semibold text-white"
                  >
                    Apply
                  </RouterLink>
                </td>
              </tr>
              <tr v-if="!rows.length">
                <td colspan="9" class="px-4 py-10 text-center text-[#6b7280]">No scholarships match this search.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5 sm:flex-row">
        <p class="text-[13px] text-[#6b7280]">Not sure which scholarship fits? Check eligibility or message us.</p>
        <div class="flex gap-2">
          <RouterLink to="/tools/scholarship-checker" class="rounded-lg bg-[#111827] px-4 py-2 text-[12px] font-semibold text-white">
            Checker
          </RouterLink>
          <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-lg bg-[#16A34A] px-4 py-2 text-[12px] font-semibold text-white">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
