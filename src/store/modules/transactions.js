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
          });
      });
    },

    async save({}, { data, isUpdating }) {
      const fd = JSON2FD(data);

      const url = isUpdating
        ? `transactions/${data.id}/update`
        : "transactions";

      return new Promise((resolve, reject) => {
        axios
          .post(url, fd)
          .then(res => {
            resolve(res.data);

            store.dispatch("app/fetchStats");
          })
          .catch(err => reject(err));
      });
    },

    async delete({}, { transaction }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`transactions/${transaction.id}/delete`)
          .then(res => resolve(res.data))
          .catch(err => reject(err));
      });
    }
  }
};
