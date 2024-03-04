<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      :additional-actions="[ {
                               title: 'Print to Console.log',
                               label: 'Logging',
                               action: logToConsole,
                               icon: ['fas', 'exclamation-triangle']},
                             {
                               title: 'Open an alert box',
                               label: 'Alert',
                               action: showAlert,
                               visible: isVisible,
                               icon: ['fas', 'terminal']
                             } ]"
    />
    <!-- don't forget to load any fontawesome icons in /plugins/fontawesome.js!! -->
  </div>
</template>

<script setup>
import { InfineonDatatable } from '../../../../lib';

const logToConsole = (row) => {
  // eslint-disable-next-line no-console
  console.log('we print to current row to console');
  // eslint-disable-next-line no-console
  console.log(row);
};
const showAlert = (row) => {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(row));
};
const isVisible = (row) => row.status === 'New';
const rows = [
  { id: 1, name: 'item1', status: 'New' },
  { id: 2, name: 'item2', status: 'Closed' },
  { id: 3, name: 'item3', status: 'Closed' },
  { id: 4, name: 'item4', status: 'New' },
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
