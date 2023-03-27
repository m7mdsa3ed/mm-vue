<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Settings</p>

      <button class="btn btn-outline-danger" @click="load">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <PermissionsSettings :roles="roles" :permissions="permissions" />

    <CurrenciesSettings :currencies="currencies" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CurrenciesSettings from './Components/CurrenciesSettings.vue'
import PermissionsSettings from './Components/PermissionsSettings.vue'

export default {
  components: {
    CurrenciesSettings,
    PermissionsSettings,
  },

  computed: {
    ...mapState({
      roles: (state) => state.roles.data?.roles,
      permissions: (state) => state.roles.data?.permissions,
      currencies: (state) => state.currencies,
    }),
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.$store.dispatch("roles/fetch");
    },
  },
};
</script>