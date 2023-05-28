<template>
  <div class="box border" v-if="rates.length">
    <template v-for="currencyRate in rates" :key="currencyRate.id">
      <div class="d-flex align-items-center">
        <span style="width: 64px">
          {{ currencyRate.to_currency.name }}
        </span>

        <input
          type="text"
          :value="currencyRate.rate"
          class="form-control"
          @change="updateCurrencyRate(currencyRate, $event.target.value)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const { dispatch } = useStore();

const props = defineProps({
  rates: {
    type: Array,
    required: true,
  },
});

const updateCurrencyRate = async (currencyRate, rate) => {
  const { id, from_currency_id } = currencyRate;

  await dispatch("currencies/updateRate", {
    id,
    rate,
    fromCurrencyId: from_currency_id,
  });
};
</script>
