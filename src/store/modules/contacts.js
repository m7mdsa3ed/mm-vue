import {mergeRow, removeRow} from "../../helpers.js";
import {deleteContact, getContacts, saveContact} from "../../api/contacts.js";

export default {
  namespaced: true,

  state: {
    loading: false,
    data: [],
    errors: null,
  },
  
  mutations: {
    setData: (state, data) => (state.data = data),
    setErrors: (state, errors) => (state.errors = errors),
    setLoading: (state, status) => (state.loading = status),

    saveRow: (state, row) => {
      mergeRow({
        row,
        target: state.data,
        key: "id",
      });
    },

    removeRow: (state, row) => {
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
      
      commit("setErrors", null);
      
      let { url, filter } = payload || {};
      
      try {
        const data = await getContacts(url, filter);

        console.log({ data })
        
        commit("setData", data);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }
    },
    
    async save({ commit }, { contact }) {
      commit("setLoading", true);
      
      commit("setErrors", null);
      
      try {
        const response = await saveContact(contact, contact.id);
        
        commit("saveRow", response);
      } catch (error) {
        commit("setErrors", error.getErrors());
      }
      
      commit("setLoading", false);
    },
    
    async delete({ commit }, { id }) {
      commit("setLoading", true);
      
      commit("setErrors", null);
      
      try {
        await deleteContact(id);
        
        commit("removeRow", { id });
      } catch (error) {
        commit("setErrors", error.getErrors());
      }
      
      commit("setLoading", false);
    },
  },
}