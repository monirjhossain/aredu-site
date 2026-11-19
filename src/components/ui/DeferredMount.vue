<script setup>
import { useDeferredMount } from '../../composables/useDeferredMount.js'

defineProps({
  minHeight: { type: String, default: '240px' },
})

const { el, ready } = useDeferredMount()
</script>

<template>
  <div ref="el" class="defer-paint w-full" :style="ready ? undefined : { minHeight }">
    <slot v-if="ready" />
  </div>
</template>
