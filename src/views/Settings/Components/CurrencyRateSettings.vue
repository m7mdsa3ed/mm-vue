<template>
  <div class="box bg-body">
    <table class="table table-borderless table-sm mb-0 align-middle">
      <template v-if="rates.length">
        <tbody>
          <template v-for="currencyRate in rates" :key="currencyRate.id">
            <tr>
              <td style="width: 1px" class="text-nowrap">
                {{ currencyRate.to_currency.name }}
              </td>
              <td>
                <input
                  type="text"
                  :value="currencyRate.rate"
                  class="form-control"
                  @change="
                    updateCurrencyRate(currencyRate, $event.target.value)
                  "
                />
              </td>
            </tr>
          </template>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  props: ["rates"],

  methods: {
    async updateCurrencyRate(currencyRate, rate) {
      const { id, from_currency_id } = currencyRate;

      await this.$store.dispatch("currencies/updateRate", {
        id,
        rate,
        fromCurrencyId: from_currency_id
      });
    },
  },
};
</script>
