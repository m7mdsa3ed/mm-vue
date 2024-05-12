import {mergeRow, removeRow} from "../../helpers";
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
    setTransactions: (state, {data, append}) => {
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
    async fetch({commit}, payload) {
      commit("setLoading", true);

      commit("setErrors", null);

      let {url, filter, append} = payload || {};

      try {
        const data = await getTransactions(url, filter);

        commit("setTransactions", {data, append});
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({commit}, {data}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit("saveTransaction", await saveTransaction(data, data.id));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async delete({commit}, {transaction}) {
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
