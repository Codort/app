<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div class="flex h-screen w-full bg-gradient-light dark:bg-gradient-dark m-0">
    <div
      class="duration-300 h-full"
      :class="[
        isLargeScreen || isSidebarVisible
          ? 'translate-x-0'
          : '-translate-x-full',
        isLargeScreen ? 'relative' : 'z-50 absolute',
      ]"
      ref="sidebar"
    >
      <LeftSidebar />
    </div>

    <transition name="overlay">
      <div
        v-if="!isLargeScreen && isSidebarVisible"
        class="overlay fixed inset-0"
        @click="toggleSidebar"
      ></div>
    </transition>

    <div>
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="flex-grow flex px-2 sm:px-6 lg:px-10 mt-36">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isSidebarVisible = ref(false);
const isLargeScreen = ref(false);
const sidebar = ref(null);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize);
});
</script>

<style scoped>
.overlay {
  @apply w-screen h-screen bg-black bg-opacity-50;
}

.overlay-leave-active {
  opacity: 0;
}

/* Overlay with smooth opacity transition */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
