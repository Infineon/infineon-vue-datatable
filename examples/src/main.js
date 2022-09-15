import { createApp } from 'vue';

import router from './router/router';

import '@infineon/design-system-bootstrap';
import './plugins/fontawesome';

import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app');
