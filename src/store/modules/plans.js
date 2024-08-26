import { getPlans, createPlan, deletePlan, linkTransactions } from "../../api/plans.js";
import { mergeRow, removeRow } from "../../helpers.js";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: null,
    errors: [],
  },

  mutations: {
    setLoading: (state, status) => (state.loading = status),
    setData: (state, payload) => (state.data = payload),
    setErrors: (state, payload) => (state.errors = payload),

    save: (state, row) => {
        mergeRow({
          row,
          target: state.data,
          key: "id",
        });
      },
  
      remove: (state, row) => {
        removeRow({
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
        commit("setData", await getPlans(payload));
      } catch (error) {
        commit("setErrors", error.getErrors());
      }
      
      commit("setLoading", false);
    },

    async save({ commit }, payload) {
      commit("setLoading", true)

      try {
        if (payload.id) {
          commit("save", await updatePlan(payload.id, payload))
        } else {
          commit("save", await createPlan(payload))
        }
      } catch (error) {
        commit("setErrors", error.getErrors())
      }
      
      commit("setLoading", false)
    },

    async linkTransactions({ commit }, payload) {
      commit("setLoading", true)

      console.log({ payload, id: payload.plantItemId.toString() });

      try {
        await linkTransactions(payload.plantItemId.toString(), payload.transactions)
      } catch (error) {
        throw error;
        // commit("setErrors", error.getErrors())
      }
      
      commit("setLoading", false)
    },

    async delete({ commit }, { plan }) {
      commit("setLoading", true)
      
      try {
        await deletePlan(plan.id)

        commit("remove", plan)
      } catch (error) {
        commit("setErrors", error.getErrors())
      }
      
      commit("setLoading", false)
    }
  }
}
