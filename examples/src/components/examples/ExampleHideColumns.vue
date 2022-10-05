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
import { ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const rows = ref([
  {
    id: 1,
    name: 'item1',
    type: 'Label A',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 2,
    name: 'item2',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 3,
    name: 'item3',
    type: 'Label B',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 4,
    name: 'item4',
    type: 'Label A',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 5,
    name: 'item5',
    type: 'Label A',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 6,
    name: 'item6',
    type: 'Label A',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 7,
    name: 'item7',
    type: 'Label A',
    column_a: 'Lorem',
    column_b: 'ipsum',
    column_c: 'dolor',
    column_d: 'amet',
    column_e: 'sit',

    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
]);

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
    hidable: true,
  },
  {
    key: 'type',
    title: 'Type',
    sortable: true,
    sortType: 'STRING',
    hidable: true,
  },
  {
    key: 'longText',
    title: 'Text',
    sortable: false,
    hidable: true,
    defaultHidden: true,
  },
  {
    key: 'column_a',
    title: 'column_a',
    sortable: false,
    hidable: true,
  },
  {
    key: 'column_b',
    title: 'column_b',
    sortable: false,
    hidable: true,
  },
  {
    key: 'column_c',
    title: 'column_c',
    sortable: false,
    hidable: true,
  },
  {
    key: 'column_d',
    title: 'column_d',
    sortable: false,
    hidable: true,
  },
  {
    key: 'column_e',
    title: 'column_e',
    sortable: false,
    hidable: true,
  },
];
</script>
