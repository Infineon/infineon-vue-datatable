import { createRouter, createWebHistory } from 'vue-router';
import ExampleBasic from '../components/examples/ExampleBasic.vue';
import ExampleEdit from '../components/examples/ExampleEdit.vue';
import IntroPage from '../components/IntroPage.vue';

// this file initializes the vue router
// it maps the component of the route to the <router-view> in App.vue

const router = createRouter({
  history: createWebHistory(),
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
  ],
});

export default router;
