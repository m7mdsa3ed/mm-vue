import { getRoles, saveRoles } from "../../api/roles";

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
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      try {
        commit("setData", await getRoles());
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({ commit }, { fd }) {
      commit("setLoading", true);

      try {
        commit("setData", await saveRoles(fd));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
  },
};
