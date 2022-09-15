<template>
  <div>
    <v-select
      v-if="columnOptions.length > 0"
      id="showColumnSelect"
      style="min-width:10em"
      :multiple="true"
      :append-to-body="true"
      :options="columnOptions"
      :model-value="shownColumns"
      :limit="0"
      placeholder="Click here to show columns"
      :limit-text="(count) => `show ${count +
        columns.length - columnOptions.length} / ${columns.length} columns`"
      :clearable="false"
      label="label"
      @update:model-value="updateValue($event)"
      @option:selecting="changeColumnVisibility({value: $event})"
      @option:deselecting="changeColumnVisibility({value: $event})"
    />
  </div>
</template>

<script setup>
import vSelect from 'vue-select';
import {
  toRefs, computed,
} from 'vue';

const props = defineProps({
  columns: { type: Array, default: () => [] },
  hiddenColumnKeys: { type: Array, default: () => [] },
});

const {
  columns, hiddenColumnKeys,
} = toRefs(props);

const emit = defineEmits(['changeColumnVisibility']);

const shownColumns = computed(() => columns.value
  .filter((c) => !hiddenColumnKeys.value.includes(c.key) && c.hidable).map((c) => c.key));
const columnOptions = computed(() => columns.value.filter((c) => c.hidable)
  .map((c) => ({ id: c.key, label: c.title, isDisabled: !c.hidable })));

function changeColumnVisibility(columnKey) {
  emit('changeColumnVisibility', columnKey.value.id || columnKey.value);
}

</script>

<style src="vue-select/dist/vue-select.css"></style>
