<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { DEGREES, WHATSAPP } from '../../data/site.js'
import universities from '../../data/universities.json'
import UniversityCard from '../../components/ui/UniversityCard.vue'

const route = useRoute()

const degree = computed(() => DEGREES.find((d) => d.slug === route.params.slug))

const relatedUnis = computed(() => {
  if (!degree.value) return []
  return universities
    .filter((u) => u.scholarship || u.ranking <= 50)
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, 9)
})
</script>

<template>
  <div v-if="degree" class="site-container py-10">
    <nav class="mb-6 text-[12px] text-gray-400">
      <RouterLink to="/" class="hover:text-[var(--color-primary)]">Home</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-[var(--color-secondary)]">{{ degree.name }}</span>
    </nav>

    <div class="rounded-2xl px-6 py-10 sm:px-10" style="background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3055 100%)">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-extrabold text-white" style="background: var(--color-primary)">
        {{ degree.letter }}
      </span>
      <h1 class="mt-4 text-2xl font-extrabold text-white sm:text-3xl">{{ degree.label }}</h1>
      <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#AEB8C9]">
        Explore {{ degree.name.toLowerCase() }} programmes at Chinese universities — many with scholarships for Bangladeshi students.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <RouterLink to="/tools/find-university" class="rounded-xl px-5 py-2.5 text-center text-[13px] font-semibold text-white" style="background: var(--color-primary)">
          Find my university
        </RouterLink>
        <a :href="WHATSAPP" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-center text-[13px] font-semibold text-white">
          WhatsApp us
        </a>
      </div>
    </div>

    <section class="mt-10">
      <h2 class="text-xl font-extrabold text-[var(--color-secondary)]">Universities offering {{ degree.name }} programmes</h2>
      <p class="mt-1 text-[14px] text-gray-500">Featured universities with scholarship options.</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UniversityCard v-for="uni in relatedUnis" :key="uni.slug" :university="uni" />
      </div>
      <RouterLink to="/universities" class="mt-6 inline-block text-[13px] font-semibold" style="color: var(--color-primary)">
        Browse all universities →
      </RouterLink>
    </section>
  </div>

  <div v-else class="site-container max-w-lg py-20 text-center">
    <h1 class="text-2xl font-extrabold text-[var(--color-secondary)]">Degree not found</h1>
    <RouterLink to="/" class="mt-4 inline-block text-[13px] font-semibold" style="color: var(--color-primary)">Back to home</RouterLink>
  </div>
</template>
