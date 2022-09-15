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
      :calculate-position="withPopper"
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
import { createPopper } from '@popperjs/core';

const withPopper = (dropdownList, component, { width }) => {
  /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
  // eslint-disable-next-line no-param-reassign
  dropdownList.style.width = width;

  /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -1],
        },
      },
      {
        name: 'toggleClass',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          component.$el.classList.toggle(
            'drop-up',
            state.placement === 'top',
          );
        },
      },
    ],
  });

  /**
       * To prevent memory leaks Popper needs to be destroyed.
       * If you return function, it will be called just before dropdown is removed from DOM.
       */
  return () => popper.destroy();
};

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
