import axios from "axios";
import store from "..";
import { getSettings, saveSettings, deploy } from '../../api/settings'
import { appInfo } from '../../api/app'

export default {
  namespaced: true,

  state: {
    info: null,
    stats: null,
    charts: null,
    loading: false,
    stopActions: false,
    schema: null,
  },

  mutations: {
    changeSchema: (state, schema) => (state.schema = schema),
  
    setAppState: (state, payload) => {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },

  actions: {
    async fetchStats({ state }) {
      return new Promise((resolve, reject) => {
        axios.get("stats").then((response) => {
          state.stats = response.data;
          resolve(response.data);
        });
      });
    },

    async fetchAppInfo({ commit }) {
      try {
        const info = await appInfo()

        commit('setAppState', { info })
      } catch (error) {
        console.log({ error });
      }
    },

    async fetchAll() {
      [
        "accounts/fetch",
        "accounts/fetchTypes",
        "categories/fetch",
        "transactions/fetch",
        "tags/fetch",
        "currencies/fetch",
        "app/fetchStats",
        "app/fetchAppInfo",
      ].forEach((dispatchName) => {
        store.dispatch(dispatchName);
      });
    },

    async redeploy() {
      return await deploy();
    },

    loading({ state }, payload) {
      return payload == true
        ? (state.loading = payload)
        : setTimeout(() => {
            state.loading = payload;
          }, 500);
    },

    stopActions({ state }, payload) {
      return payload == true
        ? (state.stopActions = payload)
        : setTimeout(() => {
            state.stopActions = payload;
          }, 500);
    },

    async getSettings({}) {
      return await getSettings()
    },

    async saveSettings({}, { key, value }) {
      return await saveSettings(key, value)
    },

    async deploy({}, { requestConfig }) {
      return await deploy(requestConfig)
    },

    changeAppSchema({ commit }, schema) {
      commit('changeSchema', schema)
    },
  },

  getters: {
    appSchema: (state) => (state.schema)
  }
};
