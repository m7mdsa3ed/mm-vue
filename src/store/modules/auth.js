import axios from "axios";
import store from "..";
import router from "../../router";
import { login, register } from "../../api/auth";

const LSItemName =
  (import.meta.env.VITE_LOCALSTORAGE_NAMESPACE ?? "VUE") + ".ACCESS_TOKEN";

export default {
  namespaced: true,

  state: {
    loading: false,
    errors: null,
    user: null,
    token: localStorage.getItem(LSItemName),
    enabled: true,
  },

  mutations: {
    setErrors: (state, errors) => (state.errors = errors),

    setLoading: (state, status) => (state.loading = status),

    setAuthentication: (state, { token, user }) => {
      state.token = typeof token == "undefined" ? state.token : token;

      state.user = user;

      localStorage.setItem(LSItemName, state.token);

      axios.defaults.headers.Authorization = `Bearer ${state.token}`;

      store.dispatch("app/fetchAll");
    },
  },

  actions: {
    async login({ commit }, userCredentials) {
      commit("setErrors", null);

      commit("setLoading", true);

      try {
        const { token, user } = await login(userCredentials);

        commit("setAuthentication", { token, user });
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async register({ commit }, payload) {
      commit("setErrors", null);

      commit("setLoading", true);
      
      try {
        const { token, user } = await register(payload);

        console.log({ token, user });

        commit("setAuthentication", { token, user });
      } catch (error) {
        commit("setErrors", error.getErrors());
      }
      
      commit("setLoading", false);
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

  getters: {
    user: (state) => state.user,
  },
};
