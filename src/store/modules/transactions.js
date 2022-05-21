import axios from "axios";
import { JSON2FD } from "../../helpers";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setTransactions: (state, transactions) => (state.data = transactions),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveTransaction: (state, { transaction, isUpdating }) => {
      const index = state.data.data.findIndex((x) => x.id == transaction.id);

      if (isUpdating && index != -1) {
        state.data.data[index] = transaction;
      } else {
        state.data.data.push(transaction);
      }
    },

    removeTransaction: (state, transaction) => {
      const index = state.data.data.findIndex((x) => x.id == transaction.id);

      if (index != -1) {
        state.data.data.splice(index, 1);
      }
    },
  },

  actions: {
    async fetch({ commit }, payload) {
      let { url, filter } = payload || {};

      // Reset Before Fetch
      if (typeof filter.rbf != "undefined") {
        commit("setTransactions", []);
      }

      commit("setLoading", true);

      return new Promise((resolve, reject) => {
        axios
          .get(url ?? "transactions", {
            params: filter,
          })
          .then((response) => {
            commit("setTransactions", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setErrors", err.response.data);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    async save({ commit }, { data, isUpdating }) {
      const fd = JSON2FD(data);

      const url = isUpdating
        ? `transactions/${data.id}/update`
        : "transactions";

      return new Promise((resolve, reject) => {
        axios
          .post(url, fd)
          .then((res) => {
            commit("saveTransaction", { transaction: res.data, isUpdating });
            resolve(res.data);
          })
          .catch((err) => {
            commit("setErrors", err.response.data);
            reject(err);
          });
      });
    },

    async delete({ commit }, { transaction }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`transactions/${transaction.id}/delete`)
          .then((res) => {
            commit("removeTransaction", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            commit("setErrors", err.response?.data);
            reject(err);
          });
      });
    },
  },
};
