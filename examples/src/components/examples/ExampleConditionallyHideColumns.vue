<template>
  <div>
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option
        disabled
        value=""
      >
        Please select one
      </option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <InfineonDatatable
      :data="rows"
      :can-edit="true"
      :columns="columns"
      :default-sort="{ key: 'name', type: 'D' }"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { InfineonDatatable } from '../../../../lib';

const selected = ref(null);

const rows = ref([
  {
    id: 1,
    name: 'item1',
    type: 'STRING',
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
    type: 'STRING',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
  {
    id: 4,
    name: 'item4',
    type: 'STRING',
    longText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent laoreet ultrices gravida. Quisque condimentum pretium feugiat. Nam vel gravida ipsum. Fusce dapibus justo ut neque molestie, sed scelerisque leo aliquet. Curabitur convallis dictum maximus. Nullam a facilisis leo. Morbi dignissim facilisis nisi, quis hendrerit mi porta a. Sed id accumsan ipsum. Aenean rutrum iaculis feugiat. Proin feugiat enim sed tortor mollis, id elementum dolor pretium. Mauris condimentum arcu vitae tortor elementum tincidunt.',
  },
]);

const columns = computed(() => {
  const predefinedColumns = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      sortType: 'NUMBER',
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
  if (selected.value === 'B') {
    predefinedColumns.push({
      key: 'name',
      title: 'Name',
      sortable: true,
      sortType: 'STRING',
      editable: true,
      hidable: true,
    });
  }

  return predefinedColumns;
});
</script>
