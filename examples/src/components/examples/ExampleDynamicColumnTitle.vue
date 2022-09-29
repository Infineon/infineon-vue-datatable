<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'titleWithHref', type: 'D' }"
      :can-edit="true"
      @save-row="saveRow"
    >
      <!--Default column title slot-->
      <template #column="{ title }">
        <span style="color:red">{{ title }}</span>
      </template>

      <!--Special column title slot-->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #column.TitleWithHref="{ title }">
        <a
          href="https://www.example.com"
          target="_blank"
        >{{ title }}</a>
      </template>
    </InfineonDatatable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const rows = ref([
  { id: 1, titleWithHref: 'item1', type: 'A' },
  { id: 2, titleWithHref: 'item2' },
  { id: 3, titleWithHref: 'item3', type: 'C' },
  { id: 4, titleWithHref: 'item4', type: 'B' },
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

const saveRow = (changedRow) => {
  // update store here
  const originalRow = rows.value.find((r) => r.id === changedRow.id);
  originalRow.titleWithHref = changedRow.titleWithHref;
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
    key: 'titleWithHref',
    title: 'TitleWithHref',
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
