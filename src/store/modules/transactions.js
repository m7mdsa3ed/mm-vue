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
    pages: [],
    errors: null,
  },

  mutations: {
    setTransactions: (state, { data, append }) => {
      if (append) {
        state.pages = [...state.pages, data]

        const currentTransactionsData = state.data.data;

        data.data = [...currentTransactionsData, ...data.data];
      }

      state.data = data;
    },
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

      let { url, filter, append } = payload || {};

      const data = await getTransactions(url, filter);

      commit("setTransactions", { data, append });
    },

    async save({ commit }, { data }) {
      const transaction = await saveTransaction(data, data.id)

      commit("saveTransaction", transaction);
    },

    async delete({ commit }, { transaction }) {
      await deleteTransaction(transaction.id);

      commit("removeTransaction", transaction);
    },
  },
};
