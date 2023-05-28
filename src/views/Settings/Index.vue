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

      <CurrenciesSettings :currencies="currencies" :upstreamCurrencyRatesExcludedIds="upstreamCurrencyRatesExcludedIds" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import CurrenciesSettings from "./Components/CurrenciesSettings.vue";
import PermissionsSettings from "./Components/PermissionsSettings.vue";
import GeneralSettings from "./Components/GeneralSettings.vue";

const { dispatch, state } = useStore();

const roles =  computed(() => state.roles.data?.roles)
const permissions =  computed(() => state.roles.data?.permissions)
const currencies =  computed(() => state.currencies)
const settings =  computed(() => state.settings.data)
const upstreamCurrencyRatesExcludedIds =  computed(() => {
  return state.settings.data.filter((setting) => setting.key == 'upstreamCurrencyRatesExcludedIds')[0]?.value || []
})

onMounted(() => {
  dispatch("roles/fetch");
  dispatch("settings/fetch");
})
</script>