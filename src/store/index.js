import { createStore } from "vuex";

import app from "./modules/app";
import auth from "./modules/auth";
import accounts from "./modules/accounts";
import categories from "./modules/categories";
import tags from "./modules/tags";
import transactions from "./modules/transactions";
import currencies from "./modules/currencies";

const store = createStore({
  modules: {
    app,
    auth,
    accounts,
    categories,
    tags,
    transactions,
    currencies,
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
  },
});

store.subscribe((mutation, state) => {
  if (process.env.VUE_APP_ENABLE_VUEX_CACHE ?? false) {
    localStorage.setItem("store", JSON.stringify(state));
  }

  const events = [
    {
      type: "transactions/saveTransaction",
      listeners: [],
    },
    {
      type: "transactions/removeTransaction",
      listeners: [],
    },
    {
      type: "accounts/saveAccount",
      listeners: [],
    },
    {
      type: "accounts/removeAccount",
      listeners: [],
    },
    {
      type: "categories/saveCategory",
      listeners: [],
    },
    {
      type: "categories/removeCategory",
      listeners: [],
    },
  ];

  const globalListener = [];

  events.forEach(({ type, listeners }) => {
    if (type == mutation.type) {
      [...globalListener, ...listeners].forEach((action) =>
        store.dispatch(action)
      );
    }
  });
});

export default store;
