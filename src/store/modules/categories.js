import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    categories: [],
    errors: []
  },

  mutations: {
    saveCategory: (state, { category, isUpdating }) => {
      const index = state.categories.findIndex(x => x.id == category.id);

      if (isUpdating && index != -1) {
        state.categories[index] = category;
      } else {
        state.categories.push(category);
      }
    },

    removeCategory: (state, { category }) => {
      const index = state.categories.findIndex(x => x.id == category.id);

      if (index != -1) {
        state.categories.splice(index, 1);
      }
    }
  },

  actions: {
    async fetch({ state }) {
      state.loading = true;

      return new Promise((resolve, reject) => {
        axios
          .get("categories", {
            params: {
              all: true
            }
          })
          .then(response => {
            state.categories = response.data;
            resolve(response);
          })
          .catch(err => {
            state.errors = err.response.data;
            reject(err);
          })
          .finally(() => {
            state.loading = false;
          });
      });
    },

    async save({ commit }, payload) {
      const { category, data } = payload;

      const isUpdating = !!category;

      const url = isUpdating
        ? `categories/${category.id}/update`
        : "categories";

      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then(response => {
            commit("saveCategory", { category: response.data, isUpdating });
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    async delete({ commit }, payload) {
      const { category } = payload;

      const url = `categories/${category.id}/delete`;

      return new Promise((resolve, reject) => {
        axios
          .post(url)
          .then(response => {
            commit("removeCategory", { category });
            resolve(response.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
