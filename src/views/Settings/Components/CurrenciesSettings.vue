<template>
  <div class="box bg-main">
    <h2>Currencies Settings</h2>

    <table class="table table-borderless">
      <thead>
        <tr>
          <th>Currency Name</th>
          <th style="width: 1px"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="currency in currencies.data" :key="currency.id">
          <tr>
            <td>
              <input
                type="text"
                :value="currency.name"
                class="form-control mb-3"
                @change="(evt) => updateCurrency(evt, currency)"
              />

              <CurrencyRateSettings :rates="currency.rates"/>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import CurrencyRateSettings from './CurrencyRateSettings.vue';
export default {
  components: { CurrencyRateSettings },

  props: ["currencies"],

  methods: {
    async updateCurrency(evt, currency) {
      await this.$store.dispatch("currencies/update", {
        data: {
          id: currency.id,
          name: evt.target.value,
        },
      });
    },
  },
};
</script>

<style>
</style>