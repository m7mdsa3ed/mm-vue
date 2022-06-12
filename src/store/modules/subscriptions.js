import axios from "axios";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setSubscriptions: (state, data) => (state.data = data),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveSubscription: (state, { subscription, isUpdating }) => {
      const index = state.data.data.findIndex((x) => x.id == subscription.id);

      if (isUpdating && index != -1) {
        state.data.data[index] = subscription;
      } else {
        state.data.data.push(subscription);
      }
    },

    removeSubscription: (state, { subscription }) => {
      const index = state.data.data.findIndex((x) => x.id == subscription.id);

      if (index != -1) {
        state.data.data.splice(index, 1);
      }
    },
  },

  actions: {
    async fetch({ commit }) {
      commit("setLoading", true);

      return new Promise((resolve, reject) => {
        axios
          .get("subscriptions", {
            params: {
              all: true,
            },
          })
          .then((response) => {
            commit("setSubscriptions", response.data);
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
      const { data, isUpdating } = payload;

      const url = isUpdating
        ? `subscriptions/${data.id}/update`
        : "subscriptions";

      return new Promise((resolve, reject) => {
        axios
          .post(url, data)
          .then((response) => {
            commit("saveSubscription", {
              subscription: response.data,
              isUpdating,
            });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async delete({ commit }, payload) {
      const { subscription } = payload;

      const url = `subscriptions/${subscription.id}/delete`;

      return new Promise((resolve, reject) => {
        axios
          .post(url)
          .then((response) => {
            commit("removeSubscription", { subscription });
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async renew({ commit }, payload) {
      const { subscription } = payload;

      const url = `subscriptions/${subscription.id}/renew`;

      return new Promise((resolve, reject) => {
        axios
          .post(url)
          .then((response) => {
            commit("saveSubscription", {
              subscription: response.data,
              isUpdating: true,
            });

            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
