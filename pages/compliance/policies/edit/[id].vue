<template>
  <div>
    <NuxtLayout
      name="policy-editor"
      :showPreview="previewMode"
      :rowIndex="rowIndex"
      :discardChanges="discardChanges"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

// Router and route params
const route = useRoute();
const router = useRouter();
const filename = route.params.id;
const previewMode = route.query.previewMode === 'true';
const rows = useState('rows');
const rowIndex = rows.value.findIndex((x) => x.filename === filename);

// Save details before editing
const row = rows.value[rowIndex];
const oldName = row.name;
const oldFilename = row.filename;

// Discard changes and go back
function discardChanges(editorNameError, editorFilenameError) {
  row.name = oldName;
  row.filename = oldFilename;
  editorNameError = '';
  editorFilenameError = '';
  router.push('/compliance/policies');
}

useHead({
  title: `Edit ${oldName}`,
});
</script>

<style scoped></style>
