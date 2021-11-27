import { createStore } from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import accounts from "./modules/accounts";
import categories from "./modules/categories";
import transactions from "./modules/transactions";

export default createStore({
  modules: {
    app,
    auth,
    accounts,
    categories,
    transactions
  },

  mutations: {
    loading(state, payload) {
      var loading, message;

      if (Array.isArray(payload)) {
        [loading, message] = payload;
      } else if (typeof payload == "object") {
        var { loading, message } = payload;
      } else {
        loading = payload;
        message = "Loading";
      }

      state.app.loading = loading;
      state.app.loadingMessage = message;
    }
  }
});
