<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      @save-row="saveRow"
    />
  </div>
</template>

<script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';
import { ref } from 'vue';

const rows = ref([
  { id: 1, name: 'item1', type: 'A' },
  { id: 2, name: 'item2' },
  { id: 3, name: 'item3', type: 'B' },
  { id: 4, name: 'item4', type: 'A' },
]);

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
    possibleValues: ['A', 'B', 'C', 'D', 'E', 'F'],
  },
];
</script>
