<template>
  <td style="border-collapse: separate !important;">
    <select
      v-if="rowIsInEditMode && column.editable && column.possibleValues"
      :id="column.key"
      class="form-control form-control-sm"
       style="min-width:15em;max-width:20em;"
       :filter-key="editValue"
      :value="editValue"
      :disabled="fieldReadOnly ? true : false"
      @input="updateSelectedValue($event)"
     > 
     <option :value="''" selected disabled>Please select...</option>
      <option
        v-for="possibleValue in column.possibleValues"
        :key="possibleValue.id"
        :value="possibleValue"
      >
         {{ possibleValue.label }}
      </option>
    </select>
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
  toRefs, computed
} from 'vue';

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


function updateSelectedValue($event){
   emit('update:editValue', $event.target.options[$event.target.selectedIndex]._value)
}

async function onClick() {
  column.value.action(row.value);
}

</script>
