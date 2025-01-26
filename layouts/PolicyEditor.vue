<template>
  <div
    class="overflow-hidden border-2 border-black dark:border-white rounded-md h-[85vh]"
  >
    <!-- header -->
    <div
      class="h-[10rem] sm:h-[7rem] overflow-hidden border-b-2 border-black dark:border-white ps-5 py-3 rounded-md justify-between items-center sticky top-0 bg-white dark:bg-black z-10"
    >
      <div class="block sm:flex gap-4">
        <div class="block sm:flex flex-col shrink grow-0">
          <input v-if="!showPreview" v-model="row.name" class="border p-1" />
          <span v-else>{{ row.name }}</span>
          <span
            v-if="editorNameError"
            class="text-red-500 text-sm mt-1 break-words"
            >{{ editorNameError }}</span
          >
        </div>
        as
        <div class="block sm:flex flex-col shrink grow-0">
          <input
            v-if="!showPreview"
            v-model="row.filename"
            class="border p-1"
          />
          <span v-else>{{ row.filename }}</span>
          <span
            v-if="editorFilenameError"
            class="text-red-500 text-sm mt-1 break-words"
            >{{ editorFilenameError }}</span
          >
        </div>
      </div>
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center gap-x-2 py-2">
          Edit
          <UToggle
            on-icon="i-heroicons-pencil-square-20-solid"
            off-icon="i-heroicons-eye"
            v-model="showPreview"
            :ui="{ inactive: 'bg-coral dark:bg-coral' }"
            @change="validateToggle(rowIndex, showPreview)"
          />
          Preview
        </div>
        <div class="flex items-center gap-x-2 me-4">
          <UButton
            @click="props.discardChanges(editorNameError, editorFilenameError)"
            >Discard</UButton
          >
          <UButton @click="saveChanges(rowIndex, markdownContent)"
            >Save</UButton
          >
          <UButton @click="deleteRow(rowIndex)" color="red">Delete</UButton>
        </div>
      </div>
    </div>
    <div
      class="block lg:flex w-full h-[calc(100%-10rem)] sm:h-[calc(100%-7rem)] bg-white dark:bg-black overflow-hidden grow-0"
    >
      <!-- Main section -->
      <div
        class="w-full lg:w-[45rem] h-[80%] lg:h-full font-mono grow-0 overflow-y-hidden"
      >
        <textarea
          v-if="!showPreview"
          v-model="markdownContent"
          placeholder="Create policy..."
          class="h-full w-full p-4 resize-none rounded-md focus:outline-none overflow-y-auto"
        ></textarea>
        <div
          v-else
          v-html="mdc"
          class="h-full w-full p-4 overflow-y-auto"
          id="mdc"
        ></div>
      </div>
      <!-- Right sidebar -->
      <div
        class="w-full lg:w-[calc(100%-45rem)] h-[20%] lg:h-full border-t-2 lg:border-l-2 border-gray-500 p-4 overflow-y-auto"
      >
        <div v-if="!showPreview">
          <h3>Templates</h3>
          <UAccordion :items="templates">
            <template #item="{ item: parentItem }">
              <UAccordion
                :items="parentItem.content"
                class="ps-3"
                color="lime"
                variant="solid"
              >
                <template #item="{ item: childItem }">
                  <div class="flex flex-col">
                    <p class="text-base">{{ childItem.description }}</p>
                    <UButton
                      class="text-center mt-2 self-center"
                      icon="i-heroicons-cursor-arrow-rays"
                      @click="useTemplate(childItem)"
                      >Use this template</UButton
                    >
                  </div>
                </template>
              </UAccordion>
            </template>
          </UAccordion>
        </div>
        <div v-else>
          <h3>Variables</h3>
          <UTable :rows="complianceVariables" :columns="variablePreviewColumns">
            <template #value-data="{ row, index }">
              <div class="">
                <input
                  v-if="!row.static"
                  v-model="complianceVariables[index].value"
                  placeholder="Enter test value"
                  class="border p-1"
                />
                <span v-else class="cursor-default">{{ row.static }}</span>
              </div>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import markdownit from 'markdown-it';
import { ref } from 'vue';
import templates from '~/data/templates.js';

const complianceDocuments = useState('complianceDocuments');
const complianceVariables = useState('complianceVariables');

const filteredTemplates = function (type) {
  if (type) {
    return templates.filter((template) => {
      return template.type === type;
    });
  } else {
    return templates;
  }
};

const variablePreviewColumns = [
  {
    key: 'variable',
    label: 'Variable',
  },
  {
    key: 'value',
    label: 'Value',
  },
];

const props = useAttrs();
const rowIndex = props.rowIndex;
const row = complianceDocuments.value[rowIndex];
const initialPreview = ref(props.showPreview);

const useTemplate = function (template) {
  if (row.name === '') {
    row.name = template.content.name;
  }
  if (row.filename === '') {
    row.filename = template.content.filename;
  }
  markdownContent.value = template.content.text;
};

// Markdown parser
const markdownContent = ref(row.contents);
const mdParser = markdownit({
  breaks: true, // Converts '\n' to <br>
  html: true, // Optionally enable HTML tags in the source
});
const mdc = computed(() => {
  let output;

  const pattern = /\{\{\s*(\w+)\s*\}\}/g;

  output = markdownContent.value.replace(pattern, (match, variable) => {
    const entry = complianceVariables.value.find(
      (row) => row.variable === variable,
    );

    if (entry && entry !== '' && (entry.static || entry.value)) {
      const tmp = entry.static ? entry.static : entry.value;
      return `<span class='found'>${tmp}</span>`;
    }

    return `<span class='missing'>${match}</span>`;
  });

  if (row.filename.endsWith('.md')) {
    output = mdParser.render(output);
  } else {
    output = output
      .replace(/(?<!<[^>]*)\n/g, '<br>')
      .replace(/(?<!<[^>]*) /g, '&nbsp;<wbr>');
  }
  return output;
});

const {
  editorNameError,
  editorFilenameError,
  validateToggle,
  saveChanges,
  showPreview,
  deleteRow,
} = useEditorState({ initialPreview });
</script>

<style lang="css">
#mdc p {
  @apply pb-4;
}

.missing {
  @apply bg-coral rounded-md p-[2px] dark:text-black;
}

.found {
  @apply bg-cdtyellow rounded-md p-[2px] dark:text-black;
}
</style>
