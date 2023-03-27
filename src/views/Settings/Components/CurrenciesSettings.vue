<template>
  <div class="box bg-main">
    <h2>Currencies Settings</h2>

    <table class="table table-borderless table-striped">
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
                class="form-control bg-transparent border-0"
                @change="(evt) => updateCurrency(evt, currency)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
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