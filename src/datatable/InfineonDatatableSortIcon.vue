<template>
  <a
    v-if="column.sortable"
    href="#"
    @click="changeSort()"
  >
    <font-awesome-icon
      :icon="['fas', icon]"
    />
  </a>
</template>

<script setup>
import {
  toRefs, computed,
} from 'vue';

const props = defineProps({
  sortColumn: { type: Object, default: () => {} },
  column: { type: Object, default: () => {} },
});
const { sortColumn, column } = toRefs(props);

const emit = defineEmits(['update:sortColumn']);

const icon = computed(() => {
  if (!sortColumn.value) {
    return 'sort';
  }

  if (sortColumn.value.key === column.value.key) {
    return (sortColumn.value.type === 'A' ? 'caret-up' : 'caret-down');
  }
  return 'sort';
});

function changeSort() {
  if (sortColumn.value && sortColumn.value.key === column.value.key) {
    if (sortColumn.value.type === 'A') {
      emit('update:sortColumn', { key: column.value.key, type: 'D' });
    } else {
      emit('update:sortColumn', undefined);
    }
  } else {
    emit('update:sortColumn', { key: column.value.key, type: 'A' });
  }
}

</script>
