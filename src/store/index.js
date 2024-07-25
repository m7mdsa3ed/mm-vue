import {createStore} from "vuex-extensions";
import {Store} from "vuex";
import app from "./modules/app";
import auth from "./modules/auth";
import accounts from "./modules/accounts";
import categories from "./modules/categories";
import tags from "./modules/tags";
import transactions from "./modules/transactions";
import currencies from "./modules/currencies";
import roles from "./modules/roles";
import settings from "./modules/settings";
import profile from "./modules/profile";
import budgets from "./modules/budgets";
import navigation from "./modules/navigation.js";
import accountTypes from "./modules/accountTypes";
import notifications from "./modules/notifications";
import subscriptions from "./modules/subscriptions";
import contacts from "./modules/contacts.js";
import {cache} from "../helpers";

const cacheEnabled = import.meta.env.VITE_ENABLE_VUEX_CACHE === "true";

const store = createStore(Store, {
  modules: {
    app,
    auth,
    accounts,
    categories,
    tags,
    transactions,
    currencies,
    roles,
    settings,
    profile,
    budgets,
    navigation,
    accountTypes,
    notifications,
    subscriptions,
    contacts,
  },

  mutations: {
    restoreState(state) {
      if (!cacheEnabled) {
        return;
      }

      if (!cache().local().has('store') && !cache().local().has('ACCESS_TOKEN')) {
        return
      }

      const cachedStats = JSON.parse(cache().local().get('store'));

      this.replaceState(
        Object.assign(state, cachedStats)
      );
    },
  },
});

store.subscribe((mutation, state) => {
  if (cacheEnabled) {
    const data = JSON.parse(JSON.stringify(state));
    
    delete data.auth.credentials;
    
    cache().local().set("store", JSON.stringify(data));
  }

  const globalListener = [];

  const vuexEventListeners = [
    {
      events: "transactions/saveTransaction",
      listeners: ["accounts/fetch", "app/fetchStats"],
    },
    {
      events: "currencies/updateRow",
      listeners: ["currencies/fetch"],
    }
  ];

  vuexEventListeners.forEach(({events, listeners}) => {
    events = Array.isArray(events) ? events : [events];

    if (events.includes(mutation.type)) {
      [...globalListener, ...listeners].forEach((action) => {
        if (typeof action == "string") {
          store.dispatch(action);
        }

        if (typeof action == "function") {
          action();
        }
      });
    }
  });
});
export default store;
