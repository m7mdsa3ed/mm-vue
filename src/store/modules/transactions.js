import { mergeRow, removeRow } from "../../helpers";
import {
  deleteTransaction,
  getTransactions,
  saveTransaction,
} from "../../api/transactions";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: null,
  },

  mutations: {
    setTransactions: (state, transactions) => (state.data = transactions),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveTransaction: (state, row) => {
      mergeRow({
        row,
        target: state.data.data,
        key: "id",
      });
    },

    removeTransaction: (state, row) => {
      removeRow({
        row,
        target: state.data.data,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({ commit }, payload) {
      commit("setLoading", true);

      commit("setErrors", null);

      commit("setTransactions", []);

      let { url, filter } = payload || {};

      try {
        const data = await getTransactions(url, filter);

        commit("setTransactions", data);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({ commit }, { data }) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit("saveTransaction", await saveTransaction(data, data.id));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { transaction }) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        await deleteTransaction(transaction.id);

        commit("removeTransaction", transaction);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
  },
};
