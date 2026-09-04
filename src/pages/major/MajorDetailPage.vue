<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { FIELD_GROUPS, WHATSAPP } from '../../data/site.js'
import majors from '../../data/majors.json'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()

const major = computed(() => majors.find((m) => m.slug === route.params.slug))

const field = computed(() => {
  if (!major.value) return ''
  const lower = major.value.name.toLowerCase()
  if (lower.includes('engineer') || lower.includes('technology')) return 'Engineering & Technology'
  if (lower.includes('computer') || lower.includes('data')) return 'Computer Science & IT'
  if (lower.includes('medic') || lower.includes('pharm') || lower.includes('dental')) return 'Agriculture & Life Sciences'
  const idx = majors.findIndex((m) => m.slug === major.value.slug)
  return FIELD_GROUPS[idx % FIELD_GROUPS.length]
})

const relatedUnis = computed(() => universities.filter((u) => u.ranking <= 40).slice(0, 6))
</script>

<template>
  <div v-if="major" class="site-container py-10">
    <nav class="mb-6 text-[12px] text-gray-400">
      <RouterLink to="/majors" class="hover:text-[var(--color-primary)]">Majors</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-[var(--color-secondary)]">{{ major.name }}</span>
    </nav>

    <div class="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <span class="inline-block rounded-full px-3 py-1 text-[11px] font-semibold" style="background: #eef1f6; color: var(--color-secondary)">
        {{ field }}
      </span>
      <h1 class="mt-3 text-2xl font-extrabold text-[var(--color-secondary)] sm:text-3xl">{{ major.name }}</h1>
      <p class="mt-4 max-w-2xl text-[14px] leading-relaxed text-gray-600">
        Study {{ major.name }} at top Chinese universities. Programmes are available at bachelor's, master's and PhD
        levels — many with scholarships for Bangladeshi students.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <RouterLink to="/tools/find-university" class="rounded-xl px-5 py-2.5 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
          Find universities for this major
        </RouterLink>
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-center text-[13px] font-semibold text-white">
          WhatsApp us
        </a>
      </div>
    </div>

    <section class="mt-10">
      <h2 class="text-lg font-extrabold text-[var(--color-secondary)]">Universities offering related programmes</h2>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
      </div>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="text-2xl font-extrabold text-[var(--color-secondary)]">Major not found</h1>
    <RouterLink to="/majors" class="mt-4 inline-block text-[13px] font-semibold" style="color: var(--color-primary)">Browse majors</RouterLink>
  </div>
</template>
