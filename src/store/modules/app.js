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

    async loadChartData({ state }) {
      return new Promise((resolve, reject) => {
        axios.get("charts").then((res) => {
          state.charts = res.data;
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
      ].forEach((dispatchName) => {
        store.dispatch(dispatchName);
      });
    },
  },
};
