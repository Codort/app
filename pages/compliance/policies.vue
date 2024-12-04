<template>
  <UTable :rows="filteredRows" :columns="columns">
    <template #name-data="{ row }">
      <span>{{ row.name }}</span>
    </template>

    <template #always-data="{ index }">
      <UCheckbox
        v-model="rows[index].always"
        @change="toggleCheckbox($event, index, 'always')"
      />
    </template>

    <template #public-data="{ index }">
      <UCheckbox
        v-model="rows[index].public"
        @change="toggleCheckbox($event, index, 'public')"
      />
    </template>

    <template #private-data="{ index }">
      <UCheckbox
        v-model="rows[index].private"
        @change="toggleCheckbox($event, index, 'private')"
      />
    </template>

    <!-- FIXME: POPULATE REPOS AS ITEMS -->
    <template #custom-data="{ row }">
      <UDropdown :items="repos(row)" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="white"
          label="Select"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
    </template>

    <template #actions-data="{ row }">
      <UDropdown
        :items="actionOptions(row)"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'filename',
    label: 'Filename',
  },
  {
    key: 'always',
    label: 'Always',
  },
  {
    key: 'public',
    label: 'Public',
  },
  {
    key: 'private',
    label: 'Private',
  },
  {
    key: 'custom',
    label: 'Custom',
  },
  {
    key: 'actions',
  },
];

let rows = ref([
  {
    name: 'README',
    filename: 'README.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
  },
  {
    name: 'Code of Conduct',
    filename: 'CODE_OF_CONDUCT.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
  },
  {
    name: 'Contribution Guidelines',
    filename: 'CONTRIBUTING.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
  },
  {
    name: 'License',
    filename: 'LICENSE.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
  },
  {
    name: 'Notice',
    filename: 'NOTICE.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
  },
]);

function toggleCheckbox(el, rowIndex, checkboxType) {
  rows.value[rowIndex].always = false;
  rows.value[rowIndex].public = false;
  rows.value[rowIndex].private = false;

  rows.value[rowIndex][checkboxType] = el;
}

const filteredRows = computed(() => {
  return rows.value.filter((row) => {
    return !row.hidden;
  });
});

const repos = (row) => [
  [
    {
      label: 'Edit',
    },
    {
      label: 'Duplicate',
    },
  ],
  [
    {
      label: 'Archive',
    },
    {
      label: 'Move',
    },
  ],
  [
    {
      label: 'Delete',
    },
  ],
];

const actionOptions = (row) => [
  [
    {
      label: 'Preview',
      icon: 'i-heroicons-eye',
      click: () => console.log('Edit', row.id),
    },
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit', row.id),
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      click: () => duplicateRow(row),
    },
  ],
  [
    {
      label: 'Archive',
      icon: 'i-heroicons-archive-box-20-solid',
      click: () => archiveRow(row),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => deleteRow(row),
    },
  ],
];

const archiveRow = function (row) {
  row.private = false;
  row.public = false;
  row.always = false;
  row.hidden = true;
  console.log(rows.value);
};

const deleteRow = function (row) {
  rows.value = rows.value.filter((el) => {
    return el.name !== row.name;
  });
  console.log(rows.value);
};

const duplicateRow = function (row) {
  const newRow = { ...row };

  const oldNames = new Set(rows.value.map((el) => el.name));

  let newName = newRow.name;
  let idx = 0;

  while (oldNames.has(newName)) {
    idx++;
    newName = `${newRow.name} (${idx})`;
  }

  newRow.name = newName;

  const fileName = newRow.filename;
  const index = fileName.lastIndexOf('.');
  const basename = fileName.substring(0, index);
  const extension = fileName.substring(index);

  newRow.filename = `${basename}(${idx})${extension}`;

  rows.value.push(newRow);
};

useHead({
  title: 'Policies',
});
</script>
