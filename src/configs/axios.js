import axios from "axios";
import store from "./../store";
import { errorParser } from "../helpers";

const { VITE_API_BASEURL, VITE_API_PATH } = import.meta.env;

// Axios configuration
axios.defaults.baseURL = `${VITE_API_BASEURL}/${VITE_API_PATH}`;
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;

axios.interceptors.request.use(
  (requestConfig) => {
    store.dispatch("app/loading", true);
    store.dispatch("app/stopActions", requestConfig.method == "post");

    return requestConfig;
  },
  (error) => {
    store.dispatch("app/loading", false);
    store.dispatch("app/stopActions", false);

    return Promise.reject(errorParser(error));
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

    return Promise.reject(errorParser(error));
  }
);
