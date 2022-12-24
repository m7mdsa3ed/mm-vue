import axios from "axios";
import store from "..";
import router from "../../router";

const LSItemName = (import.meta.env.VITE_LOCALSTORAGE_NAMESPACE ?? "VUE") + ".ACCESS_TOKEN";

export default {
  namespaced: true,

  state: {
    loading: false,
    errors: [],
    user: null,
    token: localStorage.getItem(LSItemName),
    enabled: true,
  },

  actions: {
    async login({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        state.errors = [];

        axios
          .post("login", payload)
          .then((response) => {
            dispatch("_login", response.data);
            resolve(response);
          })
          .catch((err) => {
            state.errors = err.response.data;
            reject(err);
          })
          .finally(() => {
            state.loading = false;
          });
      });
    },

    async register({ state }, payload) {
      return new Promise((resolve, reject) => {
        state.errors = [];

        axios
          .post("register", payload)
          .then((response) => {
            const { user, token } = response.data;

            state.token = token;
            state.user = user;
            resolve(response);
          })
          .catch((err) => {
            state.errors = err.response.data;
            reject(err);
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
          .catch((err) => {
            state.errors = err.response.data;
          });
      });
    },

    async getUser({ state, dispatch }) {
      return new Promise((resolve, reject) => {
        if (state.token == null) {
          return reject("No token");
        }

        axios
          .get("me")
          .then((response) => {
            dispatch("_login", { user: response.data });
            resolve(response);
          })
          .catch((err) => {
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

      store.dispatch("app/fetchAll");
    },

    _logout({ state }) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(LSItemName);
      axios.defaults.headers.Authorization = null;
      localStorage.removeItem("store");

      router.push({ name: "login" });
    },
  },
};
