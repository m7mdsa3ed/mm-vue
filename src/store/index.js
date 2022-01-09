import { createStore } from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import accounts from "./modules/accounts";
import categories from "./modules/categories";
import transactions from "./modules/transactions";

const store = createStore({
  modules: {
    app,
    auth,
    accounts,
    categories,
    transactions
  },

  mutations: {
    restoreState(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
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

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
