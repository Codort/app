<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <transition name="fade" mode="out-in">
        <NuxtPage />
      </transition>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} ⬣ Codort` : 'Codort';
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
