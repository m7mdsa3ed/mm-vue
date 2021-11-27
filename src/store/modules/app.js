import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: true,
    loadingMessage: null,
    loadingDefaultMessage: "Loading",
    stats: null
  },

  getters: {
    loadingMessage: state => state.loadingMessage ?? state.loadingDefaultMessage
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
