import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    accounts: [],
    errors: []
  },

  actions: {
    async fetch({ state }) {
      state.loading = true;

      return new Promise((resolve, reject) => {
        axios
          .get("accounts", {
            params: {
              all: true
            }
          })
          .then(response => {
            state.accounts = response.data;
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
