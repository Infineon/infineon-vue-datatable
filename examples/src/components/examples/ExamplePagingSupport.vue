<template>
  <div>
    <InfineonDatatable 
      :data="pageData" 
      :columns="columns" 
      :default-sort="{ key: 'name', type: 'D' }" 
      :exportable="true"
      :paging="{
        pageNumber: pageNumber,
        pageSize: pageSize,
        totalDataCount: totalCount,
        onPageChange: onPageChange,
        fetchAllData: fetchAllData,
      }" />
    <button 
      class="btn btn-sm btn-primary" 
      title="Download CSV File" 
      @click="loadDataRandom"
    >
      Load Data
    </button>
    <div>
      Total data count: {{ totalCount }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const loadData = (dataCount) => {
  const data = [
    { id: 1, name: 'item1', description: 'description item 1' },
    { id: 2, name: 'item2,dealing,with,commas', description: 'description item 2' },
    { id: 3, name: 'item3,\'dealing with single quotes\'', description: 'description item 3' },
    { id: 4, name: 'item4,"dealing with double quotes"', description: 'description item 4' },
    { id: 5, name: 'item5,"dealing with double quotes",followed by a comma', description: 'description item 5' },
    { id: 6, name: 'item6, dealing with backslash\\', description: 'description item 6' },
    { id: 7, name: 'item7, dealing with backslash\\ and newline\nnewline should appear here', description: 'description item 7' },
  ];
  for (let i = 8; i <= dataCount; i++) {
    data.push({
      id: i,
      name: 'item' + i,
      description: 'description item ${i}'
    });
  }
  return data;
};

const loadDataRandom = () => {
  const randomCount = Math.floor(Math.random() * (160 - 40 + 1)) + 40;
  rows.value = loadData(randomCount)
};

const rows = ref(loadData(50));

const pageNumber = ref(0);
const pageSize = ref(10);
const totalCount = computed(() => {
  return rows.value ? rows.value.length : 0;
});
const sorting = ref(undefined)

const pageData = computed(() => {

  const sortedData = rows.value.slice(0);
  if (sorting.value && sorting.value.key) {
    const { key, type } = sorting.value;
    const realColumns = columns.filter((c) => c.visible === undefined || c.visible === false);
    const foundColumn = realColumns.find((c) => c.key === key);
    if (foundColumn) {
      const {
        sortType,
        valueResolver,
        filterResolverKey,
      } = foundColumn;
      if (filterResolverKey || !valueResolver) {
        const vKey = filterResolverKey || key;

        if (sortType === 'NUMBER' && type === 'D') {
          sortedData.sort((a, b) => b[vKey] - a[vKey]);
        } else if (sortType === 'NUMBER' && type === 'A') {
          sortedData.sort((a, b) => a[vKey] - b[vKey]);
        } else if (sortType === 'STRING' && type === 'D') {
          sortedData.sort((a, b) => b[vKey]?.localeCompare(a[vKey]));
        } else if (sortType === 'STRING' && type === 'A') {
          sortedData.sort((a, b) => a[vKey]?.localeCompare(b[vKey]));
        }
      } else if (valueResolver) {
        if (sortType === 'NUMBER' && type === 'D') {
          sortedData.sort((a, b) => valueResolver(b) - valueResolver(a));
        } else if (sortType === 'NUMBER' && type === 'A') {
          sortedData.sort((a, b) => valueResolver(a) - valueResolver(b));
        } else if (sortType === 'STRING' && type === 'D') {
          sortedData.sort((a, b) => valueResolver(b)?.localeCompare(valueResolver(a)));
        } else if (sortType === 'STRING' && type === 'A') {
          sortedData.sort((a, b) => valueResolver(a)?.localeCompare(valueResolver(b)));
        }
      }
    }
  }

  return sortedData.slice(
    pageNumber.value * pageSize.value,
    (pageNumber.value + 1) * pageSize.value,
  )
});

const onPageChange = (newPageNumber, newPageSize, incomingSorting) => {
  pageNumber.value = newPageNumber;
  pageSize.value = newPageSize;
  sorting.value = incomingSorting;
}

function waitForTime(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const fetchAllData = async () => {
  await waitForTime(10000);
  return rows.value;
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
