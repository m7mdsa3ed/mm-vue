import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    categories: [],
    errors: []
  },

  actions: {
    async fetch({ state }) {
      state.loading = true;

      return new Promise((resolve, reject) => {
        axios
          .get("categories", {
            params: {
              all: true
            }
          })
          .then(response => {
            state.categories = response.data;
            resolve(response);
          })
          .catch(err => {
            state.errors = err.response.data;
            reject(err);
          })
          .finally(() => {
            state.loading = false;
          });
      });
    }
  }
};
