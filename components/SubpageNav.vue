<template>
  <div class="mt-2 ms-[2.25rem] xl:ms-0 flex space-x-10">
    <div v-for="page in subpages" :key="page">
      <NuxtLink
        :to="`/${basePage}/${page.toLowerCase()}`"
        :class="{
          active: page.toLowerCase().replace(' ', '_') == routeName,
        }"
      >
        {{ page }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import products from '~/data/products.js';

const route = useRoute();

const routeName = computed(() => {
  const paths = route.path.split('/');
  return paths[paths.length - 1];
});

const basePage = computed(() => {
  return route.path.split('/')[1];
});

const subpages = computed(() => {
  const matchingProduct = products.find(
    (product) => product.title === titleCase(basePage.value),
  );
  return matchingProduct ? matchingProduct.pages : [];
});
</script>

<style>
.active {
  @apply text-coral dark:text-coral;
}
</style>
