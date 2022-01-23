import axios from "axios";

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
  },
};
