import {mergeRow, removeRow} from "../../helpers";
import {
  deleteAccountType,
  getAccountTypes,
  saveAccountType,
} from "../../api/accounts";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setData: (state, data) => (state.data = data),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveAccountType: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },

    removeAccountType: (state, row) => {
      removeRow({
        row,
        target: state.data,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({commit}) {
      commit("setLoading", true);

      try {
        const types = await getAccountTypes();

        commit("setData", types);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({commit}, {accountType}) {
      commit("setLoading", true);

      try {
        commit("saveAccountType", await saveAccountType(accountType, accountType.id ?? null));
      } catch (error) {
        console.log(error)
        
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async delete({commit}, {accountType}) {
      commit("setLoading", true);

      try {
        await deleteAccountType(accountType.id);

        commit("removeAccountType", accountType);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
  },
};
