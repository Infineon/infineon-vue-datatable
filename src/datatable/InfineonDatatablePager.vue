<template>
  <div class="text-center">
    <nav
      aria-label="Page navigation example"
      class="d-inline-block"
    >
      <ul class="pagination justify-content-center mb-0">
        <li
          :class="{'invisible': currentPage <= 0}"
          class="page-item"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(0)"
          ><font-awesome-icon
            :icon="['fas', 'angle-double-left']"
          /></a>
        </li>
        <li
          :class="{'invisible': currentPage <= 0}"
          class="page-item"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(currentPage+-1)"
          ><font-awesome-icon
            :icon="['fas', 'angle-left']"
          /></a>
        </li>
        <li
          :class="{'invisible': currentPage - 2 <= 0}"
          class="page-item disabled"
        >
          <a
            class="page-link"
            href="#"
          >...</a>
        </li>
        <template
          v-for="index in 5"
          :key="index"
        >
          <li
            class="page-item"
            :class="{active: currentPage+index-3 === currentPage,
                     'invisible': currentPage+index - 2 <= 0 || currentPage+index-4 >= pageCount}"
          >
            <a
              class="page-link"
              href="#"
              @click="changePage(currentPage+index-3)"
            >{{ currentPage+index - 2 }}</a>
          </li>
        </template>
        <li
          :class="{'invisible': currentPage + 2 >= pageCount}"
          class="page-item disabled"
        >
          <a
            class="page-link"
            href="#"
          >...</a>
        </li>
        <li
          :class="{'invisible': currentPage >= pageCount}"
          class="page-item"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(currentPage+1)"
          ><font-awesome-icon
            :icon="['fas', 'angle-right']"
          /></a>
        </li>
        <li
          :class="{'invisible': currentPage >= pageCount}"
          class="page-item"
        >
          <a
            class="page-link"
            href="#"
            @click="changePage(pageCount)"
          >
            <font-awesome-icon
              :icon="['fas', 'angle-double-right']"
            />
          </a>
        </li>
        <li class="page-item">
          <select
            id="pageSizeSelect"
            :value="pageSize"
            class="form-select mx-2"
            style="width:75px;"
            @change="updateSize($event)"
          >
            <option
              v-for="size in sizeList"
              :key="size"
            >
              {{ size }}
            </option>
          </select>
        </li>
      </ul>
    </nav>
    <div>
      <span class="small text-muted">
        displaying page {{ currentPage+1 }} of {{ pageCount+1 }}. Total messages: {{ count }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  toRefs, ref, computed,
} from 'vue';

const props = defineProps({
  currentPage: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  pageSize: { type: Number, default: 5 },
});

const {
  pageSize, count, currentPage,
} = toRefs(props);

const sizeList = ref([5, 10, 25, 50, 100]);
const pageCount = computed(() => parseInt((count.value - 1) / pageSize.value, 10));

const emit = defineEmits(['update:currentPage', 'updatePageSize']);

function changePage(newPage) {
  emit('update:currentPage', newPage);
}

function updateSize(event) {
  emit('updatePageSize', parseInt(event.target.value, 10));
}

</script>
