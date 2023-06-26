import { mergeRow, removeRow } from "../../helpers";
import { deleteBudget, getBudgets, saveBudget } from "../../api/budgets";

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

    save: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },

    remove: (state, row) => {
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
        commit("setData", await getBudgets());
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async save({ commit }, { budget }) {
      commit("setLoading", true);

      try {
        commit("save", await saveBudget(budget, budget.id));
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { budget }) {
      commit("setLoading", true);

      try {
        await deleteBudget(budget.id);

        commit("remove", budget);
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },
  },
};
