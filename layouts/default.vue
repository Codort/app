<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div
    class="flex h-screen w-full bg-offwhite dark:bg-offblack m-0 overflow-hidden"
  >
    <div
      class="duration-300 h-full w-[240px]"
      :class="[
        isLargeScreen || isSidebarVisible
          ? 'translate-x-0'
          : '-translate-x-full',
        isLargeScreen ? 'relative' : 'z-50 absolute',
      ]"
      ref="sidebar"
    >
      <Sidebar @toggle-sidebar="toggleSidebar" />
    </div>

    <transition name="overlay">
      <div
        v-if="!isLargeScreen && isSidebarVisible"
        class="overlay fixed inset-0 z-40"
        @click="toggleSidebar"
      ></div>
    </transition>

    <div class="w-full fixed left-0 xl:left-[240px] mb-2 px-2 sm:px-6 xl:px-10">
      <Header @toggle-sidebar="toggleSidebar" class="flex" />
      <main class="flex-grow flex flex-col w-full ms-[2.25rem] xl:ms-0">
        <SubpageNav />
        <!-- scrollbar wrapper -->
        <div
          class="mt-32 fixed inset-y-0 left-0 xl:left-[240px] right-0 overflow-y-auto overflow-x-hidden pb-20"
        >
          <div class="w-full relative left-0 px-2 sm:px-6 xl:px-10">
            <NuxtPage />
          </div>
        </div>
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
  isLargeScreen.value = window.innerWidth >= 1280;
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
