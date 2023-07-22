import { mergeRow, removeRow } from "../../helpers";
import { deleteTag, getTags, saveTag } from '../../api/tags'

export default {
  namespaced: true,

  state: {
    loading: false,
    tags: [],
    errors: [],
  },

  mutations: {
    setData: (state, tags) => (state.tags = tags),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveTag: (state, row) => {
      mergeRow({
        row,
        target: state.tags,
        key: "id",
      });
    },

    removeTag: (state, row) => {
       removeRow({
        row,
        target: state.tags,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      try {
        commit("setData", await getTags());
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({ commit }, { data }) {
      commit("setLoading", true);

      try {
        commit("saveTag", await saveTag(data, data.get('id')));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async delete({ commit }, { tag }) {
      commit("setLoading", true);

      try {
        await deleteTag(tag.id)

        commit("removeTag", tag);
      } catch (error) {

        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
  },
};
