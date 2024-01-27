<script setup>

import {computed, ref} from "vue";
import {useStore} from "vuex";
import {money} from "../../../helpers.js";

const {state, dispatch} = useStore();

const userCurrencies = computed(() => state.currencies.userCurrenciesWithRates)

const rates = computed(() => {
  const ratesPerCurrency = Object.keys(userCurrencies.value).map((currency) => {
    return userCurrencies.value[currency].rates.map((rate) => {
      return rate
    })
  });

  return ratesPerCurrency.flat().filter((rate) => {
    return rate.from_currency.id !== rate.to_currency.id && rate.to_currency.id == 1
  });
})

const saveUserCurrencyRate = async (rate, currencyRateId) => {
  await dispatch('currencies/saveUserCurrencyRate', {rate, currencyRateId})

  await dispatch('currencies/fetchUserCurrenciesWithRates')
}

const resetUserCurrencyRate = async (userCurrencyRateId) => {
  await dispatch('currencies/resetUserCurrencyRate', userCurrencyRateId)
  
  await dispatch('currencies/fetchUserCurrenciesWithRates')
}

const differenceInPercentage = (rate) => {
  const diff = (100 - (rate.rate / rate.user_currency_rates[0]?.rate * 100));
  
  if (diff > 0) {
    return diff.toFixed(2)
  }
  
  return 0
}

</script>

<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>From</th>
          <th>To Rate</th>
          <th>Custom Rate</th>
          <th>D %</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="rate in rates" :key="rate.id">
          <tr>
            <td> {{ rate.from_currency.name }}</td>
            <td> <span class="text-nowrap"> {{ money(rate.rate) }} </span> </td>
            <td>
              <div class="d-flex gap-1" >
                <input
                  type="number"
                  class="form-control form-control-sm border-0"
                  style="min-width: 100px"
                  placeholder="0.00"
                  :value="rate.user_currency_rates[0]?.rate"
                  @change="(e) => saveUserCurrencyRate(e.target.value, rate.id)"
                >

                <button
                  v-if="rate.user_currency_rates[0]?.rate"
                  class="btn btn-sm btn-outline-danger"
                  @click="resetUserCurrencyRate(rate.user_currency_rates[0]?.id)"
                >
                  Reset
                </button>
              </div>
            </td>
            <td>
              <span class="text-nowrap">
                {{differenceInPercentage(rate)}} %
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>