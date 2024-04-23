<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <tr
    :class="{'row-odd': rowIndex % 2 === 0, 'expanded': expanded }"
    class="mainrow"
  >
    <td
      v-if="hiddenColumns.length > 0"
      class="px-1"
    >
      <a
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
    </td>
    <td
      v-if="canEdit || additionalActions.length > 0"
      class="text-nowrap px-1"
    >
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
      <template
        v-for="(additionalAction, idx) in additionalActions"
        v-if="canEdit"
      >
        <button
          v-if="(!additionalAction.visible || additionalAction.visible(row))"
          :key="idx"
          class="btn btn-outline-primary btn-sm"
          :class="{'ms-1': idx > 0}"
          :title="additionalAction.title"
          :style="additionalAction.style ? additionalAction.style : ''"
          @click="additionalAction.action(row)"
        >
          <div style="display: flex;">
            <div 
              :style="additionalAction.label ? 'margin-right: 4px;' : ''"
            >
              <font-awesome-icon
                v-if="additionalAction.icon"
                :icon="additionalAction.icon"
              />
            </div>  
            <span v-if="additionalAction.label">
              {{ additionalAction.label }}
            </span>
          </div>
        </button>
      </template>
      <button 
        v-if="canEdit && (popupMenuActions.length > 0)"
        ref="menuButtonRef"
        class="btn btn-outline-primary btn-sm me-1"
        :style="additionalActions.length > 0 ? 'margin-left: 4px;' : ''"
        style="position: relative"
        @click="openPopupMenu"
      >
        <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
        <div 
          v-show="showMenu && isMenuOpen"
          ref="menuRef"
          class="menu"
        >
          <template
            v-for="(popupMenuAction, idx) in popupMenuActions"
            :key="idx"
          >
            <button
              v-show="!popupMenuAction.visible || popupMenuAction.visible(row)"
              class="btn btn-outline-primary btn-sm"
              :class="{'ms-1': idx > 0}"
              :title="popupMenuAction.title"
              :style="popupMenuAction.style ? popupMenuAction.style : ''"
              @click="(event) => popupMenuActionOnClick(event, popupMenuAction.action, popupMenuAction.canCloseMenu)"
            >
              <div style="display: flex;">
                <div 
                  :style="popupMenuAction.label ? 'margin-right: 4px;' : ''"
                >
                  <font-awesome-icon
                    v-if="popupMenuAction.icon"
                    :icon="popupMenuAction.icon"
                  />
                </div>  
                <span v-if="popupMenuAction.label">
                  {{ popupMenuAction.label }}
                </span>
              </div>
            </button>
          </template>
        </div>
      </button>
    </td>
    <DatatableRowColumn
      v-for="(column, index) in shownColumns"
      :key="index"
      v-model:editValue="editRow[column.key]"
      :row="row"
      :column="column"
      :row-is-in-edit-mode="rowIsInEditMode"
      @input="editModeValue"
      @update-selected-value="editModeValue"
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
      :colspan="calculateColspan"
      class="p-0 m-0"
      :class="{'border-0': !expanded || !hiddenColumns.length > 0}"
    >
      <div
        class="subrow d-flex ms-3 my-0 py-0 px-1 me-2 flex-wrap"
        :class="{'expanded my-2': expanded && hiddenColumns.length > 0}"
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
              @input="editModeValue"
              @update-selected-value="editModeValue"
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
  toRefs, computed, ref, onMounted, watch
} from 'vue';
import DatatableRowColumn from './InfineonDatatableRowColumn.vue';

const props = defineProps({
  row: { type: Object, default: () => {} },
  rowIndex: { type: Number, default: undefined },
  columns: { type: Array, default: () => [] },
  canEdit: Boolean,
  isMenuOpen: Boolean,
  rowIsInEditMode: Boolean,
  hiddenColumnKeys: { type: Array, default: () => [] },
  additionalActions: { type: Object, default: () => {} }, // { label: '', action: (row) => {} }
  popupMenuActions: { type: Array, default: () => [] },
});

const {
  row, columns, rowIndex, hiddenColumnKeys, canEdit, additionalActions, popupMenuActions, popupMenuOpen, isMenuOpen
} = toRefs(props);
const emit = defineEmits(['startEditRow', 'saveRow', 'cancelRow', 'onRowButtonClick', 'editRow', 'editModeValue', 'openActionsPopupMenu']);

const shownColumns = computed(() => columns.value
.filter((c) => !c.hidable || !hiddenColumnKeys.value.includes(c.key)));

const hiddenColumns = computed(() => columns.value
.filter((c) => c.hidable && hiddenColumnKeys.value.includes(c.key)));

const calculateColspan = computed(() => {
  let colspan = shownColumns.value.length;
  if (canEdit.value || additionalActions.value.length > 0) {
    colspan += 1;
  }
  if (hiddenColumns.value.length > 0) {
    colspan += 1;
  }
  return colspan;
});
// neues datenobjekt anlegen
const editRow = ref(row.value);
const expanded = ref(false);

const menuRef = ref(null);
const menuButtonRef = ref(null);
const menuActionButtonRefs = ref([]);
const forcedMenuClose = ref(false);
const showMenu = ref(false);

function openPopupMenu(event) {
  emit('openActionsPopupMenu', row.value);
  showMenu.value =!showMenu.value || !menuButtonRef.value.contains(event.target);
}

function popupMenuActionOnClick(_, action, canCloseMenu) {
  if (canCloseMenu) {
    forcedMenuClose.value = true;
  }
  action(row.value)
}

function closeMenuOnClickOutside(event) {
  if (menuRef.value?.contains(event.target)) {
    showMenu.value = !forcedMenuClose.value;
    forcedMenuClose.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside);
});

watch(isMenuOpen, () => {
  if (!isMenuOpen.value) {
    showMenu.value = false;
  }
})

function startEditRow() {
  // aktuelle row in editier row kopieren
  editRow.value = { ...row.value };
  emit('startEditRow', row.value);
}
function saveRow() {
  emit('saveRow', editRow.value);
}
function editModeValue() {
  emit('editModeValue', editRow.value);
}

function cancelRow() {
  emit('cancelRow', editRow.value);
}
</script>

<style scoped>
.menu {
  position: absolute;
  background-color: white;
  border: 2px solid var(--bs-table-border-color);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 8px;
  margin-left: -3px;
  margin-top: -2px;
  z-index: 4656546797;
}
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
