import { mergeRow, removeRow } from "../../helpers";
import { deleteAccount, getAccounts, saveAccount } from '../../api/accounts'

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

    async save({ commit }, { data }) {
      commit("setLoading", true);

      console.log(data);

      try {
        commit("saveAccount", await saveAccount(data, data.get('id')));
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { account }) {
      commit("setLoading", true);

      try {
        await deleteAccount(account.id)

        commit("removeAccount", account);
      } catch (error) {

        commit("setErrors", error);
      }

      commit("setLoading", false);
    },
  },
};
