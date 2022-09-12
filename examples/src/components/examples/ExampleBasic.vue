<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </div>
</template>

<script setup>
import { InfineonDatatable } from '@infineon/infineon-vue-datatable';

const rows = [
  { id: 1, name: 'item1' },
  { id: 2, name: 'item2' },
  { id: 3, name: 'item3' },
  { id: 4, name: 'item4' },
];

const columns = [
  {
    key: 'id',
    title: 'ID column title',
    sortable: true,
    sortType: 'NUMBER',
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    sortType: 'STRING',
  },
];
</script>
