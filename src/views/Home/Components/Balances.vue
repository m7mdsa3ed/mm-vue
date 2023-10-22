<template>
  <div>
    <div v-if="balanceByMainCurrency" class="box bg-main mb-3 p-4 w-100">
      <div type="button" class=" d-flex flex-column align-items-start" data-bs-toggle="collapse"
           data-bs-target="#balanceInformation">
        <p class="h3 fw-bold"> Balance </p>

        <p class="h1 fw-lighter mb-0"> {{ $fn.money(balanceByMainCurrency) }} </p>
      </div>

      <div id="balanceInformation" class="collapse w-100">
        <hr>

        <div class="d-flex flex-column gap-3">
          <template v-for="(balance, index) in balanceSummary" :key="index">
            <div class="w-100">
              <div class="d-flex justify-content-between align-items-center">
                <span>
                  {{ $fn.money(balance.amount, balance.currency_name) }}
                </span>

                <i
                  role="button"
                  class="icon icon-bg-info fas fa-exclamation"
                  data-bs-toggle="modal"
                  data-bs-target="#BalanceInfoModal"
                  @click="
                    balanceInfo = {
                      balance: balance.amount,
                      currencyId: balance.currency_id,
                    }
                  "
                ></i>
              </div>

              <ul class="list-unstyled text-muted mb-0">
                <li v-if="balance.loan_amount != 0">
                  Loans:
                  <span class="fw-bold text-success">
                    {{ $fn.money(balance.loan_amount) }}
                  </span>
                </li>
                <li v-if="balance.debit_amount != 0">
                  Debits:
                  <span class="fw-bold text-danger">
                    {{ $fn.money(balance.debit_amount) }}
                  </span>
                </li>
                <li v-if="balance.held_amount != 0">
                  Held:
                  <span class="fw-bold text-danger">
                    {{ $fn.money(balance.held_amount) }}
                  </span>
                </li>
              </ul>
            </div>
          </template>
        </div>

      </div>
    </div>

    <BalanceInfoModal
      :balance="balanceInfo.balance"
      :currencyId="balanceInfo.currencyId"
    />
  </div>
</template>

<script>
import BalanceInfoModal from "@/components/BalanceInfoModal.vue";

export default {
  props: ["balanceSummary", "balanceByMainCurrency"],

  components: {
    BalanceInfoModal,
  },

  data() {
    return {
      balanceInfo: {},
    };
  },
};
</script>