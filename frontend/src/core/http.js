import axios from 'axios';
import ls from 'local-storage';
import router from './router';
import app from './../main';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API}/api/`,
});

// Intercept the request to make sure the token is injected into the header.
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `${ls('authToken')}`;
  app.$Progress.start();
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.login === true) {
      router.push('/logout');
    }

    app.$Progress.finish();
    return response;
  },
  (error) => {
    app.$Progress.finish();
    return Promise.reject(error);
  }
);

const http = {
  post: (url, data) => instance.post(url, data),
  put: (url, data) => instance.put(url, data),
  get: url => instance.get(url),
  delete: (url, data) => instance.delete(url, data),
};

export default http;
