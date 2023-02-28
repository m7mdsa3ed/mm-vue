import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setAccounts: (state, accounts) => (state.data = accounts),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveAccount: (state, { account, isUpdating }) => {
      const index = state.data.findIndex((x) => x.id == account.id);

      if (isUpdating && index != -1) {
        const currentAccount = state.data[index];

        state.data[index] = {
          ...currentAccount,
          ...account
        };
      } else {
        state.data.push(account);
      }
    },

    removeAccount: (state, account) => {
      const index = state.data.findIndex((x) => x.id == account.id);

      if (index != -1) {
        state.data.splice(index, 1);
      }
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      return new Promise((resolve, reject) => {
        axios
          .get("accounts")
          .then((response) => {
            commit("setAccounts", response.data);
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

    async save({ commit }, payload) {
      const { account, data } = payload;

      const isUpdating = !!account;

      const url = isUpdating ? `accounts/${account.id}/update` : "accounts";

      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            commit("saveAccount", { account: response.data, isUpdating });
            resolve(response.data);
          })
          .catch((err) => {
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
          .then((response) => {
            commit("removeAccount", { account: account });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
