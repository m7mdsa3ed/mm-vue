import axios from "axios";
import store from "./../store";
import { errorParser, generateIdempotentKey } from "../helpers";

const { VITE_API_BASEURL, VITE_API_PATH } = import.meta.env;

// Axios configuration
axios.defaults.baseURL = `${VITE_API_BASEURL}/${VITE_API_PATH}`;
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;

const loadingList = [];

const pushLoading = (config) => {
  const { method, url } = config;

  loadingList.push({ method, url, timestamp: Date.now() });

  store.dispatch("app/loading", [...loadingList]);
};

const popLoading = (config) => {
  const { method, url } = config;

  const index = loadingList.findIndex(
    (loading) => loading.method == method && loading.url == url
  );

  if (index > -1) {
    loadingList.splice(index, 1);

    store.dispatch("app/loading", [...loadingList]);
  }
};

const onRequest = (request) => {
  if (request.method == "post") {
    request.headers["X-Idempotent-Key"] = generateIdempotentKey(request.data);
  }

  pushLoading(request);

  return request;
};

const onRequestError = (error) => {
  return Promise.reject(errorParser(error));
};

axios.interceptors.request.use(onRequest, onRequestError);

const onResponse = (response) => {
  popLoading(response.config);

  return response;
};

const onResponseError = (error) => {
  store.dispatch("app/loading", false);

  popLoading(error.config);

  return Promise.reject(errorParser(error));
};

axios.interceptors.response.use(onResponse, onResponseError);
