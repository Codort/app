import { ref } from 'vue';
import DOMPurify from 'dompurify';
import { useRouter } from 'vue-router';

export function useEditorState({ initialPreview }) {
  const rows = useState('rows');
  const editorNameError = ref('');
  const editorFilenameError = ref('');
  const router = useRouter();
  const showPreview = ref(initialPreview);

  function validateToggle(rowIndex) {
    console.log(showPreview.value);
    if (showPreview.value && !checkNames(rowIndex)) {
      showPreview.value = false;
    }
  }

  function checkNames(rowIndex) {
    const row = rows.value[rowIndex];
    const newName = row.name;
    const newFilename = row.filename;

    const isDuplicateName = rows.value.some(
      (row, idx) => idx !== rowIndex && row.name === newName,
    );
    const isDuplicateFilename = rows.value.some(
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
      rows.value[rowIndex].contents = DOMPurify.sanitize(markdownContent);
    }

    if (!checkNames(rowIndex)) {
      return;
    }

    router.push('/compliance/policies');
  }

  function deleteRow(rowIndex) {
    rows.value = rows.value.filter((el) => {
      return el.name !== rows.value[rowIndex].name;
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
