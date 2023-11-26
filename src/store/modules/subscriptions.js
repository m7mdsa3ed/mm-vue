import {mergeRow, removeRow} from "../../helpers";
import {
  cancelSubscription,
  deleteSubscription,
  getSubscriptions,
  renewSubscription,
  saveSubscription
} from "../../api/subscriptions";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: null,
  },

  mutations: {
    setData: (state, data) => (state.data = data),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveRow: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },

    removeRow: (state, row) => {
      removeRow({
        row,
        target: state.data,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({commit}, payload) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit('setData', await getSubscriptions(payload))
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async save({commit}, {subscription}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit('saveRow', await saveSubscription(subscription, subscription.id))
      } catch (error) {

        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async renew({commit}, {subscription}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit('setRow', await renewSubscription(subscription.id))
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async cancel({commit}, {subscription}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit('setRow', await cancelSubscription(subscription.id))
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async reactivate({commit}, {subscription}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        commit('setRow', await renewSubscription(subscription.id))
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
    
    async delete({commit}, {subscription}) {
      commit("setLoading", true);

      commit("setErrors", null);

      try {
        await deleteSubscription(subscription.id)

        commit('removeRow', subscription)
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },
  },
};
