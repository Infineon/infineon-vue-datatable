<template>
  <div class="d-flex flex-column justify-content-center flex-grow-1 pt-3" style="overflow:auto">
    <div class="flex-grow-1" style="overflow:auto">
      <table class="table table-sm table-hover w-100" style="border-collapse: separate;border-spacing: 0;">
        <thead>
          <tr>
            <th v-if="hiddenColumns.length > 0" style="width:0em" class="p-0" />
            <th v-if="canEdit || additionalActions.length > 0" style="width:0em" class="ps-2 pe-1">
              <slot :name="`column.actions`" v-bind="{ title: 'Actions' }" />
              <slot v-if="!$slots[`column.actions`]" name="column" v-bind="{ title: 'Actions' }">
                Actions
              </slot>
            </th>

            <th v-for="(column, index) in shownColumns" :key="index" class="text-nowrap" scope="col">
              <!--default column title slot - hidden for slot with specified column title-->
              <slot v-if="!$slots[`column.${column.title}`]" name="column" v-bind="column">
                {{ column.title }}
              </slot>

              <!--special column title slot-->
              <slot :name="`column.${column.title}`" v-bind="column" />

              <DatatableSortIcon v-model:sort-column="sortColumn" :column="column" />

              <a v-if="column.hidable" style="cursor: pointer" @click="changeColumnVisibility(column.key)">
                <font-awesome-icon class="fa-sm ms-2" :icon="['fas', 'times']" />
              </a>
            </th>
          </tr>
        </thead>

        <tbody>
          <DatatableRow v-for="(row, idx) in processedData" :key="row.id" :row-index="idx" :row="row"
            :columns="realColumns" :hidden-column-keys="hiddenColumnKeys"
            :row-is-in-edit-mode="(row.id) === (rowInEditMode?.id)" :can-edit="canEdit"
            :additional-actions="additionalActions" :popup-menu-actions="popupMenuActions"
            :is-menu-open="(row.id) === (rowMenuIsOpen?.id)" @start-edit-row="startEditRow" @save-row="saveRow"
            @cancel-row="cancelRow" @edit-mode-value="editModeValue"
            @on-menu-button-click="closeOtherActionsPopupMenus">
            <template v-for="(_, name) in $slots" #[name]="slotData">
              <slot :name="name" v-bind="slotData || {}" />
            </template>
          </DatatableRow>
        </tbody>
      </table>
    </div>
    <div class="mt-1 d-flex flex-row">
      <DatatablePager v-model:currentPage="currentPage" class="flex-grow-1" :page-size="currentPageSize" :count="count"
        @update-page-size="updatePageSize" @update:currentPage="updatePageNumber" />
      <DatatableShowColumnsPicker style="max-width:15em" :columns="realColumns" :hidden-column-keys="hiddenColumnKeys"
        @change-column-visibility="changeColumnVisibility" />
      <div v-if="exportable" class="mt-1 ms-1">
        <button class="btn btn-sm btn-primary" title="Download CSV File" @click="exportCSV">
          <font-awesome-icon :icon="['fas', 'file-download']" />
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  toRefs, computed, ref, watchEffect, watch,
  toRef,
} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import DatatableRow from './InfineonDatatableRow.vue';
import DatatablePager from './InfineonDatatablePager.vue';
import DatatableSortIcon from './InfineonDatatableSortIcon.vue';
import DatatableShowColumnsPicker from './InfineonDatatableShowColumnsPicker.vue';
import { debounce } from '../plugins/treeView/src/utils';

const props = defineProps({
  canEdit: Boolean,
  data: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  localStorageKey: { type: String, default: undefined },
  exportable: Boolean,
  defaultSort: { type: Object, default: () => { } }, // {key: '', type: 'A/D'}
  additionalActions: { type: Array, default: () => [] },
  // [ { label: '', action: (row) => {}, icon: ['fas', 'list-ol'] } ]
  additionalExportColumns: { type: Array, default: () => [] },
  // customColHidden: { type: String, default: 'Custom column' },
  popupMenuActions: { type: Array, default: () => [] },
  paging: {
    pageNumber: Number,
    pageSize: Number,
    totalDataCount: Number,
    onPageChange: Function,
    fetchAllData: Function,
  },
});
const emit = defineEmits(['saveRow', 'editModeValue', 'cancelRow', 'onMenuButtonClick']);

const {
  data, columns, localStorageKey, paging,
} = toRefs(props);
const sortColumn = ref(props.defaultSort);
const currentPage = ref(paging.value ? paging.value.pageNumber : 0);
const currentPageSize = ref(paging.value ? paging.value.pageSize : 10);
const count = ref(paging.value ? paging.value.totalDataCount : 0);
const rowInEditMode = ref(undefined);
const rowMenuIsOpen = ref(undefined);

const hiddenColumnKeys = ref([]);

const hiddenColumns = computed(() => columns.value
  .filter((c) => c.hidable && hiddenColumnKeys.value.includes(c.key)));

const realColumns = computed(() => columns.value
  .filter((c) => c.visible === undefined || c.visible === false));

const shownColumns = computed(() => realColumns.value
  .filter((c) => !c.hidable || !hiddenColumnKeys.value.includes(c.key)));

// reset page & item count when data changes
watch(
  data,
  (newData) => {
    if (!paging.value) {
      count.value = newData ? newData.length : 0;
    } else {
      count.value = paging.value.totalDataCount;
    }
    if (count.value / currentPageSize.value < currentPage.value) {
      currentPage.value = parseInt(count.value / currentPageSize.value, 10);
    }
  },
  { immediate: true },
);

const processedData = computed(() => {
  const sortedData = data.value.slice(0);
  if (!paging.value) {
    if (sortColumn.value && sortColumn.value.key) {
      const { key, type } = sortColumn.value;

      const foundColumn = realColumns.value.find((c) => c.key === key);
      if (foundColumn) {
        const {
          sortType,
          valueResolver,
          filterResolverKey,
        } = foundColumn;
        if (filterResolverKey || !valueResolver) {
          const vKey = filterResolverKey || key;

          if (sortType === 'NUMBER' && type === 'D') {
            sortedData.sort((a, b) => b[vKey] - a[vKey]);
          } else if (sortType === 'NUMBER' && type === 'A') {
            sortedData.sort((a, b) => a[vKey] - b[vKey]);
          } else if (sortType === 'STRING' && type === 'D') {
            sortedData.sort((a, b) => b[vKey]?.localeCompare(a[vKey]));
          } else if (sortType === 'STRING' && type === 'A') {
            sortedData.sort((a, b) => a[vKey]?.localeCompare(b[vKey]));
          }
        } else if (valueResolver) {
          if (sortType === 'NUMBER' && type === 'D') {
            sortedData.sort((a, b) => valueResolver(b) - valueResolver(a));
          } else if (sortType === 'NUMBER' && type === 'A') {
            sortedData.sort((a, b) => valueResolver(a) - valueResolver(b));
          } else if (sortType === 'STRING' && type === 'D') {
            sortedData.sort((a, b) => valueResolver(b)?.localeCompare(valueResolver(a)));
          } else if (sortType === 'STRING' && type === 'A') {
            sortedData.sort((a, b) => valueResolver(a)?.localeCompare(valueResolver(b)));
          }
        }
      }
    } 
  } else {
    paging.value.onPageChange(currentPage.value, currentPageSize.value, sortColumn.value);
  }

  // Place where the currently displayed data is computed, gets triggered on currentPage and pageSizeChanges
  const sliced = !paging.value ? sortedData.slice(
    currentPage.value * currentPageSize.value,
    (currentPage.value + 1) * currentPageSize.value,
  ) : sortedData;
  return sliced;
});

const closeRowMenusMap = ref(new Map(processedData.value.map((_, index) => [index, false])));

// store hidden columns for a predefined property localStorageKey - if not defined, use default
const hiddenColumnsLocalStorageKey = computed(() => localStorageKey.value || realColumns
  .value.map((c) => c.key).sort().join());
watchEffect(() => {
  if (localStorage.getItem(hiddenColumnsLocalStorageKey.value)) {
    try {
      hiddenColumnKeys.value = JSON
        .parse(localStorage.getItem(hiddenColumnsLocalStorageKey.value));
    } catch (e) {
      localStorage.removeItem(hiddenColumnsLocalStorageKey.value);
    }
  } else {
    hiddenColumnKeys.value = realColumns.value.filter((c) => c.defaultHidden).map((c) => c.key);
  }
});

function changeColumnVisibility(columnKey) {
  if (hiddenColumnKeys.value.includes(columnKey)) {
    const index = hiddenColumnKeys.value.indexOf(columnKey);
    hiddenColumnKeys.value.splice(index, 1);
  } else {
    hiddenColumnKeys.value.push(columnKey);
  }
  localStorage.setItem(localStorageKey.value, JSON.stringify(hiddenColumnKeys.value));
}

function startEditRow(row) {
  rowInEditMode.value = row ? { ...row } : undefined;
  emit('editModeValue', row);
}
async function saveRow(row) {
  emit('saveRow', row);
  rowInEditMode.value = undefined;
}
function editModeValue(row) {
  emit('editModeValue', row);
}

function closeOtherActionsPopupMenus(row) {
  rowMenuIsOpen.value = row ? row : undefined;
  emit('onMenuButtonClick', row);
}

function cancelRow(row) {
  emit('cancelRow', row);
  rowInEditMode.value = undefined;
}
function updatePageSize(size) {
  currentPageSize.value = size;
  if (paging.value) {
    paging.value.onPageChange(currentPage.value, currentPageSize.value, sortColumn.value)
  }
}

function updatePageNumber(number) {
  if (paging.value) {
    paging.value.onPageChange(currentPage.value, currentPageSize.value, sortColumn.value)
  }
}
async function exportCSV() {
  const { additionalExportColumns } = props;

  const columnsToExport = [...shownColumns.value, ...additionalExportColumns];

  const titles = columnsToExport.map((col) => `"${(col.title && col.title.replace && col.title.replace(/(["])/g, '"$1').replace(/(?:\r\n|\r|\n)/g, ' ')) || col.title}"`);
  let csv = titles.join(',');
  csv += '\n';

  const exportData = paging.value ? await paging.value.fetchAllData() : data.value;

  exportData.forEach((row) => {
    const values = columnsToExport
      .map((col) => (col.valueResolver
        ? `"${(col.valueResolver(row) && col.valueResolver(row).replace && col.valueResolver(row).replace(/(["])/g, '"$1').replace(/(?:\r\n|\r|\n)/g, ' ')) || col.valueResolver(row)}"`
        : `"${(row[col.key] && row[col.key].replace && row[col.key].replace(/(["])/g, '"$1').replace(/(?:\r\n|\r|\n)/g, ' ')) || row[col.key]}"`));

    csv += values.join(',');
    csv += '\n';
  });

  const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([BOM, csv], { type: 'text/csv;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'download.csv';
  link.click();
  URL.revokeObjectURL(link.href);
}

</script>

<style scoped>
.oddRow {
  --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}

.stickyHeader {
  position: sticky;
  top: 0;
  border-bottom: 2px solid black;
  background-color: white
}
</style>
