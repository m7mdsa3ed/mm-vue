import {saveFcmToken} from "../../api/settings";

export default {
  namespaced: true,

  state: {
    notifications: [],
  },

  mutations: {
    pushNotification: (state, notification) => {
      state.notifications.push(notification);
    },
  },

  actions: {
    async saveFcmToken({}, token) {
      await saveFcmToken(token)
    }
  }
};
