<template>
  <div class="box bg-main d-flex flex-column gap-3">
    <h2>Currencies Settings</h2>

    <template v-for="currency in currencies.data" :key="currency.id">
      <div class="d-flex justify-content-between align-content-center gap-3">
        <input
          type="text"
          :value="currency.name"
          class="form-control disabled"
          @change="(evt) => updateCurrency(evt, currency)"
        />

        <button 
          class="btn btn-sm text-nowrap" 
          @click="toggleFollow(currency.id)"
          :class="isFollowing(currency.id) ? 'btn-success' : 'btn-danger'"
        >
          <template v-if="isFollowing(currency.id)">
            <i class=" fas fa-plus"></i> Follow
          </template>

          <template v-else>
            <i class=" fas fa-close"></i> Unfollow
          </template>
        </button>
      </div>

      <CurrencyRateSettings :rates="currency.rates" />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { saveSettings } from "../../../api/settings";
import CurrencyRateSettings from "./CurrencyRateSettings.vue";

const { dispatch, state } = useStore();

const excludedSettingsKey = "upstreamCurrencyRatesExcludedIds";

const currencies = computed(() => state.currencies);

const currentExcludedIds = computed(() => {
  return state.settings.data.filter(
    (setting) => setting.key == excludedSettingsKey
  )[0]?.value || [];
});

const updateCurrency = async (evt, currency) => {
  await dispatch("currencies/update", {
    data: {
      id: currency.id,
      name: evt.target.value,
    },
  });
};

const toggleFollow = async (currencyId) => {
  if (!currencyId) {
    return;
  }

  const newValues = currentExcludedIds.value.includes(currencyId)
    ? currentExcludedIds.value.filter((id) => id != currencyId)
    : [...currentExcludedIds.value, currencyId];

  await saveSettings(excludedSettingsKey, newValues);

  await dispatch("settings/fetch");
}

const isFollowing = (currencyId) => {
  return !currentExcludedIds.value.includes(currencyId);
};
</script>
