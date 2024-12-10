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
const complianceDocuments = useState('complianceDocuments');
complianceDocuments.value.push({
  name: '',
  filename: '',
  always: false,
  public: false,
  private: false,
  hidden: false,
  custom: '',
  contents: '',
});

const rowIndex = complianceDocuments.value.length - 1;

// Discard changes and go back
function discardChanges(editorNameError, editorFilenameError) {
  complianceDocuments.value.pop();
  editorNameError = '';
  editorFilenameError = '';
  router.push('/compliance/policies');
}

useHead({
  title: 'New policy',
});
</script>

<style scoped></style>
