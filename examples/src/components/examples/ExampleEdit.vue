<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      @save-row="saveRow"
      @edit-mode-value="editModeValue"
      @cancel-row="cancelRow"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const rows = ref([
  { id: 1, name: 'item1', type: 'A' },
  { id: 2, name: 'item2' },
  { id: 3, name: 'item3', type: 'C' },
  { id: 4, name: 'item4', type: 'B' },
]);

const dropdownOptions = computed(() => [
  { id: 'A', label: 'The letter A' },
  { id: 'B', label: 'The letter B' },
  { id: 'C', label: 'The letter C' },
  { id: 'D', label: 'The letter D' },
  { id: 'E', label: 'The letter E' },
  { id: 'F', label: 'The letter F' }]
  .sort((a, b) => a?.label?.localeCompare(b?.label)));

function getTypeForRow(row) {
  return dropdownOptions.value.find((r) => r.id === row.type)?.label;
}

const editModeValue = (changedRow) => {
  // update store here
  const originalRow = rows.value.find((r) => r.id === changedRow.id);
  console.log('get current row vals while in editMode:', originalRow, changedRow);
  originalRow.name = changedRow.name;
  originalRow.type = changedRow.type;
};

const saveRow = (changedRow) => {
  // update store here
  const originalRow = rows.value.find((r) => r.id === changedRow.id);
  originalRow.name = changedRow.name;
  originalRow.type = changedRow.type;
};

const cancelRow = (changedRow) => {
  console.log('cancelling row', changedRow);
};
const columns = [
  {
    key: 'id',
    title: 'ID',
    sortable: true,
    sortType: 'NUMBER',
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sortType: 'STRING',
    editable: true,
  },
  {
    key: 'type',
    title: 'Type',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
    // template: false,
  },
  {
    key: 'type',
    title: 'Type1',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
  {
    key: 'type',
    title: 'Type2',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
  {
    key: 'type',
    title: 'Type3 px min width',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
    minWidth: '20px',
  },
  {
    key: 'type',
    title: 'Type4 em min width',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
    minWidth: '20em',
  },
  {
    key: 'type',
    title: 'Type5',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
  {
    key: 'type',
    title: 'Type6 with a very long title that influences the width of the other columns and thus reduces the size of the other columns',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
  {
    key: 'type',
    title: 'Type7',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
  {
    key: 'type',
    title: 'Type8',
    name: 'type',
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
];

</script>
