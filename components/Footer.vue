<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <footer
    class="px-4 text-sm mt-auto text-offblack dark:text-offwhite pb-2 transition-colors z-50"
  >
    <!-- logo -->
    <div class="">
      <NuxtImg
        :src="isDark ? '/images/logo_white.png' : '/images/logo_black.png'"
        alt="Codort"
        class="h-[70px]"
      />
    </div>
    <NuxtImg src="/images/logo_white.png" class="w-0 h-0" />
    <NuxtImg src="/images/logo_black.png" class="w-0 h-0" />
    <!-- socials -->
    <div class="flex justify-between">
      <div class="flex space-x-2 pt-1">
        <div v-for="social in config.socials" :key="social.name">
          <NuxtLink
            :aria-label="`Our ${social.name}`"
            class="text-sm a transition"
            target="_blank"
            :to="social.url"
          >
            <span class="sr-only">{{ social.name }}</span>
            <Icon :name="social.icon" class="text-xl"></Icon>
          </NuxtLink>
        </div>
      </div>
      <!-- color mode -->
      <div class="">
        <ColorScheme placeholder="" tag="span">
          <UButton
            :icon="isDark ? 'i-fa-moon-o' : 'i-fa-sun-o'"
            variant="link"
            class="text-offblack dark:text-offwhite hover:text-coral dark:hover:text-coral"
            aria-label="Change colour mode"
            @click="toggleColourMode"
          ></UButton>
        </ColorScheme>
        <Icon name="fa:sun-o" class="w-0 h-0"></Icon>
        <Icon name="fa:moon-o" class="w-0 h-0"></Icon>
      </div>
    </div>
    <!-- legals -->
    <div class="flex items-center pb-1">
      <p class="text-sm">© Codort &#174; {{ new Date().getFullYear() }}</p>
      <span class="hex" />
      <NuxtLink
        class="text-sm"
        to="https://docs.google.com/document/d/1wIBfNnJr3G19zIkc7fjeoZVdJZFhx2l4yDhjPws47iM/edit?usp=sharing"
        >Privacy Policy
      </NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const config: any = useAppConfig();

const colorMode = useColorMode();
const isDark = ref(false);
onMounted(() => {
  isDark.value = colorMode.preference === 'dark';
});
const toggleColourMode = () => {
  isDark.value = !isDark.value;
  colorMode.preference = isDark.value ? 'dark' : 'light';
};
</script>

<style lang="scss" scoped>
.transparent {
  background-color: transparent;
}

.opaque {
  background: #1b2629;
}

ul li::before {
  content: none;
}
</style>
