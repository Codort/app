import { ref } from 'vue';
import DOMPurify from 'dompurify';
import { useRouter } from 'vue-router';

export function useEditorState({ initialPreview }) {
  const complianceDocuments = useState('complianceDocuments');
  const editorNameError = ref('');
  const editorFilenameError = ref('');
  const router = useRouter();
  const showPreview = ref(initialPreview);

  function validateToggle(rowIndex) {
    if (showPreview.value && !checkNames(rowIndex)) {
      showPreview.value = false;
    }
  }

  function checkNames(rowIndex) {
    const row = complianceDocuments.value[rowIndex];
    const newName = row.name;
    const newFilename = row.filename;

    const isDuplicateName = complianceDocuments.value.some(
      (row, idx) => idx !== rowIndex && row.name === newName,
    );
    const isDuplicateFilename = complianceDocuments.value.some(
      (row, idx) => idx !== rowIndex && row.filename === newFilename,
    );

    let nameError = '';
    let filenameError = '';

    if (isDuplicateName) {
      nameError = `The name "${newName}" already exists.`;
    } else if (newName === '') {
      nameError = 'Name cannot be empty.';
    }

    const validFilename = /^[a-zA-Z0-9_\-. ]+$/;
    if (isDuplicateFilename) {
      filenameError = `The filename "${newFilename}" already exists.`;
    } else if (!validFilename.test(newFilename)) {
      filenameError = `The filename "${newFilename}" is not valid.`;
    } else if (newFilename === '') {
      filenameError = 'Filename cannot be empty.';
    }

    editorNameError.value = nameError;
    editorFilenameError.value = filenameError;

    return !(editorNameError.value || editorFilenameError.value);
  }

  function saveChanges(rowIndex, markdownContent) {
    if (rowIndex !== null) {
      complianceDocuments.value[rowIndex].contents =
        DOMPurify.sanitize(markdownContent);
    }

    if (!checkNames(rowIndex)) {
      return;
    }

    router.push('/compliance/policies');
  }

  function deleteRow(rowIndex) {
    complianceDocuments.value = complianceDocuments.value.filter((el) => {
      return el.name !== complianceDocuments.value[rowIndex].name;
    });
    router.push('/compliance/policies');
  }

  return {
    editorNameError,
    editorFilenameError,
    validateToggle,
    saveChanges,
    showPreview,
    deleteRow,
  };
}
