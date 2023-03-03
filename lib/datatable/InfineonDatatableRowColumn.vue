<template>
  <td style="border-collapse: separate !important;">
    <!-- <slot
      v-if="rowIsInEditMode && column.editable && column.possibleValues && column.template"
      :name="`column(${column.key})`"
      :row="row"
    >
      <span v-html="column.template" />
    </slot> -->

    <TreeSelect
      v-if="rowIsInEditMode && column.editable && column.possibleValues"
      :model-value="editValue"
      :options="normalizedOptions"
      :multiple="false"
      :default-expand-level="1"
      placeholder="Please select"
      :clearable="true"
      @update:model-value="updateSelectedValue($event)"
    >
      <!--<template>
         <font-awesome-icon
          v-if="node.level === 1"
          class="fa-sm fa-fw text-primary"
          :icon="['fas', 'building']"
        />
        <font-awesome-icon
          v-if="node.level === 2"
          class="fa-sm fa-fw text-primary"
          :icon="['fas', 'sitemap']"
        />
        {{ node.label }}
      </template> -->
    </TreeSelect>

    <!-- <select
      v-else-if="rowIsInEditMode && column.editable && column.possibleValues"
      :id="column.key"
      class="form-control form-control-sm"
      style="min-width:15em;max-width:20em;"
      :filter-key="editValue"
      :value="editValue"
      :disabled="fieldReadOnly ? true : false"
      @input="updateSelectedValue($event)"
    >
      <option
        :value="''"
        selected
        disabled
      >
        Please select...
      </option>
      <option
        v-for="possibleValue in column.possibleValues"
        :key="possibleValue.id"
        :value="possibleValue.id"
      >
        {{ possibleValue.label }}
      </option>
    </select> -->

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

const emit = defineEmits(['update:editValue']);
const fieldReadOnly = (column.value.key === 'statusId' && (row.value.sourceReadOnly || row.value.sourceSolved));

const fieldValue = computed(() => {
  const { key, valueResolver } = column.value;

  return valueResolver ? valueResolver(row.value) : row.value[key];
});

function updateSelectedValue($event) {
  emit('update:editValue', $event);
}

async function onClick() {
  column.value.action(row.value);
}

const normalizedOptions = computed(() => (column.value.possibleValues?.length > 0 ? [{ id: 'all', label: 'All', children: column.value.possibleValues }] : []));

// const sortedOptions = computed(() => (column.possibleValues?.length > 0 ? [{
//   id: 'all',
//   label: 'All',
//   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
//   children: column.possibleValues?.sort(
//     (a, b) => a.label?.localeCompare(b.label),
//   ),
// }] : []));

</script>
