<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Settings</p>

      <button class="btn btn-outline-danger" @click="load">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="d-flex flex-column gap-3 mb-3">
      <GeneralSettings :settings="settings" />

      <PermissionsSettings :roles="roles" :permissions="permissions" />

      <CurrenciesSettings :currencies="currencies" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CurrenciesSettings from "./Components/CurrenciesSettings.vue";
import PermissionsSettings from "./Components/PermissionsSettings.vue";
import GeneralSettings from "./Components/GeneralSettings.vue";

export default {
  components: {
    CurrenciesSettings,
    PermissionsSettings,
    GeneralSettings,
  },

  computed: {
    ...mapState({
      roles: (state) => state.roles.data?.roles,
      permissions: (state) => state.roles.data?.permissions,
      currencies: (state) => state.currencies,
      settings: (state) => state.settings.data,
    }),
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      this.$store.dispatch("roles/fetch");
      this.$store.dispatch("settings/fetch");
    },
  },
};
</script>