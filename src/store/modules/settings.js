import { getSettings, saveSettings, deploy } from "../../api/settings";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: null,
    errors: [],
  },

  mutations: {
    setLoading: (state, status) => (state.loading = status),
    setData: (state, payload) => (state.data = payload),
    setErrors: (state, payload) => (state.errors = payload),
  },

  actions: {
    async fetch({ commit }) {
      commit('setLoading', true);

      commit('setErrors', []);

      try {
        const response = await getSettings();

        commit('setData', response.settings)
      } catch (error) {
        commit('setErrors', error);
      }

      commit('setLoading', false);
    },

    async save({}, { key, value }) {
      return await saveSettings(key, value);
    },
  },

  getters: {},
};
