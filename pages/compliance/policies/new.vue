<template>
  <div>
    <NuxtLayout
      name="policy-editor"
      :showPreview="false"
      :rowIndex="rowIndex"
      :discardChanges="discardChanges"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Current row data
const rows = useState('rows');
rows.value.push({
  name: '',
  filename: '',
  always: false,
  public: false,
  private: false,
  hidden: false,
  custom: '',
  contents: '',
});

const rowIndex = rows.value.length - 1;

// Discard changes and go back
function discardChanges(editorNameError, editorFilenameError) {
  rows.value.pop();
  editorNameError = '';
  editorFilenameError = '';
  router.push('/compliance/policies');
}

useHead({
  title: 'New policy',
});
</script>

<style scoped></style>
