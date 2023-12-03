import {saveFcmToken} from "../../api/settings";
import {getNotifications} from "../../api/notifications.js";

export default {
  namespaced: true,

  state: {
    loading: false,
    notifications: [],
  },

  mutations: {
    pushNotification: (state, notification) => {
      state.notifications.push(notification);
    },

    setLoading: (state, status) => state.loading = status,

    setNotifications: (state, data) => state.notifications = data,
  },

  actions: {
    async saveFcmToken({}, token) {
      await saveFcmToken(token)
    },

    async fetch({commit}) {
      commit('setLoading', true)

      try {

        const notifications = await getNotifications()

        commit('setNotifications', notifications)
      } finally {
        commit('setLoading', false)
      }
    }
  }
};
