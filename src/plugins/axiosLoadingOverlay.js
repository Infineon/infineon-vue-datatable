import axios from 'axios';
import Vue from 'vue';
import Loading from 'vue3-loading-overlay';

// this is a custom implementation for showing a loading overlay globaly on each http call.
// remove this if you want to run http calls without having a visual feedback to the user
// see https://www.npmjs.com/package/vue-loading-overlay
Vue.use(Loading);

const manager = {
  count: 0,
  hide: undefined,
  addLoader: () => {
    manager.count += 1;
    if (!manager.hide) {
      manager.hide = Vue.$loading.show().hide;
    }
  },
  removeLoader: () => {
    manager.count -= 1;
    if (manager.count < 1 && manager.hide) {
      manager.count = 0;
      manager.hide();
      manager.hide = undefined;
    }
  },
};

// Interceptor for starting a request
axios.interceptors.request.use((config) => {
  manager.addLoader();
  return config;
}, (error) => Promise.reject(error));

// Interceptor for finishing a request
axios.interceptors.response.use((response) => {
  manager.removeLoader();
  return response;
}, (error) => {
  manager.removeLoader();
  return Promise.reject(error);
});
