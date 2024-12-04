<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div>
    <div class="flex gap-4 pb-4">
      <HexBox
        class="w-[150px]"
        :active="show5230"
        @click="display5230"
        :button="true"
      >
        <h6>ISO/IEC 5230</h6>
        <UProgress :value="current5230" />
        {{ current5230 }}% complete
      </HexBox>
      <HexBox
        class="w-[150px]"
        :active="show18974"
        @click="display18974"
        :button="true"
      >
        <h6>ISO/IEC 18974</h6>
        <UProgress :value="current18974" />
        {{ current18974 }}% complete
      </HexBox>
    </div>
    <!-- ISO5230 -->
    <div id="iso5230" v-if="show5230">
      <div
        v-for="section in sections5230"
        :key="section.title"
        class="w-full pt-4"
      >
        <h4 class="pb-3">{{ section.title }}</h4>
        <div v-for="item in section.items" :key="item">
          <UCheckbox disabled v-model="item.checked" class="flex items-center">
            <template #label>
              <span class="p">{{ item.text }}</span>
            </template>
          </UCheckbox>
        </div>
      </div>
    </div>
    <!-- ISO18974 -->
    <div id="iso18974" v-if="show18974">
      <div
        v-for="section in sections18974"
        :key="section.title"
        class="w-full pt-4"
      >
        <h4 class="pb-3">{{ section.title }}</h4>
        <div v-for="item in section.items" :key="item">
          <UCheckbox disabled v-model="item.checked" class="flex items-center">
            <template #label>
              <span class="p">{{ item.text }}</span>
            </template>
          </UCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const show5230 = ref(true);
const show18974 = ref(false);

const display5230 = () => {
  show5230.value = true;
  show18974.value = false;
};
const display18974 = () => {
  show5230.value = false;
  show18974.value = true;
};

const current5230 = ref(0); // Start for animation
const current18974 = ref(0);
const duration = 2000; // Animation duration in milliseconds

import { useIso5230Data } from '~/data/iso5230.js';
import { useIso18974Data } from '~/data/iso18974.js';

const { sections5230, proportionChecked5230 } = useIso5230Data();
const { sections18974, proportionChecked18974 } = useIso18974Data();

const progress18974 = computed(() => proportionChecked18974());
const progress5230 = computed(() => proportionChecked5230());

onMounted(() => {
  const startTime = performance.now();

  const animateProgress = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    current5230.value = Math.floor(progress * progress5230.value);
    current18974.value = Math.floor(progress * progress18974.value);

    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    }
  };

  requestAnimationFrame(animateProgress);
});

const checkCheckbox = (iso, sectionIndex, itemIndex) => {
  const item =
    iso === 5230
      ? sections5230.value[sectionIndex].items[itemIndex]
      : sections18974.value[sectionIndex].items[itemIndex];

  item.checked = true;
};

const uncheckCheckbox = (iso, sectionIndex, itemIndex) => {
  const item =
    iso === 5230
      ? sections5230.value[sectionIndex].items[itemIndex]
      : sections18974.value[sectionIndex].items[itemIndex];

  item.checked = false;
};

useHead({
  title: 'OpenChain',
});
</script>

<style scoped>
.iso_active {
  @apply bg-coral;
}
</style>
