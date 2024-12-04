<template>
  <div class="hexbox-wrap" :class="{ 'hexbox-wrap-button': button }">
    <div
      class="box hexbox"
      :class="{
        'bg-coral dark:bg-navy': active,
        'hover:bg-coral dark:hover:bg-coral': button,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  button: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
