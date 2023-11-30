<template>
  <div
    class="modal fade"
    id="AccountDetailsModal"
    tabindex="-1"
    aria-labelledby="AccountDetailsModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" v-if="account">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Account {{ account.name }}</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="d-flex flex-column gap-2">
            <div>
              <span class="text-muted small"> Amount </span>

              <p class="mb-0">
                {{ money(account.balance, account.currency.name) }}
              </p>
            </div>

            <div>
              <span class="text-muted small"> Type </span>
              <p class="mb-0">{{ account.type?.name }}</p>
            </div>

            <div v-if="accountSummary" class="d-flex gap-2 flex-column">
              <div>
                <span class="text-muted small"> In Amount </span>
                <p class="mb-0">{{ money(accountSummary.in_amount) }}</p>
              </div>

              <div>
                <span class="text-muted small"> Out Amount </span>
                <p class="mb-0">{{ money(accountSummary.out_amount) }}</p>
              </div>

              <div>
                <span class="text-muted small"> First Transaction Date </span>
                <p class="mb-0">{{ accountSummary.first_transaction_date }}</p>
              </div>

              <div>
                <span class="text-muted small"> Last Transaction Date </span>
                <p class="mb-0">{{ accountSummary.last_transaction_date }}</p>
              </div>
            </div>

            <div v-if="account.details">
              <hr/>

              <p class="lead mb-0">Account Information</p>

              <template v-for="{ key, value } in account.details" :key="key">
                <div>
                  <span class="text-muted small"> {{ key }} </span>
                  <p class="mb-0">{{ value }}</p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {money} from "../../helpers";
import {ref, watch} from "vue";
import {getAccountSummary} from "../../api/accounts.js";

const props = defineProps({
  account: {
    type: Object,
    required: false,
  },
});

const accountSummary = ref(null)

watch(props, async (to) => {
  const account = to.account ?? null;

  accountSummary.value = account ? await getAccountSummary(account.id) : null
})
</script>