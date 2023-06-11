import { mergeRow, removeRow } from "../../helpers";
import {
  deleteAccount,
  getAccountTypes,
  getAccounts,
  saveAccount,
} from "../../api/accounts";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
    types: [],
  },

  mutations: {
    setAccounts: (state, accounts) => (state.data = accounts),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),
    setAccountTypes: (state, types) => (state.types = types),

    saveAccount: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },

    removeAccount: (state, row) => {
      removeRow({
        row,
        target: state.data,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      try {
        commit("setAccounts", await getAccounts());
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async save({ commit }, { account }) {
      commit("setLoading", true);

      try {
        commit("saveAccount", await saveAccount(account, account.id));
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { account }) {
      commit("setLoading", true);

      try {
        await deleteAccount(account.id);

        commit("removeAccount", account);
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async fetchTypes({ commit }) {
      commit("setLoading", true);

      try {
        const types = await getAccountTypes();

        commit("setAccountTypes", types);
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },
  },
};
