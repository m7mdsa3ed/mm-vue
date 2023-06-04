<template>
  <div class="box bg-main d-flex flex-column gap-3">
    <h2>Currencies Settings</h2>

    <template v-for="currency in currencies.data" :key="currency.id">
      <input
        type="text"
        :value="currency.name"
        class="form-control"
        @change="(evt) => updateCurrency(evt, currency)"
      />
<!-- 
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          :id="`followCurrencyRates-${currency.id}`"
          :checked="isFollowingCurrencyRates(currency)"
          @change="() => updateCurrencyRatesExcludedIds(currency.id)"
        />

        <label
          class="form-check-label"
          :for="`followCurrencyRates-${currency.id}`"
        >
          Follow Upstream Currency Rates
        </label>
      </div> -->

      <CurrencyRateSettings :rates="currency.rates" />
    </template>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { saveSettings } from "../../../api/settings";
import CurrencyRateSettings from "./CurrencyRateSettings.vue";

const { dispatch } = useStore();

const props = defineProps({
  currencies: {
    type: Object,
    required: true,
  },
  upstreamCurrencyRatesExcludedIds: {
    type: Array,
    default: () => [],
  },
});

const isFollowingCurrencyRates = (currency) => {
  return !props.upstreamCurrencyRatesExcludedIds.includes(currency.id);
};

const updateCurrency = async (evt, currency) => {
  await dispatch("currencies/update", {
    data: {
      id: currency.id,
      name: evt.target.value,
    },
  });
};

const updateCurrencyRatesExcludedIds = async (currencyId) => {
  const currentIds = props.upstreamCurrencyRatesExcludedIds;

  const value = currentIds.includes(currencyId)
    ? currentIds.filter((id) => id != currencyId)
    : [...currentIds, currencyId];

  await saveSettings("upstreamCurrencyRatesExcludedIds", value);
};
</script>
