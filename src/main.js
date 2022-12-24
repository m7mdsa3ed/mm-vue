import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import dayjs from "./plugins/dayJS";
import helperJS from "./plugins/helperJS";

import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap";

import "./styles/bs.scss";
import "./styles/fa.scss";
import "./styles/app.scss";

const baseURL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_API_BASEURL_LOCAL
    : import.meta.env.VITE_API_BASEURL;

// Axios configuration
axios.defaults.baseURL = baseURL + "/api";
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(dayjs)
  .use(helperJS)
  .mount("#app");
