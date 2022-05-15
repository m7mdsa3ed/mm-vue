import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setCurrencies: (state, currencies) => (state.data = currencies),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      return new Promise((resolve, reject) => {
        axios
          .get("currencies")
          .then((response) => {
            commit("setCurrencies", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setErrors", err.response.data);
            reject(err);
          })
          .finally(() => {
            commit("setLoading", false);
          });
      });
    },
  },
};
