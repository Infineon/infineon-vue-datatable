<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      @save-row="saveRow"
      @edit-mode-value="editModeValue"
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
    sortable: true,
    sortType: 'STRING',
    editable: true,
    valueResolver: (row) => getTypeForRow(row),
    possibleValues: dropdownOptions.value,
  },
];

</script>
