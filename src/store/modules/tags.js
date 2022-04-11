import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    tags: [],
    errors: [],
  },

  mutations: {
    setTags: (state, tags) => (state.tags = tags),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveTag: (state, { tag, isUpdating }) => {
      const index = state.tags.findIndex((x) => x.id == tag.id);

      if (isUpdating && index != -1) {
        state.tags[index] = tag;
      } else {
        state.tags.push(tag);
      }
    },

    removeTag: (state, { tag }) => {
      const index = state.tags.findIndex((x) => x.id == tag.id);

      if (index != -1) {
        state.tags.splice(index, 1);
      }
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      return new Promise((resolve, reject) => {
        axios
          .get("tags", {
            params: {
              all: true,
            },
          })
          .then((response) => {
            commit("setTags", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setErrors", err.response.data);
            reject(err);
          })
          .finally(() => {
            commit("setLoading", false);
          });
      });
    },

    async save({ commit }, payload) {
      const { tag, data } = payload;

      const isUpdating = !!tag;

      const url = isUpdating ? `tags/${tag.id}/update` : "tags";

      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            commit("saveTag", { tag: response.data, isUpdating });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async delete({ commit }, payload) {
      const { tag } = payload;

      const url = `tags/${tag.id}/delete`;

      return new Promise((resolve, reject) => {
        axios
          .post(url)
          .then((response) => {
            commit("removeTag", { tag });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
