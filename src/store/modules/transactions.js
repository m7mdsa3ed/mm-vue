import axios from "axios";
import { JSON2FD } from "../../helpers";
import store from "..";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: []
  },

  actions: {
    async fetch({ state }, payload) {
      let url = payload?.url;
      let filter = payload?.filter;

      store.commit("loading", [true, "Loading Transactions."]);

      return new Promise((resolve, reject) => {
        axios
          .get(url ?? "transactions", {
            params: filter
          })
          .then(response => {
            state.data = response.data;
            resolve(response);
          })
          .catch(err => {
            state.errors = err.response.data;
            reject(err);
          })
          .finally(() => {
            store.commit("loading", false);
          });
      });
    },

    async save({}, { data, isUpdating }) {
      store.commit("loading", [true, "Creating transaction"]);

      return new Promise((resolve, reject) => {
        const fd = JSON2FD(data);

        const url = isUpdating
          ? `transactions/${data.id}/update`
          : "transactions";

        axios
          .post(url, fd)
          .then(res => {
            resolve(res.data);

            store.dispatch("app/fetchStats");
          })
          .catch(err => reject(err))
          .finally(() => store.commit("loading", false));
      });
    },

    async delete({}, { transaction }) {
      store.commit("loading", [true, "Deleting transaction"]);

      return new Promise((resolve, reject) => {
        axios
          .post(`transactions/${transaction.id}/delete`)
          .then(res => resolve(res.data))
          .catch(err => reject(err))
          .finally(() => store.commit("loading", false));
      });
    }
  }
};
