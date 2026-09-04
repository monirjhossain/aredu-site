<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSiteSettings } from '../../composables/useSiteSettings.js'
import { fetchServiceBySlug, fetchServices } from '../../api/services.js'
import FaqItem from '../../components/ui/FaqItem.vue'

const route = useRoute()
const { whatsapp, faqs } = useSiteSettings()
const service = ref(null)
const otherServices = ref([])
const loading = ref(true)
const error = ref('')

const relatedFaqs = computed(() => (faqs.value || []).slice(0, 3))

async function load() {
  loading.value = true
  error.value = ''
  service.value = null
  try {
    const [detail, list] = await Promise.all([
      fetchServiceBySlug(route.params.slug),
      fetchServices({ perPage: 20 }),
    ])
    service.value = detail
    otherServices.value = list.items.filter((s) => s.slug !== route.params.slug).slice(0, 3)
    if (!detail) error.value = 'Service not found'
  } catch (e) {
    console.error(e)
    error.value = e.message || 'Could not load service'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.slug, load)
</script>

<template>
  <div class="site-container py-10" v-if="loading">
    <div class="h-56 animate-pulse rounded-2xl bg-gray-100" />
  </div>

  <div v-else-if="error || !service" class="site-container py-10 text-center">
    <h1 class="text-xl font-extrabold text-ink">Service not found</h1>
    <p class="mt-2 text-[14px] text-ink/50">{{ error }}</p>
    <RouterLink to="/services" class="mt-4 inline-block text-[13px] font-semibold text-crimson">Back to services</RouterLink>
  </div>

  <div v-else>
    <section class="relative overflow-hidden text-white" :style="{ background: `linear-gradient(145deg, #0A1628 0%, #12233d 45%, ${service.color} 160%)` }">
      <div class="pointer-events-none absolute inset-0 texture-grid opacity-30" />
      <div class="relative site-container py-10 sm:py-14 lg:py-16">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-white/50">
          <RouterLink to="/" class="hover:text-white">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/services" class="hover:text-white">Services</RouterLink>
          <span>/</span>
          <span class="text-white/80">{{ service.name }}</span>
        </nav>

        <div class="max-w-3xl">
          <span
            class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15"
            :style="{ color: '#fff' }"
          >
            <i class="ti text-[22px]" :class="service.icon"></i>
          </span>
          <h1 class="mt-5 font-display text-[1.9rem] font-extrabold leading-tight sm:text-4xl">{{ service.name }}</h1>
          <p class="mt-4 text-[15px] leading-relaxed text-white/65">{{ service.short }}</p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <RouterLink to="/contact" class="rounded-xl bg-white px-5 py-2.5 text-center text-[13px] font-semibold text-ink">Contact us</RouterLink>
            <a :href="whatsapp" target="_blank" rel="noopener" class="rounded-xl bg-[#16A34A] px-5 py-2.5 text-center text-[13px] font-semibold text-white">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>

    <section class="site-container py-10">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="prose max-w-none rounded-2xl border border-ink/8 bg-white p-6 sm:p-8" v-html="service.content" />
        <div>
          <h2 class="font-display text-xl font-extrabold text-ink">Other services</h2>
          <div class="mt-4 space-y-3">
            <RouterLink
              v-for="s in otherServices"
              :key="s.slug"
              :to="`/service/${s.slug}`"
              class="block rounded-2xl border border-ink/8 bg-white p-4 hover:border-crimson/30"
            >
              <div class="font-semibold text-ink">{{ s.name }}</div>
              <div class="mt-1 text-[12px] text-ink/50">{{ s.short }}</div>
            </RouterLink>
          </div>
          <div class="mt-8">
            <h3 class="font-display text-lg font-extrabold text-ink">FAQs</h3>
            <div class="mt-3 grid gap-2">
              <FaqItem v-for="faq in relatedFaqs" :key="faq.q" :q="faq.q" :a="faq.a" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
