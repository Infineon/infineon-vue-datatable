<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :exportable="true"
    />
  </div>
</template>

<script setup>
import { InfineonDatatable } from '../../../../lib';

const rows = [
  { id: 1, name: 'item1', description: 'description item 1' },
  { id: 2, name: 'item2,dealing,with,commas', description: 'description item 2' },
  { id: 3, name: 'item3', description: 'description item 3' },
  { id: 4, name: 'item4', description: 'description item 4' },
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
    title: 'Column, with comma',
    sortable: true,
    sortType: 'STRING',
  },
  {
    key: 'description',
    title: 'Description',
    sortable: true,
    sortType: 'STRING',
  },
];
</script>
