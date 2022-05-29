import * as fn from "../helpers";
import router from "../router";

export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$fn = fn;

    app.config.globalProperties.toRoute = (name, params) => {
      router.push({ name, ...params });
    };
  },
};
