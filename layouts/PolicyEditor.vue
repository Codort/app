<template>
  <div
    class="overflow-y-hidden overflow-x-hidden border-2 border-black dark:border-white rounded-md w-100 h-[85vh]"
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
    <div class="w-full h-full bg-black overflow-y-auto">
      <div v-if="!showPreview" class="w-full h-full overflow-y-auto">
        <textarea
          v-model="markdownContent"
          placeholder="Create policy..."
          class="w-full h-full p-4 resize-none rounded-md focus:outline-none"
        ></textarea>
      </div>
      <div v-if="showPreview" class="flex">
        <div v-html="mdc" class="p-4 w-[70%]"></div>
        <div class="h-100 w-[30%] border-l-2 p-4">
          <h3>Variables</h3>
          <UTable :rows="variableRows" :columns="variablePreviewColumns">
          </UTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { ref } from 'vue';

const rows = useState('rows');

const props = useAttrs();
const rowIndex = props.rowIndex;
const row = rows.value[rowIndex];
const initialPreview = ref(props.showPreview);

// Markdown parser
const markdownContent = ref(row.contents);
const mdParser = new MarkdownIt();
const mdc = computed(() => {
  if (row.filename.endsWith('.md')) {
    return mdParser.render(markdownContent.value);
  } else {
    return markdownContent.value.replace(/\n/g, '<br>');
  }
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
