<template>
  <div>
    <h2>Variables</h2>
    <UTable :rows="variableRows" :columns="variableColumns"> </UTable>
    <div class="flex justify-between items-center">
      <h2>Documents</h2>
      <UButton class="" icon="i-heroicons-document-arrow-up" @click="newRow()"
        >New</UButton
      >
    </div>
    <UTable :rows="filteredRows" :columns="columns">
      <template #name-data="{ row, index }">
        <div @dblclick="editCell(index, 'name')" class="cursor-text">
          <input
            v-if="
              editingCell.rowIndex === index && editingCell.field === 'name'
            "
            v-model="rows[index].name"
            @blur="saveCell(index, 'name')"
            @keyup.enter="saveCell(index, 'name')"
            @keyup.esc="discardCell(index, 'name')"
            class="border p-1"
          />
          <span v-else>{{ row.name }}</span>
          <div
            v-if="
              editingCell.rowIndex === index &&
              editingCell.field === 'name' &&
              validationError
            "
            class="text-red-500 text-sm mt-1 break-words"
          >
            <!-- Break validation error so it doesn't make columns longer -->
            {{ validationError }}
          </div>
        </div>
      </template>

      <template #filename-data="{ row, index }">
        <div @dblclick="editCell(index, 'filename')" class="cursor-text">
          <input
            v-if="
              editingCell.rowIndex === index && editingCell.field === 'filename'
            "
            v-model="rows[index].filename"
            @blur="saveCell(index, 'filename')"
            @keyup.enter="saveCell(index, 'filename')"
            @keyup.esc="discardCell(index, 'filename')"
            class="border p-1"
          />
          <span v-else>{{ row.filename }}</span>
          <div
            v-if="
              editingCell.rowIndex === index &&
              editingCell.field === 'filename' &&
              validationError
            "
            class="text-red-500 text-sm mt-1 break-words"
          >
            {{ validationError }}
          </div>
        </div>
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

      <template #actions-data="{ row, index }">
        <UDropdown
          :items="actionOptions(row, index)"
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

    <h2>Users</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const variableColumns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'dynamic',
    label: 'Dynamic Value',
  },
  {
    key: 'static',
    label: 'Static Value',
  },
  {
    key: 'description',
    label: 'Description',
  },
];

const variablePreviewColumns = [
  {
    key: 'name',
    label: 'Name',
  },
];

const variableRows = ref([
  {
    name: 'repoName',
    dynamic: '',
    static: '',
    description: 'Name of current repository',
  },
  {
    name: 'orgName',
    dynamic: '',
    static: '',
    description: 'Name of current organisation',
  },
  {
    name: 'userEmail',
    dynamic: '',
    static: '',
    description: 'Your email address',
  },
  {
    name: 'complianceEmail',
    dynamic: '',
    static: 'compliance@yourcompany.com',
    description: 'Email for CoC violations etc.',
  },
]);

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

let rows = useState('rows', () => [
  {
    name: 'README',
    filename: 'README.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
    custom: '',
    contents: '# README',
  },
  {
    name: 'Code of Conduct',
    filename: 'CODE_OF_CONDUCT.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
    custom: '',
    contents: '# Code of Conduct',
  },
  {
    name: 'Contribution Guidelines',
    filename: 'CONTRIBUTING.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
    custom: '',
    contents: '# Contribution Guidelines',
  },
  {
    name: 'License',
    filename: 'LICENSE.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
    custom: '',
    contents: '# License',
  },
  {
    name: 'Notice',
    filename: 'NOTICE.md',
    always: false,
    public: false,
    private: false,
    hidden: false,
    custom: '',
    contents: '# Notice',
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

// Fixme: autofill from GH
const repos = (row) => [
  [
    {
      label: 'Repo 1',
    },
    {
      label: 'Repo 2',
    },
  ],
];

const actionOptions = (row, index) => [
  [
    {
      label: 'Preview',
      icon: 'i-heroicons-eye',
      click: () => openEditor(row, true),
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate-20-solid',
      click: () => duplicateRow(row),
    },
  ],
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => openEditor(row, false),
    },
    {
      label: 'Rename',
      icon: 'i-heroicons-tag',
      click: () => editCell(index, 'name'),
    },
    {
      label: 'File rename',
      icon: 'i-heroicons-document',
      click: () => editCell(index, 'filename'),
    },
  ],
  [
    {
      label: 'Download',
      icon: 'i-heroicons-arrow-down-tray',
      click: () => downloadFile(row),
    },
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
  row.custom = '';
};

const deleteRow = function (row) {
  rows.value = rows.value.filter((el) => {
    return el.name !== row.name;
  });
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

function openEditor(row, previewMode) {
  router.push({
    path: `policies/edit/${row.filename}`,
    query: { previewMode },
  });
}

function newRow() {
  router.push({
    path: `policies/new`,
  });
}

const downloadFile = function (row) {
  // Determine the MIME type and file extension based on the filename
  const isMarkdown = row.filename.endsWith('.md');
  const mimeType = isMarkdown ? 'text/markdown' : 'text/plain';

  // Create a Blob with the appropriate MIME type
  const blob = new Blob([row.contents], { type: mimeType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = row.filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

const editingCell = ref({ rowIndex: null, field: null });
const tempValue = ref(''); // Temporary value for editing
const validationError = ref(''); // Error message for validation

function editCell(rowIndex, field) {
  // if there's an error in another cell revert the value
  if (validationError.value && editingCell.value.rowIndex !== null) {
    rows.value[editingCell.value.rowIndex][editingCell.value.field] =
      tempValue.value.trim();
    validationError.value = '';
  }
  editingCell.value = { rowIndex, field };
  tempValue.value = rows.value[rowIndex][field]; // Load current value into tempValue
}

function saveCell(rowIndex, field) {
  const newValue = rows.value[rowIndex][field];

  const isDuplicate = rows.value.some(
    (row, idx) => idx !== rowIndex && row[field] === newValue,
  );

  if (isDuplicate) {
    validationError.value = `The ${field} "${newValue}" already exists.`;
    return; // Exit without saving
  }

  validationError.value = '';
  editingCell.value = { rowIndex: null, field: null };
}

function discardCell(rowIndex, field) {
  rows.value[rowIndex][field] = tempValue.value.trim();
  validationError.value = '';
  editingCell.value = { rowIndex: null, field: null };
}

useHead({
  title: 'Policies',
});
</script>

<style scoped>
textarea {
  font-family: monospace;
}
</style>
