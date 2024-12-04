<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div
    class="bg-offwhite dark:bg-offblack w-full h-full flex flex-col border-r-2 border-midgrey"
  >
    <div class="flex flex-col flex-grow w-full p-0">
      <div class="">
        <div class="ps-6 flex items-center w-full pt-4">
          <Icon name="fa-image" class="sidebar_icon"></Icon>
          <h3>Company</h3>
        </div>
        <NuxtLink
          to="/profile"
          class="sidebar_link"
          :class="{
            active: 'profile' == basePage,
          }"
        >
          <Icon name="uil-head-side" class="sidebar_icon"></Icon>
          <p>Profile</p>
        </NuxtLink>
      </div>
      <div class="sidebar_rule"></div>
      <div v-for="product in products" :key="product.title" class="w-full flex">
        <NuxtLink
          :to="`/${product.title.toLowerCase().replace(' ', '_')}`"
          class="sidebar_link"
          :class="{
            active: product.title.toLowerCase().replace(' ', '_') == basePage,
          }"
          @click.stop="$emit('toggle-sidebar')"
        >
          <Icon :name="product.icon" class="sidebar_icon" />
          <p>{{ product.title }}</p>
        </NuxtLink>
      </div>
      <div class="sidebar_rule"></div>
      <div class="w-full flex">
        <NuxtLink
          to="/settings"
          class="sidebar_link"
          :class="{
            active: 'settings' == basePage,
          }"
        >
          <Icon name="uil-cog" class="sidebar_icon" />
          <p>Settings</p>
        </NuxtLink>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import products from '~/data/products.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const basePage = computed(() => {
  return route.path.split('/')[1];
});
</script>

<style>
.sidebar_rule {
  @apply border-b-2 border-midgray w-[90%] self-center;
}

.sidebar_link {
  @apply flex items-center self-center w-full py-4 ps-6 hover:bg-white dark:hover:bg-black;
}

.sidebar_link.active {
  @apply bg-white dark:bg-black text-coral;
}

.sidebar_icon {
  @apply h-8 w-8 me-4;
}
</style>
