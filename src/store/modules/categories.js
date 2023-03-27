import { mergeRow, removeRow } from "../../helpers";
import { deleteCategory, getCategories, saveCategory } from '../../api/categories'

export default {
  namespaced: true,

  state: {
    loading: false,
    categories: [],
    errors: [],
  },

  mutations: {
    setCategories: (state, categories) => (state.categories = categories),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveCategory: (state, row) => {
       mergeRow({
        row,
        target: state.categories,
        key: "id",
      });
    },

    removeCategory: (state, row) => {
      removeRow({
        row,
        target: state.categories,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);
      
      try {
        commit("setCategories", await getCategories());
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async save({ commit }, { data }) {
      commit("setLoading", true);

      try {
        commit("saveCategory", await saveCategory(data, data.get('id')));
      } catch (error) {
        commit("setErrors", error);
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { category }) {
      commit("setLoading", true);

      try {
        await deleteCategory(category.id)

        commit("removeCategory", category);
      } catch (error) {

        commit("setErrors", error);
      }

      commit("setLoading", false);
    },
  },
};
