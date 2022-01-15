import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: []
  },

  mutations: {
    saveAccount: (state, { account, isUpdating }) => {
      const index = state.data.findIndex(x => x.id == account.id);

      if (isUpdating && index != -1) {
        state.data[index] = account;
      } else {
        state.data.push(account);
      }
    }
  },

  actions: {
    async fetch({ state }) {
      state.loading = true;

      return new Promise((resolve, reject) => {
        axios
          .get("accounts")
          .then(response => {
            state.data = response.data;
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
    },

    async save({ commit }, payload) {
      const { account, data } = payload;

      const isUpdating = !!account;

      const url = isUpdating ? `accounts/${account.id}/update` : "accounts";

      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then(response => {
            commit("saveAccount", { account: response.data, isUpdating });
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    async delete({ commit }, payload) {
      const { account } = payload;

      const url = `accounts/${account.id}/delete`;

      return new Promise((resolve, reject) => {
        axios
          .post(url)
          .then(response => {
            commit("removeAccount", { account: account });
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
