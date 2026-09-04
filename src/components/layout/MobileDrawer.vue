<script setup>
import { watch, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { BRAND, WHATSAPP } from '../../data/site'

const props = defineProps({ open: Boolean })
defineEmits(['close'])

const primary = [
  ['/universities', 'Universities', 'ti-building-bank'],
  ['/scholarships', 'Scholarships', 'ti-rosette-discount-check'],
  ['/majors', 'Majors', 'ti-book-2'],
  ['/cities', 'Cities', 'ti-map-pin'],
  ['/services', 'Services', 'ti-briefcase'],
  ['/tools/find-university', 'Tools', 'ti-tools'],
]

const secondary = [
  ['/about', 'About us'],
  ['/contact', 'Contact'],
  ['/login', 'Login'],
]

watch(
  () => props.open,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[60] bg-ink/45 backdrop-blur-sm lg:hidden" @click="$emit('close')" />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="open"
        class="fixed inset-y-0 left-0 z-[70] flex w-[min(100%,360px)] flex-col bg-[#F4F6F8] lg:hidden"
      >
        <div class="flex items-center justify-between border-b border-ink/8 bg-white px-4 py-3.5">
          <RouterLink to="/" class="flex items-center" @click="$emit('close')">
            <img src="/images/ar-logo.webp" :alt="BRAND" class="h-9 w-auto max-w-[140px] object-contain" />
          </RouterLink>
          <button
            type="button"
            aria-label="Close menu"
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F8] text-ink"
            @click="$emit('close')"
          >
            <i class="ti ti-x text-[20px]"></i>
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-4">
          <div class="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">Explore</div>
          <div class="overflow-hidden rounded-2xl bg-white ring-1 ring-ink/8">
            <RouterLink
              v-for="(l, i) in primary"
              :key="l[0]"
              :to="l[0]"
              class="flex items-center gap-3 px-4 py-3.5 text-[14px] font-semibold text-ink active:bg-[#F7F8FA]"
              :class="i !== primary.length - 1 ? 'border-b border-ink/6' : ''"
              @click="$emit('close')"
            >
              <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F8] text-ink/70">
                <i class="ti text-[17px]" :class="l[2]"></i>
              </span>
              {{ l[1] }}
              <i class="ti ti-chevron-right ml-auto text-[16px] text-ink/25"></i>
            </RouterLink>
          </div>

          <div class="mb-2 mt-5 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/35">More</div>
          <div class="overflow-hidden rounded-2xl bg-white ring-1 ring-ink/8">
            <RouterLink
              v-for="(l, i) in secondary"
              :key="l[0]"
              :to="l[0]"
              class="block px-4 py-3.5 text-[14px] font-medium text-ink/80 active:bg-[#F7F8FA]"
              :class="i !== secondary.length - 1 ? 'border-b border-ink/6' : ''"
              @click="$emit('close')"
            >
              {{ l[1] }}
            </RouterLink>
          </div>
        </nav>

        <div class="space-y-2 border-t border-ink/8 bg-white p-4">
          <a
            :href="WHATSAPP"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] py-3.5 text-[13px] font-semibold text-white"
            target="_blank"
            rel="noopener"
          >
            <i class="ti ti-brand-whatsapp text-[18px]"></i>
            WhatsApp counselling
          </a>
          <RouterLink
            to="/tools/find-university"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-crimson py-3.5 text-[13px] font-semibold text-white"
            @click="$emit('close')"
          >
            Find my university
          </RouterLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
