import axios from 'axios';
import Vue from 'vue';

// Interceptor for finishing a request
axios.interceptors.response.use((r) => r, (error) => {
  Vue.prototype.$bvToast.toast(`Server call returned error ${error.response.status}`, {
    title: 'Error',
    variant: 'error',
  });
  return Promise.reject(error);
});
