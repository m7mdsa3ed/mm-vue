import axios from "axios";
import store from "..";

const LSItemName = (process.env.VUE_APP_NSP ?? "VUE") + ".ACCESS_TOKEN";

export default {
  namespaced: true,

  state: {
    loading: false,
    errors: [],
    user: null,
    token: localStorage.getItem(LSItemName),
    enabled: true
  },

  actions: {
    async login({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("login", payload)
          .then(response => {
            dispatch("_login", response.data);
            resolve(response);
          })
          .catch(err => {
            state.errors = err.response.data;
          })
          .finally(() => {});
      });
    },

    async register({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("regsiter", payload)
          .then(response => {
            const { user, token } = response.data;

            state.token = token;
            state.user = user;
          })
          .catch(err => {
            state.errors = err.response.data;
          });
      });
    },

    async logout({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        axios
          .post("logout")
          .then(() => {
            dispatch("_logout");
          })
          .catch(err => {
            state.errors = err.response.data;
          });
      });
    },

    async getUser({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        axios
          .get("me")
          .then(response => {
            dispatch("_login", { user: response.data });
            resolve(response);
          })
          .catch(err => {
            if (err.response?.status === 401) {
              dispatch("_logout");
            }

            state.errors = err;
            reject(err);
          });
      });
    },

    _login({ state }, { user, token }) {
      state.token = typeof token == "undefined" ? state.token : token;
      state.user = user;
      localStorage.setItem(LSItemName, state.token);
      axios.defaults.headers.Authorization = `Bearer ${state.token}`;
    },

    _logout({ state }) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(LSItemName);
      axios.defaults.headers.Authorization = null;
      localStorage.removeItem("store");
    }
  }
};
