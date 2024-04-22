<template>
  <div>
    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
      :can-edit="true"
      :additional-actions="[ {
                               title: 'Print to Console.log',
                               label: 'Console.log',
                               action: logToConsole,
                               icon: ['fas', 'exclamation-triangle']},
                              ]"
      :popup-menu-actions="[ {
                               title: 'Open an alert box',
                               label: 'Alert',
                               action: showAlert,
                               icon: ['fas', 'terminal']
                             },
                             {
                               title: 'Open an alert box',
                               label: 'Alert',
                               action: showAlert,
                               icon: ['fas', 'terminal'],
                               canCloseMenu: true
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
