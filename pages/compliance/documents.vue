<!-- Licensed under Apache-2.0. See LICENSE and NOTICE in the root-level directory for full license and copyright details. -->
<template>
  <div>
    <div class="pb-7">
      <h2>Documents to review</h2>
      <UTable :rows="reviewDocuments" :columns="variableColumns">
        <template #lastModified-data="{ row, index }">
          {{ randomDateMinusYear(index, 14) }}
        </template>
        <template #nextReview-data="{ row, index }">
          {{ randomDate(index, 14) }}
        </template>
        <template #category-data="{ row, index }">
          {{ row.category }}
        </template>
      </UTable>
    </div>

    <div>
      <h2>All documents</h2>
      <UTable :rows="allDocuments" :columns="variableColumns">
        <template #lastModified-data="{ row, index }">
          {{ randomDateMinusYear(index, 365) }}
        </template>
        <template #nextReview-data="{ row, index }">
          {{ randomDate(index, 365) }}
        </template>
        <template #category-data="{ row, index }">
          {{ row.category }}
        </template>
      </UTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Documents',
});

let allDocuments = [
  {
    document: 'Open source license compliance',
    category: 'ISO5230',
    createdBy: 'John Doe',
  },
];

let reviewDocuments = [
  {
    document: 'Relevant open source objectives',
    category: 'ISO5230',
    createdBy: 'John Doe',
  },
  {
    document: 'Metrics to measure program performance',
    category: 'ISO18974',
    createdBy: 'John Doe',
  },
];

const variableColumns = [
  {
    key: 'document',
    label: 'Document',
  },
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'createdBy',
    label: 'Created By',
  },
  {
    key: 'lastModified',
    label: 'Last Modified',
  },
  {
    key: 'nextReview',
    label: 'Next Review',
  },
];

function formatDate(unfmtDate) {
  const day = unfmtDate.getDate().toString().padStart(2, '0');
  const month = unfmtDate.toLocaleString('en-US', { month: 'short' });
  const year = unfmtDate.getFullYear();
  return `${day} ${month} ${year}`;
}

function rng(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = Math.pow(2, 32); // 2^32
  seed = (seed + 11) * 10000000;
  seed = (a * seed + c) % m;
  return seed / m;
}

function randomDate(seed, futureLimit) {
  const today = new Date();
  let pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() + futureLimit);
  const randomTimestamp =
    pastDate.getTime() + rng(seed) * (today.getTime() - pastDate.getTime());
  const randomDate = new Date(randomTimestamp);
  return formatDate(randomDate);
}

function randomDateMinusYear(seed, futureLimit) {
  const today = new Date();
  let pastDate = new Date(today);
  pastDate.setDate(pastDate.getDate() + futureLimit);
  const randomTimestamp =
    pastDate.getTime() + rng(seed) * (today.getTime() - pastDate.getTime());
  const randomDate = new Date(randomTimestamp);
  randomDate.setFullYear(randomDate.getFullYear() - 1);
  return formatDate(randomDate);
}
</script>

<style></style>
