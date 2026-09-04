<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  target: { type: Number, required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: '+' },
})

const n = ref(1)
const root = ref(null)
let raf = null
let observer = null
let started = false

function animate() {
  if (started) return
  started = true
  n.value = 1

  const start = performance.now()
  const dur = Math.min(1600, 700 + props.target * 0.35)
  const from = 1
  const to = props.target

  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur)
    // ease-out cubic — fast at start, settles at end
    const eased = 1 - Math.pow(1 - p, 3)
    n.value = Math.max(1, Math.round(from + (to - from) * eased))
    if (p < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      n.value = to
    }
  }

  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!root.value) {
    animate()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        animate()
        observer?.disconnect()
      }
    },
    { threshold: 0.35 },
  )
  observer.observe(root.value)
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="text-center sm:text-left">
    <div class="font-display text-[2rem] font-extrabold tracking-tight text-ink tabular-nums sm:text-[2.35rem]">
      {{ n }}<span class="text-crimson">{{ suffix }}</span>
    </div>
    <div class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">
      {{ label }}
    </div>
  </div>
</template>
