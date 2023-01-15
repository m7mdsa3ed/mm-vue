import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import dayjs from "./plugins/dayJS";
import helperJS from "./plugins/helperJS";

import axios from "axios";
import VueAxios from "vue-axios";

import './configs';

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(dayjs)
  .use(helperJS)
  .mount("#app");
