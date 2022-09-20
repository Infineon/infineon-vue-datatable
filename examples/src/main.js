import { createApp } from 'vue';

import router from './router/router';

import './plugins/fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import App from './App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app');
