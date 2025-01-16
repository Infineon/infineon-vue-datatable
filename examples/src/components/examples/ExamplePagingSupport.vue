<template>
  <div>
    <InfineonDatatable
      :data="pageData"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :exportable="true"
      :onPageChange="onPageChange"
      :paging="{
        onPageChange: onPageChange,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageData: pageData,
        pageCount: pageCount,
      }"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const rows = ref([
  { id: 1, name: 'item1', description: 'description item 1' },
  { id: 2, name: 'item2,dealing,with,commas', description: 'description item 2' },
  { id: 3, name: 'item3,\'dealing with single quotes\'', description: 'description item 3' },
  { id: 4, name: 'item4,"dealing with double quotes"', description: 'description item 4' },
  { id: 5, name: 'item5,"dealing with double quotes",followed by a comma', description: 'description item 5' },
  { id: 6, name: 'item6, dealing with backslash\\', description: 'description item 6' },
  { id: 7, name: 'item7, dealing with backslash\\ and newline\nnewline should appear here', description: 'description item 7' },
]);
for (let i = 8; i <= 50; i++) {
  rows.value.push({
    id: i,
    name: 'item' + i,
    description: 'description item ' + i
  });
}

const pageNumber = ref(0);
const pageSize = ref(10);
const pageCount = computed(() => {
  return rows.value ? rows.value.length : 0;
  // if (count / currentPageSize.value < currentPage.value) {
  //   currentPage.value = parseInt(pageCount.value / currentPageSize.value, 10);
  // }
});
// const sorting = ref({ })

const pageData = computed(() => {
  return rows.value.slice(
    pageNumber.value * pageSize.value,
    (pageNumber.value + 1) * pageSize.value,
  )
});

const onPageChange = (newPageNumber, newPageSize, sorting) => {
  // eslint-disable-next-line no-alert
  // alert(`Page changed. \n Page number: ${pageNumber}, Page size: ${pageSize}, Sorted column: ${sortedColumn}, Sort order: ${sortOrder}`);
  let newSorting = sorting ? sorting : { key: '-', type: '-' };
  console.log(`Page changed. \n Page number: ${newPageNumber}, Page size: ${newPageSize}, Sorted column: ${newSorting.key}, Sort order: ${newSorting.type}`);
  console.log(sorting);
  pageNumber.value = newPageNumber;
  pageSize.value = newPageSize;
}

const columns = [
  {
    key: 'id',
    title: 'ID column title',
    sortable: true,
    sortType: 'NUMBER',
  },
  {
    key: 'name',
    title: 'Column 1',
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
