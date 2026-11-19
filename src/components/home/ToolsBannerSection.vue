<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHomeBootstrap } from '../../composables/useHomeBootstrap.js'
import { resolveMediaUrl } from '../../api/universities.js'

const { sections } = useHomeBootstrap()

const banner = computed(() => sections.value?.tools_banner || {})

const visible = computed(() => {
  const row = banner.value || {}
  const vis = sections.value?.visibility?.tools_banner
  const enabled = vis === undefined ? row.enabled !== false : vis !== false
  return enabled && !!(row.title || row.image)
})

const desktopImage = computed(() => resolveMediaUrl(banner.value?.image) || banner.value?.image || '')
const mobileImage = computed(() => resolveMediaUrl(banner.value?.mobile_image) || banner.value?.mobile_image || desktopImage.value)

const ctaUrl = computed(() => banner.value?.cta_url || '/contact')
const isInternal = computed(() => String(ctaUrl.value).startsWith('/'))
</script>

<template>
  <section v-if="visible" class="relative w-full overflow-hidden">
    <div class="relative min-h-[220px] w-full sm:min-h-[280px] lg:min-h-[340px]">
      <picture>
        <source v-if="banner.mobile_image" media="(max-width: 639px)" :srcset="mobileImage" />
        <img
          :src="desktopImage"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div class="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,16,32,0.88)_0%,rgba(10,22,40,0.72)_48%,rgba(10,22,40,0.45)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_90%_20%,rgba(225,29,46,0.22),transparent_55%)]"></div>

      <div class="relative site-container flex min-h-[220px] items-center py-10 sm:min-h-[280px] sm:py-12 lg:min-h-[340px] lg:py-14">
        <div class="max-w-2xl text-white">
          <div
            v-if="banner.eyebrow"
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-crimson"></span>
            {{ banner.eyebrow }}
          </div>
          <h2 class="mt-4 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.4rem]">
            {{ banner.title }}
          </h2>
          <p v-if="banner.subtitle" class="mt-3 max-w-xl text-[14px] leading-relaxed text-white/65 sm:text-[15px]">
            {{ banner.subtitle }}
          </p>
          <div v-if="banner.cta_label" class="mt-6">
            <RouterLink
              v-if="isInternal"
              :to="ctaUrl"
              class="btn-primary shadow-lg shadow-crimson/25"
            >
              {{ banner.cta_label }}
              <i class="ti ti-arrow-right"></i>
            </RouterLink>
            <a
              v-else
              :href="ctaUrl"
              target="_blank"
              rel="noopener"
              class="btn-primary shadow-lg shadow-crimson/25"
            >
              {{ banner.cta_label }}
              <i class="ti ti-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
