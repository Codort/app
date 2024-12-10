<template>
  <div
    class="overflow-y-hidden overflow-x-hidden border-2 border-black dark:border-white rounded-md h-[85vh]"
  >
    <div
      class="border-b-2 border-black dark:border-white ps-5 py-3 rounded-md justify-between items-center sticky top-0 bg-inherit z-10"
    >
      <div class="flex gap-4">
        <div class="flex flex-col shrink grow-0">
          <input v-if="!showPreview" v-model="row.name" class="border p-1" />
          <span v-else>{{ row.name }}</span>
          <span
            v-if="editorNameError"
            class="text-red-500 text-sm mt-1 break-words"
            >{{ editorNameError }}</span
          >
        </div>
        as
        <div class="flex flex-col shrink grow-0">
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
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-2">
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
    <div class="flex w-full h-full bg-black overflow-y-auto">
      <div class="w-[60%] h-full">
        <textarea
          v-if="!showPreview"
          v-model="markdownContent"
          placeholder="Create policy..."
          class="h-full w-full p-4 resize-none rounded-md focus:outline-none"
        ></textarea>
        <div v-else v-html="mdc" class="p-4 w-full h-full" id="mdc"></div>
      </div>
      <div class="w-[40%] h-full border-l-2 p-4">
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

const complianceDocuments = useState('complianceDocuments');
const complianceVariables = useState('complianceVariables');

const templates = [
  {
    label: 'Licenses',
    icon: 'i-heroicons-information-circle',
    content: [
      {
        label: 'MIT',
        description: 'A permissive and commonly used OSI approved license.',
        content: {
          type: 'LICENSE',
          text: `MIT License

Copyright (c) {{ year }} {{ copyrightName }}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

[test](https://www.google.com)

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
        },
      },
      {
        label: 'GPL-2',
        description:
          'A strong, copyleft OSI-approved license. GPL-3 is more common.',
        content: { type: 'LICENSE', text: 'Lorem ipsum' },
      },
    ],
  },
];

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
  row.name = template.content.type;
  row.filename =
    template.content.type.toUpperCase().replace(/\s/g, '_') + '.md';
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

    if (entry) {
      return entry.static ? entry.static : entry.value;
    }
    return match; // Replace or keep original if not found
  });

  if (row.filename.endsWith('.md')) {
    output = mdParser.render(output);
  } else {
    output = output.replace(/\n/g, '<br><br>');
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
</style>
