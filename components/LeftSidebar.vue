<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div
    class="bg-offwhite dark:bg-offblack w-full h-full flex flex-col border border-r-2 border-midgrey"
  >
    <div class="flex flex-col flex-grow w-full p-0">
      <div class="">
        <div class="ps-6 flex items-center w-full pt-4">
          <Icon name="fa-image" class="icon"></Icon>
          <h3>Company</h3>
        </div>
        <NuxtLink to="settings" class="sidebar_link">
          <Icon name="uil-head-side" class="icon"></Icon>
          <p>Profile</p>
        </NuxtLink>
      </div>
      <div class="rule"></div>
      <div v-for="product in products" :key="product.title" class="w-full flex">
        <NuxtLink
          :to="product.title.toLowerCase().replace(' ', '_')"
          class="sidebar_link"
        >
          <Icon :name="product.icon" class="icon" />
          <p>{{ product.title }}</p>
        </NuxtLink>
      </div>
      <div class="rule"></div>
      <div class="w-full flex">
        <NuxtLink to="settings" class="sidebar_link">
          <Icon name="uil-cog" class="icon" />
          <p>Settings</p>
        </NuxtLink>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import products from '~/data/products.js';
</script>

<style scoped>
.rule {
  @apply border-b-2 border-midgray w-[90%] self-center;
}

.sidebar_link {
  @apply flex items-center self-center w-full py-4 ps-6 hover:bg-gray-200;
}

.icon {
  @apply h-8 w-8 me-4;
}
</style>
