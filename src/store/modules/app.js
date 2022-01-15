import axios from "axios";

export default {
  namespaced: true,

  state: {
    stats: null
  },

  actions: {
    async fetchStats({ state }) {
      return new Promise((resolve, reject) => {
        axios.get("stats").then(response => {
          state.stats = response.data;
          resolve(response.data);
        });
      });
    }
  }
};
