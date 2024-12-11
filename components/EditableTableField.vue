<template>
  <div @dblclick="editCell()" class="cursor-text">
    <input
      v-if="editingCell.rowIndex === index && editingCell.field === colName"
      v-model="newValue"
      placeholder="Enter value..."
      @blur="saveCell()"
      @keyup.enter="saveCell()"
      @keyup.esc="discardCell()"
      class="border p-1"
    />
    <span v-else>{{ rows[index][colName] }}</span>
    <div
      v-if="
        editingCell.rowIndex === index &&
        editingCell.field === colName &&
        validationError
      "
      class="text-red-500 text-sm mt-1 break-words"
    >
      <!-- TODO: Break validation error so it doesn't make columns longer -->
      {{ validationError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  colName: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  editingCell: {
    type: Object,
    required: true,
  },
  rows: {
    type: Object,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const rowIndex = props.index;
const field = props.colName;
const editingCell = toRef(props, 'editingCell');
const rows = toRef(props, 'rows');
const newValue = ref('');
const validationError = ref('');

function editCell() {
  validationError.value = '';
  newValue.value = rows.value[rowIndex][field];
  editingCell.value.rowIndex = rowIndex;
  editingCell.value.field = field;
}

function saveCell() {
  const isDuplicate = rows.value.some(
    (row, idx) => idx !== rowIndex && row[field] === newValue.value,
  );

  if (props.required && newValue.value === '') {
    validationError.value = `The ${field} cannot be empty.`;
    return; // Exit without saving
  }

  if (props.required && isDuplicate) {
    validationError.value = `The ${field} "${newValue.value}" already exists.`;
    return; // Exit without saving
  }

  if (field === 'filename') {
    const validFilename = /^[a-zA-Z0-9_\-. ]+$/;
    if (!validFilename.test(newValue.value)) {
      validationError.value = `The filename "${newValue.value}" is not valid.`;
      return; // Exit without saving
    }
  }

  if (field === 'variable') {
    const validFilename = /^[a-z0-9]+$/i;
    if (!validFilename.test(newValue.value)) {
      validationError.value = `Variable name must be alphanumeric.`;
      return; // Exit without saving
    }
  }

  rows.value[rowIndex][field] = newValue.value;
  editingCell.value.rowIndex = null;
  editingCell.value.field = null;
  validationError.value = '';
}

function discardCell() {
  validationError.value = '';
  newValue.value = '';
  editingCell.value.rowIndex = null;
  editingCell.value.field = null;

  // edge case only happens when a new variable is created
  if (field === 'variable' && rows.value[rowIndex][field] === '') {
    rows.value.pop();
  }
}
</script>

<style></style>
