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

  actions: {},

  getters: {},
};
