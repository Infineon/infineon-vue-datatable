<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :exportable="true"
      download-format="xlsx"
    />
  </div>
</template>

<script setup>
import { InfineonDatatable } from '../../../../lib';

const rows = [
  { id: 1, name: 'item1', description: 'description item 1' },
  { id: 2, name: 'item2,dealing,with,commas', description: 'description item 2' },
  { id: 3, name: 'item3,\'dealing with single quotes\'', description: 'description item 3' },
  { id: 4, name: 'item4,"dealing with double quotes"', description: 'description item 4' },
  { id: 5, name: 'item5,"dealing with double quotes",followed by a comma', description: 'description item 5' },
  { id: 6, name: 'item6, dealing with backslash\\', description: 'description item 6' },
  { id: 7, name: 'item7, dealing with backslash\\ and newline\nnewline should appear here', description: 'description item 7' },
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
