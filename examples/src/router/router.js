import { createRouter, createWebHashHistory } from 'vue-router';
import ExampleBasic from '../components/examples/ExampleBasic.vue';
import ExampleEdit from '../components/examples/ExampleEdit.vue';
import ExampleHideColumns from '../components/examples/ExampleHideColumns.vue';
import ExampleStoreHiddenColumnsPerView from '../components/examples/ExampleStoreHiddenColumnsPerView.vue';
import ExampleAdditionalActions from '../components/examples/ExampleAdditionalActions.vue';
import ExampleDynamicColumnTitle from '../components/examples/ExampleDynamicColumnTitle.vue';
import ExampleConditionallyHideColumns from '../components/examples/ExampleConditionallyHideColumns.vue';
import IntroPage from '../components/IntroPage.vue';

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
      path: '/example-conditionally-hide-columns',
      name: 'exampleConditionallyHideColumns',
      component: ExampleConditionallyHideColumns,
    },
  ],
});

export default router;
