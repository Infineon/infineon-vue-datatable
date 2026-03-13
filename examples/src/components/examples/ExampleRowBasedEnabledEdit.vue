<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'A' }"
      :can-edit="true"
      :disable-action-buttons-for="{ system: ['System B', 'System C'] }"
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
  {
    id: 1, name: 'item1', system: 'System A', type: 'A',
  },
  {
    id: 2, name: 'item2', system: 'System B', type: 'B',
  },
  {
    id: 3, name: 'item3', system: 'System A', type: 'C',
  },
  {
    id: 4, name: 'item4', system: 'System C', type: 'B',
  },
]);

const dropdownOptions = computed(() => [
  { id: 'A', label: 'The letter A' },
  { id: 'B', label: 'The letter B' },
  { id: 'C', label: 'The letter C' },
  { id: 'D', label: 'The letter D' },
  { id: 'E', label: 'The letter E' },
  { id: 'F', label: 'The letter F' },
]
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
    key: 'system',
    title: 'System',
    name: 'system',
    sortable: true,
    sortType: 'STRING',
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
];

</script>
