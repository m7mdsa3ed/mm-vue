import axios from "axios";
import store from "./../store";

const baseURL = import.meta.env.VITE_API_BASEURL;

// Axios configuration
axios.defaults.baseURL = baseURL;
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;

axios.interceptors.request.use(
  (requestConfig) => {
    store.dispatch("app/loading", true);
    store.dispatch("app/stopActions", requestConfig.method == 'post');

    return requestConfig;
  },
  (error) => {
    store.dispatch("app/loading", false);
    store.dispatch("app/stopActions", false);

    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch("app/loading", false);
    store.dispatch("app/stopActions", false);

    return response;
  },
  (error) => {
    store.dispatch("app/loading", false);
    store.dispatch("app/stopActions", false);

    return error;
  }
);
