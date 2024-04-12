<template>
  <td style="border-collapse: separate !important;">
    <TreeSelect
      v-if="rowIsInEditMode && column.editable && column.possibleValues"
      :model-value="editValue"
      :options="normalizedOptions"
      :multiple="false"
      :default-expand-level="1"
      placeholder="Please select"
      :clearable="true"
      :style="column.minWidth ? 'min-width:' + column.minWidth : ''"
      @update:model-value="updateSelectedValue($event)"
      @input:model-value="updateSelectedValue($event)"
    />

    <textarea
      v-else-if="rowIsInEditMode && column.editable"
      class="form-control form-control-sm"
      rows="3"
      :placeholder="'edit ' + column.title"
      :value="editValue"
      @input="$emit('update:editValue', $event.target.value)"
    />
    <a
      v-else-if="column.hrefKey && row[column.hrefKey]"
      :href="row[column.hrefKey]"
      target="_blank"
      style="white-space: pre-wrap"
    >
      {{ fieldValue }}
    </a>
    <button
      v-else-if="column.action"
      class="btn btn-outline-primary btn-sm"
      :title="column.title"
      @click="onClick"
    >
      <font-awesome-icon
        v-if="column.icon"
        :icon="['fas', column.icon]"
      />
    </button>
    <slot
      v-else
      :name="`column(${column.key})`"
      :row="row"
      :column="column"
    >
      <span
        style="white-space: pre-wrap"
      >
        {{ fieldValue }}
      </span>
    </slot>
  </td>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  toRefs, computed,
} from 'vue';
import { TreeSelect } from '../plugins/treeView';

const props = defineProps({
  row: { type: Object, default: () => {} },
  column: { type: Object, default: () => {} },
  rowIsInEditMode: Boolean,
  editValue: { type: [String, Number], default: () => undefined },
});
const {
  row, column, editValue,
} = toRefs(props);

const emit = defineEmits(['update:editValue', 'updateSelectedValue']);
// eslint-disable-next-line max-len
// const fieldReadOnly = (column.value.key === 'statusId' && (row.value.sourceReadOnly || row.value.sourceSolved));

const fieldValue = computed(() => {
  const { key, valueResolver } = column.value;

  return valueResolver ? valueResolver(row.value) : row.value[key];
});

// function updateInputOfSelect(selected) {
//   emit('update:editValue', selected);
// }

function updateSelectedValue(selected) {
  // console.log('treeselect update', selected);
  emit('update:editValue', selected);
  emit('updateSelectedValue', selected);
}

async function onClick() {
  column.value.action(row.value);
}

const normalizedOptions = computed(() => (column.value.possibleValues?.length > 0 ? [{ id: 'all', label: 'All', children: column.value.possibleValues }] : []));

</script>
