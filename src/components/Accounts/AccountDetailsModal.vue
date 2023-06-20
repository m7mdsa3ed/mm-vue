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
      <div class="modal-content">
        <div class="bg-main box" v-if="account">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Account {{ account.name }}</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

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

            <div v-if="account.details">
              <hr>

              <p class="lead mb-0">
                Account Information
              </p>

              <template
                v-for="({ key, value }) in account.details"
                :key="key"
              >
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
import { money } from "../../helpers";

const props = defineProps({
  account: {
    type: Object,
    required: false,
  },
});

console.log({ props });
</script>