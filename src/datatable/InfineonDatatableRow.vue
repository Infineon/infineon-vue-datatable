<template>
  <tr
    :class="{'row-odd': rowIndex % 2 === 0, 'expanded': expanded }"
    class="mainrow"
  >
    <td
      v-if="canEdit || hiddenColumns.length > 0"
      class="text-nowrap"
    >
      <a
        v-if="hiddenColumns.length > 0"
        href="javascript:void(0)"
        @click="expanded = !expanded"
      >
        <font-awesome-icon
          class="expand-row ms-1 me-2"
          :class="{'expanded': expanded}"
          role="button"
          :icon="['fas', 'caret-right']"
        />
      </a>
      <button
        v-if="!rowIsInEditMode && canEdit"
        class="btn btn-outline-primary btn-sm me-1"
        title="Start Edit"
        @click="startEditRow"
      >
        <font-awesome-icon
          :icon="['fas', 'edit']"
        />
      </button>
      <button
        v-if="rowIsInEditMode && canEdit"
        class="btn btn-outline-primary btn-sm me-1"
        title="Save"
        @click="saveRow"
      >
        <font-awesome-icon
          :icon="['fas', 'save']"
        />
      </button>

      <button
        v-if="rowIsInEditMode && canEdit"
        class="btn btn-outline-primary btn-sm me-1"
        title="Cancel Edit"
        @click="cancelRow"
      >
        <font-awesome-icon
          :icon="['fas', 'times-circle']"
        />
      </button>
      <button
      v-if="canEdit"
        v-for="(additionalAction, idx) in additionalActions"
        :key="idx"
        class="btn btn-outline-primary btn-sm"
        :title="additionalAction.title"
        @click="additionalAction.action(row)"
      >
        <font-awesome-icon
          v-if="additionalAction.icon"
          :icon="additionalAction.icon"
        />
        <span v-if="additionalAction.label">
          {{ additionalAction.label }}
        </span>
      </button>
    </td>
    <DatatableRowColumn
      v-for="(column, index) in shownColumns"
      :key="index"
      v-model:editValue="editRow[column.key]"
      :row="row"
      :column="column"
      :row-is-in-edit-mode="rowIsInEditMode"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData || {}"
        />
      </template>
    </DatatableRowColumn>
  </tr>
  <tr
    class="p-0 m-0"
    :class="{'row-odd': rowIndex % 2 === 0 }"
  >
    <td
      :colspan="columns.length"
      class="p-0 m-0"
      :class="{'border-0': !expanded}"
    >
      <div
        class="subrow d-flex ms-3 my-0 py-0 px-1 me-2 flex-wrap"
        :class="{'expanded my-2': expanded}"
      >
        <table class="table table-sm">
          <tr class="p-0">
            <th
              v-for="(column, index) in hiddenColumns"
              :key="index"
              class="p-0"
            >
              {{ column.title }}
            </th>
          </tr>
          <tr style="border-color:  var(--bs-gray-400)">
            <DatatableRowColumn
              v-for="(column, index) in hiddenColumns"
              :key="index"
              v-model:editValue="editRow[column.key]"
              :row="row"
              :column="column"
              :row-is-in-edit-mode="rowIsInEditMode"
            >
              <template
                v-for="(_, name) in $slots"
                #[name]="slotData"
              >
                <slot
                  :name="name"
                  v-bind="slotData || {}"
                />
              </template>
            </DatatableRowColumn>
          </tr>
        </table>
      </div>
    </td>
  </tr>
</template>

<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  toRefs, computed, ref,
} from 'vue';
import DatatableRowColumn from './InfineonDatatableRowColumn.vue';

const props = defineProps({
  row: { type: Object, default: () => {} },
  rowIndex: { type: Number, default: undefined },
  columns: { type: Array, default: () => [] },
  canEdit: Boolean,
  rowIsInEditMode: Boolean,
  hiddenColumnKeys: { type: Array, default: () => [] },
  additionalActions: { type: Object, default: () => {} }, // { label: '', action: (row) => {} }
});

const {
  row, columns, rowIndex, hiddenColumnKeys,
} = toRefs(props);
const emit = defineEmits(['startEditRow', 'saveRow', 'cancelRow', 'onRowButtonClick']);

const shownColumns = computed(() => columns.value
  .filter((c) => !c.hidable || !hiddenColumnKeys.value.includes(c.key)));
const hiddenColumns = computed(() => columns.value
  .filter((c) => c.hidable && hiddenColumnKeys.value.includes(c.key)));

const fieldValue = ({ key, valueResolver }) => (valueResolver
  ? valueResolver(row.value) : row.value[key]);

// neues datenobjekt anlegen
const editRow = ref(row.value);
const expanded = ref(false);

function startEditRow() {
  // aktuelle row in editier row kopieren
  editRow.value = { ...row.value };
  emit('startEditRow', row.value);
}
function saveRow() {
  emit('saveRow', editRow.value);
}
function cancelRow() {
  emit('cancelRow');
}
function onRowButtonClick(actionType) {
  emit('onRowButtonClick', actionType, editRow.value);
}

/*

const emit = defineEmits(['update:currentPage']);

function changePage(newPage) {
  emit('update:currentPage', newPage);
}
*/

</script>

<style scoped>
.row-odd {
    --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}

.expand-row {
  transition: transform 0.3s;
}

.expand-row.expanded {
  transform: rotate(90deg);
}

.mainrow.expanded {
  border-bottom: 0px;
}

.mainrow.expanded td {
  border-bottom: 0px;
}

.subrow {
  max-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
}

.subrow.expanded {
  max-height: 1000px;
  transition: max-height 0.6s, padding 0.6s;
}
</style>
