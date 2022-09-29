<template>
  <div class="ifx__nav-bar-vertical">
    <div>
      <ul class="flex-column ifx__content-nav__border nav">
        <li>
          <a
            href="/"
            class="nav-link"
          >
            <img
              style="height:2em"
              src="../../assets/Logo.svg"
              alt="Infineon Logo"
            >

          </a>
        </li>
      </ul>
      <ul
        v-for="link in links"
        :key="link.label"
        class="flex-column ifx__content-nav__border nav"
      >
        <p class="ifx__content-nav__divider">
          {{ link.label }}
        </p>
        <li
          v-for="child in link.children"
          :key="child.label"
        >
          <router-link
            :to="{ name: child.routeName }"
            class="nav-link"
            :class="{ active: child.routeName === currentRouteName }"
          >
            {{ child.label }}
          </router-link>
        </li>
      </ul>
      <ul class="flex-column ifx__content-nav__border nav">
        <li class="pb-1">
          <a
            class="nav-link"
            target="_blank"
            href="https://www.npmjs.com/package/@infineon/infineon-vue-datatable"
          >
            <img src="https://img.shields.io/npm/v/@infineon/infineon-vue-datatable">
          </a>
        </li>
        <li>
          <a
            class="nav-link"
            target="_blank"
            href="https://github.com/Infineon/infineon-vue-datatable"
          >
            <img src="https://img.shields.io/github/stars/infineon/infineon-vue-datatable?style=social">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const currentRouteName = computed(() => route.name);

const links = ref([
  {
    label: 'Examples',
    children: [
      {
        label: 'Basic',
        routeName: 'exampleBasic',
      },
      {
        label: 'Edit',
        routeName: 'exampleEdit',
      },
      {
        label: 'Hideable Columns',
        routeName: 'exampleHideColumns',
      },
      {
        label: 'Conditionally Hideable Columns',
        routeName: 'exampleConditionallyHideColumns',
      },
      {
        label: 'Additional Actions',
        routeName: 'exampleAdditionalActions',
      },
    ],
  },
]);
</script>
