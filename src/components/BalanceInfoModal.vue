<template>
  <div class="modal fade" id="BalanceInfoModal" tabindex="-1" aria-labelledby="BalanceInfoModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Balance Info</p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div v-if="balance && currencyId">
            <p class="fw-bold mb-0"> In Other Currencies ( {{ $fn.money(balance, currency.name) }} ) </p>

            <div class="d-flex flex-column gap-1">
              <template v-for="currencyRate in currency.rates || []" :key="currencyRate.id">
                <div class="d-flex justify-content-between">
                  <span>
                    {{ $fn.money(currencyRate.rate * balance, currencyRate.to_currency.name) }}
                  </span>

                  <span>
                    {{ $date(currencyRate.updated_at).format('LLL') }}
                  </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
  props: ["balance", 'currencyId'],

  computed: {
    ...mapState({
      currencies: state => state.currencies.data
    }),

    currency() {
      if (this.currencyId) {

      }

      return this.currencies.filter(currency => currency.id == this.currencyId)[0]
    },
  }
};
</script>