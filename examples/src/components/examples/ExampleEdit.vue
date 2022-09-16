<template>
  <div>
    <InfineonDatatable
      :data="filteredRows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      @save-row="saveRow"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const rows = ref([
  { id: 1, name: 'item1', type: {'id':11, 'name':'Option A'} },
  { id: 2, name: 'item2' },
  { id: 3, name: 'item3', type: {'id':12, 'name':'Option B'}},
  { id: 4, name: 'item4', type: {'id':13, 'name':'Option C'}},
]);

// filters to be handled in store
const filteredRows = rows.value.map((row) => {
  if (row.type) {
    row.type = row.type.name
  }
  return row;
});

const normalize = (item) => ({ id: item.id, label: item.name });

const dropdownOptions = computed(() => [{'id':11, 'name':'Option A'},{'id':12, 'name':'Option B'},{'id':13 , 'name':'Option C'}]
  .map(normalize)
  .sort((a, b) => a?.label?.localeCompare(b?.label)));


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
    possibleValues: dropdownOptions.value
  },
];




</script>
