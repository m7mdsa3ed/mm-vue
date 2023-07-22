import {
  updateCurrency,
  getCurrencies,
  updateCurrencyRate,
} from "../../api/currencies";
import { mergeRow } from "../../helpers";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: [],
  },

  mutations: {
    setData: (state, currencies) => (state.data = currencies),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),
    updateRow: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },
  },

  actions: {
    async fetch({ commit }, payload) {
      commit("setLoading", true);

      try {
        commit("setData", await getCurrencies(payload));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async update({ commit, state }, { data }) {
      commit("setLoading", true);

      try {
        commit("updateRow", await updateCurrency(data));
      } catch (error) {
        console.log({ error });

        commit("setErrors", error.getErrors());
      }

      commit("setLoading", false);
    },

    async updateRate({ commit, state }, { id, rate, fromCurrencyId }) {
      const currencyRates = await updateCurrencyRate(id, rate);

      const currencyIndex = state.data.findIndex((c) => c.id == fromCurrencyId);

      const currency = state.data[currencyIndex];

      if (currency) {
        currency.rates = currencyRates;

        commit("updateRow", currency);
      }
    },
  },
};
