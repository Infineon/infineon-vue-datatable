<template>
  <div>
    Select view
    <TreeSelect
      v-model="localStorageKey"
      style="min-width:10em"
      :options="viewOptions"
      placeholder="Click here to select view"
      :clearable="true"
      label="label"
      :calculate-position="withPopper"
    />
    {{ localStorageKey === null ? 'test' : localStorageKey }}

    <InfineonDatatable
      :data="rows"
      :columns="columns"
      :local-storage-key="localStorageKey !== null ? localStorageKey : null"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { InfineonDatatable } from '../../../../lib';
import { TreeSelect } from '../../../../lib/plugins/treeView';

const localStorageKey = ref(null);
const viewOptions = ref([{ id: 'view1', label: 'View 1' }, { id: 'view2', label: 'View 2' }, { id: 'view3', label: 'View 3' }]);

const rows = ref([
  {
    id: 1,
    name: 'item1',
    type: { id: 11, label: 'Label A' },
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 2,
    name: 'item2',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 3,
    name: 'item3',
    type: { id: 12, label: 'Label B' },
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 4,
    name: 'item4',
    type: { id: 11, label: 'Label A' },
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
];
</script>
