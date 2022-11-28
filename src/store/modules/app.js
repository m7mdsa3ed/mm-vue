import axios from "axios";
import store from "..";

export default {
  namespaced: true,

  state: {
    stats: null,
    charts: null,
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

    async fetchAll() {
      [
        "accounts/fetch",
        "categories/fetch",
        "transactions/fetch",
        "tags/fetch",
        "currencies/fetch",
        "subscriptions/fetch",
        "app/fetchStats",
      ].forEach((dispatchName) => {
        store.dispatch(dispatchName);
      });
    },
  },
};
