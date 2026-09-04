<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { SERVICES } from '../../data/site.js'
import { fetchServices } from '../../api/services.js'
import { useSiteSettings } from '../../composables/useSiteSettings.js'

const { brand, phone, email, address, whatsapp, facebook, youtube } = useSiteSettings()
const services = ref(SERVICES.slice(0, 4))

onMounted(async () => {
  try {
    const result = await fetchServices({ perPage: 8 })
    if (result.items?.length) services.value = result.items.slice(0, 4)
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <footer class="relative mt-auto overflow-hidden bg-ink text-white">
    <div class="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-crimson/20 blur-3xl" />
    <div class="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-jade/20 blur-3xl" />

    <div class="relative site-container py-16 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <div class="font-display text-2xl font-extrabold tracking-tight">{{ brand }}</div>
          <p class="mt-4 max-w-sm text-[14px] leading-relaxed text-white/55">
            Helping Bangladeshi students discover the right university and scholarship, handle the visa, and settle in China.
          </p>
          <div class="mt-6 flex gap-2">
            <a :href="whatsapp" aria-label="WhatsApp" class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16A34A] transition hover:scale-105"><i class="ti ti-brand-whatsapp text-[18px]"></i></a>
            <a :href="facebook" target="_blank" rel="noopener" aria-label="Facebook" class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"><i class="ti ti-brand-facebook text-[18px]"></i></a>
            <a :href="youtube" target="_blank" rel="noopener" aria-label="Youtube" class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"><i class="ti ti-brand-youtube text-[18px]"></i></a>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Explore</div>
          <ul class="mt-4 space-y-2.5 text-[13.5px] text-white/55">
            <li><RouterLink to="/universities" class="hover:text-white">Universities</RouterLink></li>
            <li><RouterLink to="/scholarships" class="hover:text-white">Scholarships</RouterLink></li>
            <li><RouterLink to="/majors" class="hover:text-white">Majors</RouterLink></li>
            <li><RouterLink to="/cities" class="hover:text-white">Cities</RouterLink></li>
          </ul>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Services</div>
          <ul class="mt-4 space-y-2.5 text-[13.5px] text-white/55">
            <li v-for="s in services" :key="s.slug">
              <RouterLink :to="`/service/${s.slug}`" class="hover:text-white">{{ s.name }}</RouterLink>
            </li>
            <li><RouterLink to="/services" class="font-semibold text-white">All services →</RouterLink></li>
          </ul>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Contact</div>
          <ul class="mt-4 space-y-3 text-[13.5px] text-white/55">
            <li class="flex gap-2.5"><i class="ti ti-map-pin mt-0.5 text-crimson"></i><span>{{ address }}</span></li>
            <li class="flex items-center gap-2.5"><i class="ti ti-phone text-crimson"></i><a :href="`tel:${phone}`" class="hover:text-white">{{ phone }}</a></li>
            <li class="flex items-center gap-2.5"><i class="ti ti-mail text-crimson"></i><a :href="`mailto:${email}`" class="hover:text-white">{{ email }}</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:justify-between">
        <span>© 2026 {{ brand }}. Crafted for Bangladeshi students.</span>
        <span class="flex gap-4">
          <RouterLink to="/about" class="hover:text-white">About</RouterLink>
          <RouterLink to="/contact" class="hover:text-white">Contact</RouterLink>
        </span>
      </div>
    </div>
  </footer>
</template>
