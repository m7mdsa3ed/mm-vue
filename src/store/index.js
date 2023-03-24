import { createStore } from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import accounts from "./modules/accounts";
import categories from "./modules/categories";
import tags from "./modules/tags";
import transactions from "./modules/transactions";
import currencies from "./modules/currencies";
import roles from "./modules/roles";

const cacheEnabled = eval(import.meta.env.VITE_ENABLE_VUEX_CACHE ?? 'false');

const store = createStore({
  modules: {
    app,
    auth,
    accounts,
    categories,
    tags,
    transactions,
    currencies,
    roles,
  },

  mutations: {
    restoreState(state) {
      if (!cacheEnabled) {
        return;
      }

      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
  },
});

store.subscribe((mutation, state) => {
  if (cacheEnabled) {
    localStorage.setItem("store", JSON.stringify(state));
  }
});

export default store;
