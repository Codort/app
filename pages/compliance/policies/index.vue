<template>
  <div>
    <div class="flex justify-between items-center">
      <h2>Variables</h2>
      <div>
        <UButton
          class=""
          icon="i-heroicons-document-arrow-up"
          @click="newVariable()"
          >New</UButton
        >
        <UButton
          v-if="selectedVariables.length"
          class="mx-4"
          icon="i-heroicons-document-duplicate"
          @click="duplicateVariables()"
          >Duplicate</UButton
        >
        <UButton
          v-if="selectedVariables.length"
          class=""
          color="red"
          icon="i-heroicons-trash"
          @click="deleteVariables()"
          >Delete</UButton
        >
      </div>
    </div>
    <UTable
      :rows="complianceVariables"
      :columns="variableColumns"
      v-model="selectedVariables"
    >
      <template #variable-data="{ index }">
        <EditableTableField
          col-name="variable"
          :index="index"
          :rows="complianceVariables"
          :editing-cell="editingCell"
        />
      </template>
      <template #dynamic-data="{ row }">
        <div v-if="!row.static" class="flex items-center w-[200px] mx-0 px-0">
          <USelectMenu
            v-model="row.dynamic"
            :options="dynamicOptions"
            option-attribute="label"
            class="me-2 grow"
            :required="false"
          >
            <!-- TODO: Fix hover effect so padding isn't ignored -->
            <template #option="{ option }">
              <div
                class="w-full cursor-pointer"
                @mouseover="hoveredItem = option.label"
                @mouseleave="hoveredItem = null"
              >
                <div class="w-full px-0 mx-0">{{ option.label }}</div>
                <div
                  v-if="hoveredItem === option.label"
                  class="text-xs text-gray-500"
                >
                  {{ option.description }}
                </div>
              </div>
            </template>
          </USelectMenu>
          <span
            class="w-4 h-4 shrink-0"
            @click.stop.prevent="row.dynamic = null"
            aria-label="Clear selection"
          >
            <UIcon
              name="i-heroicons-x-mark"
              v-if="row.dynamic"
              class="w-4 h-4 text-black dark:text-white cursor-pointer"
            />
          </span>
        </div>
      </template>
      <template #static-data="{ row }">
        <input
          v-if="!row.dynamic"
          v-model="row.static"
          placeholder="Enter value..."
          class="border p-1"
        />
      </template>
      <template #description-data="{ index }">
        <EditableTableField
          col-name="description"
          :index="index"
          :rows="complianceVariables"
          :editing-cell="editingCell"
          :required="false"
        />
      </template>
      <template #actions-data="{ row, index }">
        <UDropdown
          :items="variableActionOptions(row, index)"
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
    <div class="flex justify-between items-center">
      <h2>Documents</h2>
      <div>
        <UButton
          class=""
          icon="i-heroicons-document-arrow-up"
          @click="newDocument()"
          >New</UButton
        >
        <UButton
          v-if="selectedDocuments.length"
          class="mx-4"
          icon="i-heroicons-document-duplicate"
          @click="duplicateDocuments()"
          >Duplicate</UButton
        >
        <UButton
          v-if="selectedDocuments.length"
          class=""
          color="red"
          icon="i-heroicons-trash"
          @click="deleteDocuments()"
          >Delete</UButton
        >
      </div>
    </div>
    <UTable :rows="filteredRows" :columns="columns" v-model="selectedDocuments">
      <template #name-data="{ index }">
        <EditableTableField
          col-name="name"
          :index="index"
          :rows="complianceDocuments"
          :editing-cell="editingCell"
        />
      </template>
      <template #filename-data="{ index }">
        <EditableTableField
          col-name="filename"
          :index="index"
          :rows="complianceDocuments"
          :editing-cell="editingCell"
        />
      </template>

      <template #always-data="{ index }">
        <UCheckbox
          v-model="complianceDocuments[index].always"
          @change="toggleCheckbox($event, index, 'always')"
        />
      </template>

      <template #public-data="{ index }">
        <UCheckbox
          v-model="complianceDocuments[index].public"
          @change="toggleCheckbox($event, index, 'public')"
        />
      </template>

      <template #private-data="{ index }">
        <UCheckbox
          v-model="complianceDocuments[index].private"
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
    key: 'variable',
    label: 'Variable',
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
  {
    key: 'actions',
  },
];

let complianceVariables = useState('complianceVariables', () => [
  {
    variable: 'repoName',
    dynamic: null,
    static: null,
    description: 'Name of current repository',
    value: '',
  },
  {
    variable: 'orgName',
    dynamic: null,
    static: null,
    description: 'Name of current organisation',
    value: '',
  },
  {
    variable: 'userEmail',
    dynamic: null,
    static: null,
    description: 'Your email address',
    value: '',
  },
  {
    variable: 'year',
    dynamic: null,
    static: null,
    description: 'Current year',
    value: '',
  },
  {
    variable: 'complianceEmail',
    dynamic: null,
    static: null,
    description: 'Email for CoC violations etc.',
    value: 'compliance@yourcompany.com',
  },
]);

const selectedVariables = ref([]);
const selectedDocuments = ref([]);

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

let complianceDocuments = useState('complianceDocuments', () => [
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
  complianceDocuments.value[rowIndex].always = false;
  complianceDocuments.value[rowIndex].public = false;
  complianceDocuments.value[rowIndex].private = false;

  complianceDocuments.value[rowIndex][checkboxType] = el;
}

const filteredRows = computed(() => {
  return complianceDocuments.value.filter((row) => {
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

const hoveredItem = ref(null);

const dynamicOptions = [
  {
    label: 'Repo name',
    description: 'Name of active repository',
  },
  {
    label: 'Repo owner',
    description: 'Owner of active repository',
  },
  {
    label: 'Org name',
    description: 'Name of active organisation',
  },
  {
    label: 'Org owner',
    description: 'Owner of active organisation',
  },
  {
    label: 'Year',
    description: 'Current year',
  },
];

const variableActionOptions = (row, index) => [
  [
    {
      label: 'Rename',
      icon: 'i-heroicons-tag',
      click: () => editCell(index, 'variable'),
    },
    {
      label: 'Edit description',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => editCell(index, 'description'),
    },
    {
      label: 'Duplicate',
      icon: 'i-heroicons-document-duplicate',
      click: () => duplicateVariable(row),
    },
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteRow(complianceVariables, row, 'variable'),
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
      icon: 'i-heroicons-document-duplicate',
      click: () => duplicateDocument(row),
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
      icon: 'i-heroicons-archive-box',
      click: () => archiveRow(row),
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: () => deleteRow(complianceDocuments, row, 'name'),
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

const deleteVariables = function () {
  selectedVariables.value.forEach((row) =>
    deleteRow(complianceVariables, row, 'variable'),
  );
  selectedVariables.value = [];
};

const deleteDocuments = function () {
  selectedDocuments.value.forEach((row) =>
    deleteRow(complianceDocuments, row, 'name'),
  );
  selectedDocuments.value = [];
};

const deleteRow = function (data, row, field) {
  data.value = data.value.filter((el) => {
    return el[field] !== row[field];
  });
};

const duplicateDocuments = function () {
  selectedDocuments.value.forEach((row) => duplicateDocument(row));
  selectedDocuments.value = [];
};

const duplicateDocument = function (row) {
  const newRow = { ...row };

  const oldNames = new Set(complianceDocuments.value.map((el) => el.name));

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

  complianceDocuments.value.push(newRow);
};

const duplicateVariables = function () {
  selectedVariables.value.forEach((row) => duplicateVariable(row));
  selectedVariables.value = [];
};

const duplicateVariable = function (row) {
  const newRow = { ...row };

  const oldNames = new Set(complianceVariables.value.map((el) => el.variable));

  let newName = newRow.variable;
  let idx = 0;

  while (oldNames.has(newName)) {
    idx++;
    newName = `${newRow.variable}${idx}`;
  }

  newRow.variable = newName;

  complianceVariables.value.push(newRow);
};

function openEditor(row, previewMode) {
  router.push({
    path: `policies/edit/${row.filename}`,
    query: { previewMode },
  });
}

function newDocument() {
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

const editingCell = ref({
  rowIndex: null,
  field: null,
});

function editCell(rowIndex, field) {
  editingCell.value.rowIndex = rowIndex;
  editingCell.value.field = field;
}

function newVariable() {
  complianceVariables.value.push({
    variable: '',
    dynamic: '',
    static: '',
    description: '',
    value: '',
  });
  editCell(complianceVariables.value.length - 1, 'variable');
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
