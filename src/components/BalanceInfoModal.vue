<template>
  <div
    class="modal fade"
    id="BalanceInfoModal"
    tabindex="-1"
    aria-labelledby="BalanceInfoModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Balance Info</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div v-if="balance && currencyId" class="mb-3">
            <p class="fw-bold mb-2">
              In Other Currencies ( {{ $fn.money(balance, currency.name) }} )
            </p>

            <div class="d-flex flex-column gap-1" v-if="currency">
              <template
                v-for="currencyRate in currency.rates || []"
                :key="currencyRate.id"
              >
                <div class="d-flex justify-content-between">
                  <span>
                    {{
                      $fn.money(
                        currencyRate.rate * balance,
                        currencyRate.to_currency.name
                      )
                    }}
                  </span>

                  <span>
                    {{ $date(currencyRate.updated_at).format("LLL") }}
                  </span>
                </div>
              </template>
            </div>
          </div>

          <div>
            <p class="fw-bold mb-2">Balance Details By Account Type</p>

            <div v-if="isLoading">Loading...</div>

            <div class="d-flex flex-column gap-3" v-else>
              <div
                v-for="accountTypeBalance in balanceDetailsByAccountType || []"
                :key="accountTypeBalance.account_type_id"
              >
                <p class="mb-0">
                  {{ accountTypeBalance.type }}
                </p>

                <ul class="list-unstyled text-muted mb-0">
                  <li>
                    Balance:
                    <span class="fw-bold text-success">
                      {{
                        $fn.money(
                          accountTypeBalance.amount,
                          accountTypeBalance.currency_name
                        )
                      }}
                    </span>
                  </li>
                  <li>
                    Loans:
                    <span class="fw-bold text-success">
                      {{
                        $fn.money(
                          accountTypeBalance.loan_amount,
                          accountTypeBalance.currency_name
                        )
                      }}
                    </span>
                  </li>
                  <li>
                    Debits:
                    <span class="fw-bold text-danger">
                      {{
                        $fn.money(
                          accountTypeBalance.debit_amount,
                          accountTypeBalance.currency_name
                        )
                      }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getBalanceInfo } from "../api/app";

const props = defineProps({
  balance: {
    required: false,
  },

  currencyId: {
    required: false,
  },
});

const { state } = useStore();

const isLoading = computed(() => state.currencies.loading);

const currency = computed(() => {
  const { currencies } = state;

  for (const key in currencies.data) {
    const currency = currencies.data[key];

    if (currency.id === props.currencyId) {
      return currency;
    }
  }
});

const balanceDetailsByAccountType = ref([]);

const updateBalanceDetails = async (currencyId) => {
  try {
    balanceDetailsByAccountType.value = [];

    const response = await getBalanceInfo({ currencyId });

    balanceDetailsByAccountType.value = response;
  } catch (error) {
    console.log({ error });
  }
};

watch(
  () => props.currencyId,
  async (id) => {
    await updateBalanceDetails(id);
  }
);
</script>