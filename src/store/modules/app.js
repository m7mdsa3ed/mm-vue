import axios from "axios";
import store from "..";

export default {
  namespaced: true,

  state: {
    info: null,
    stats: null,
    charts: null,
    loading: false,
    stopActions: false,
  },

  actions: {
    async fetchStats({ state }) {
      return new Promise((resolve, reject) => {
        axios.get("stats").then((response) => {
          state.stats = response.data;
          resolve(response.data);
        });
      });
    },
    
    async fetchAppInfo({ state }) {
      return new Promise((resolve, reject) => {
        axios.get("appInfo").then((response) => {
          state.info = response.data;
          resolve(response.data);
        });
      });
    },

    async fetchAll() {
      [
        "accounts/fetch",
        "categories/fetch",
        "transactions/fetch",
        "tags/fetch",
        "currencies/fetch",
        "app/fetchStats",
        "app/fetchAppInfo",
      ].forEach((dispatchName) => {
        store.dispatch(dispatchName);
      });
    },

    loading({ state }, payload) {
      return payload == true
        ? (state.loading = payload)
        : setTimeout(() => {
            state.loading = payload;
          }, 500);
    },

    stopActions({ state }, payload) {
      return payload == true
        ? (state.stopActions = payload)
        : setTimeout(() => {
            state.stopActions = payload;
          }, 500);
    },
  },
};
