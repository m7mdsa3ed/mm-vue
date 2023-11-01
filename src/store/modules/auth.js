import axios from "axios";
import store from "..";
import router from "../../router";
import {login, logout, register} from "../../api/auth";
import {cache} from "../../helpers";

export default {
  namespaced: true,

  state: {
    loading: false,
    errors: null,
    user: null,
    token: cache().local().get('ACCESS_TOKEN'),
    enabled: true,
    credentials: {}
  },

  mutations: {
    setErrors: (state, errors) => (state.errors = errors),

    setLoading: (state, status) => (state.loading = status),

    setAuthentication: (state, {token, user}) => {
      state.token = typeof token == "undefined"
        ? state.token
        : token;

      state.user = user;

      cache().local()
        .set('ACCESS_TOKEN', state.token)
        .remove("store");
      
      axios.defaults.headers.Authorization = `Bearer ${state.token}`;

      store.dispatch("app/fetchAll");
    },

    removeAuthentication: (state) => {
      state.token = null;

      state.user = null;

      cache().local()
        .remove('store')
        .remove('ACCESS_TOKEN')
      
      store.reset();
      
      axios.defaults.headers.Authorization = null;

      router.push({name: "login"});
    },

    setCredentials: (state, credentials) => {
      state.credentials = credentials
    }
  },

  actions: {
    async login({commit}, userCredentials) {
      commit("setErrors", null);

      commit("setLoading", true);

      try {
        const {token, user} = await login(userCredentials);

        commit("setAuthentication", {token, user});
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async register({commit}, payload) {
      commit("setErrors", null);

      commit("setLoading", true);

      try {
        const {token, user} = await register(payload);

        commit("setAuthentication", {token, user});
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async logout({state, commit}) {
      commit("setErrors", null);

      commit("setLoading", true);

      try {
        await logout();

        commit("removeAuthentication");
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async getUser({state, commit}) {
      return new Promise((resolve, reject) => {
        if (state.token == null) {
          return reject("No token");
        }

        axios
          .get("me")
          .then((response) => {
            commit("setAuthentication", {user: response.data});

            resolve(response);
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              commit("removeAuthentication");
            }

            state.errors = err;
            reject(err);
          });
      });
    },
  },

  getters: {
    user: (state) => state.user,
  },
};
