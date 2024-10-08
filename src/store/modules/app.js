import axios from "axios";
import store from "..";
import { getSettings, saveSettings, deploy } from "../../api/settings";
import { appInfo } from "../../api/app";

export default {
  namespaced: true,

  state: {
    info: null,
    stats: null,
    charts: null,
    loading: [],
    stopActions: false,
    schema: null,
  },

  mutations: {
    changeSchema: (state, schema) => (state.schema = schema),

    setAppState: (state, payload) => {
      for (const key in payload) {
        state[key] = payload[key];
      }
    },

    changeLoadingState: (state, payload) => (state.loading = payload),
  },

  actions: {
    async fetchStats({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get("stats", {
            params: payload,
          })
          .then((response) => {
            state.stats = response.data;
            resolve(response.data);
          });
      });
    },

    async fetchAppInfo({ commit }) {
      try {
        const info = await appInfo();

        commit("setAppState", { info });
      } catch (error) {
        console.log({ error });
      }
    },

    async fetchAll() {
      [
        ["accounts/fetch", { filters: { is_active: 1 } }],
        "accounts/fetchTypes",
        "categories/fetch",
        "transactions/fetch",
        "tags/fetch",
        "currencies/fetch",
        'currencies/fetchUserCurrenciesWithRates',
        "app/fetchStats",
        "app/fetchAppInfo",
        'contacts/fetch',
        'subscriptions/fetch',
      ].forEach((dispatchName) => {
        if (typeof dispatchName === "string") {
          store.dispatch(dispatchName);
        } else {
          store.dispatch(dispatchName[0], dispatchName[1]);
        }
      });
    },

    async redeploy() {
      return await deploy();
    },

    loading({ commit }, payload) {
      commit("changeLoadingState", payload);
    },

    stopActions({ state }, payload) {
      return payload == true
        ? (state.stopActions = payload)
        : setTimeout(() => {
          state.stopActions = payload;
        }, 500);
    },

    async getSettings() {
      return await getSettings();
    },

    async saveSettings(_, { key, value }) {
      return await saveSettings(key, value);
    },

    async deploy(_, { requestConfig }) {
      return await deploy(requestConfig);
    },

    changeAppSchema({ commit }, schema) {
      commit("changeSchema", schema);
    },

    serviceWorkerStatus({ state }, payload) {
      state.serviceWorkerStatus = payload;
    }
  },

  getters: {
    appSchema: (state) => state.schema,
  },
};
