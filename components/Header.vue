<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <header class="sm:justify-start sm:flex-nowrap z-11 w-full">
    <div
      id="main-header"
      class="transition-colors duration-500 fixed w-full z-10 top-0 pt-10 pb-5 px-2 sm:px-6 lg:px-10 bg-transparent"
    >
      <div class="flex items-center justify-start">
        <!-- Sidebar toggle-->
        <div class="flex flex-start lg:hidden me-4">
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
        <div class="">
          <h2>Page title</h2>
        </div>
      </div>
      <div class="border-b-2 border-offblack dark:border-offwhite w-full" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const config: any = useAppConfig();
const menu = config.menu;
const sidebarOpen = ref(false);
</script>
