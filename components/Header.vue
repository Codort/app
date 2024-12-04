<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <header class="sm:justify-start sm:flex-nowrap z-11 w-full">
    <div
      id="main-header"
      class="transition-colors duration-500 z-10 top-0 mt-8 bg-transparent w-full"
    >
      <!-- Above border -->
      <div class="flex items-center justify-start w-full">
        <!-- Sidebar toggle -->
        <div class="flex flex-start xl:hidden me-4">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md dark:text-offwhite focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click.stop="$emit('toggle-sidebar')"
          >
            <span class="sr-only">Open main menu</span>
            <Icon name="fa:bars" class="h-5 w-5"></Icon>
          </button>
        </div>
        <div class="w-full">
          <h2 class="p-0 m-0 leading-8">{{ routeName }}</h2>
        </div>
      </div>
      <!-- Border -->
      <!-- 16px = px-2; 48px = px-6; 80px = px-10; -->
      <div
        class="mt-2 absolute border-b-2 border-offblack dark:border-offwhite w-[calc(100%-16px)] sm:w-[calc(100%-48px)] xl:w-[calc(100%-80px-240px)]"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeName = computed(() => {
  const name = titleCase(route.path.split('/')[1]);
  return name == '' ? 'Home' : name;
});
</script>
