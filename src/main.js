import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
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
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_API_BASEURL
    : process.env.VUE_APP_API_BASEURL;

// Axios configration
axios.defaults.baseURL = baseURL + "/api";
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(dayjs)
  .use(helperJS)
  .mount("#app");
