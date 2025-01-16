import { createRouter, createWebHashHistory } from 'vue-router';
import ExampleBasic from '../components/examples/ExampleBasic.vue';
import ExampleEdit from '../components/examples/ExampleEdit.vue';
import ExampleHideColumns from '../components/examples/ExampleHideColumns.vue';
import ExampleStoreHiddenColumnsPerView from '../components/examples/ExampleStoreHiddenColumnsPerView.vue';
import ExampleAdditionalActions from '../components/examples/ExampleAdditionalActions.vue';
import ExamplePopupMenuActions from '../components/examples/ExamplePopupMenuActions.vue';
import ExampleDynamicColumnTitle from '../components/examples/ExampleDynamicColumnTitle.vue';
import ExampleConditionallyHideColumns from '../components/examples/ExampleConditionallyHideColumns.vue';
import ExampleCsvExport from '../components/examples/ExampleCsvExport.vue';
import ExampleColumnAlwaysHiddenButExportable from '../components/examples/ExampleColumnAlwaysHiddenButExportable.vue';
import ExampleConditionallyHideAdditionalActions from '../components/examples/ExampleConditionallyHideAdditionalActions.vue';
import IntroPage from '../components/IntroPage.vue';
import ExamplePagingSupport from '../components/examples/ExamplePagingSupport.vue';

// this file initializes the vue router
// it maps the component of the route to the <router-view> in App.vue

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'introPage',
      component: IntroPage,
    },
    {
      path: '/example-basic',
      name: 'exampleBasic',
      component: ExampleBasic,
    },
    {
      path: '/example-edit',
      name: 'exampleEdit',
      component: ExampleEdit,
    },
    {
      path: '/example-dynamic-column-title',
      name: 'exampleDynamicColumnTitle',
      component: ExampleDynamicColumnTitle,
    },
    {
      path: '/example-hide-columns',
      name: 'exampleHideColumns',
      component: ExampleHideColumns,
    },
    {
      path: '/example-store-hidden-columns-per-view',
      name: 'exampleStoreHiddenColumnsPerView',
      component: ExampleStoreHiddenColumnsPerView,
    },
    {
      path: '/example-additional-Actions',
      name: 'exampleAdditionalActions',
      component: ExampleAdditionalActions,
    },
    {
      path: '/example-conditionally-hide-additional-actions',
      name: 'exampleConditionallyHideAdditionalActions',
      component: ExampleConditionallyHideAdditionalActions,
    },
    {
      path: '/example-popup-menu-actions',
      name: 'examplePopupMenuActions',
      component: ExamplePopupMenuActions,
    },
    {
      path: '/example-paging-support',
      name: 'examplePagingSupport',
      component: ExamplePagingSupport,
    },
    {
      path: '/example-conditionally-hide-columns',
      name: 'exampleConditionallyHideColumns',
      component: ExampleConditionallyHideColumns,
    },
    {
      path: '/example-csv-export',
      name: 'exampleCsvExport',
      component: ExampleCsvExport,
    },
    {
      path: '/example-always-hidden-but-exportable',
      name: 'exampleColumnAlwaysHiddenButExportable',
      component: ExampleColumnAlwaysHiddenButExportable,
    },
  ],
});

export default router;
