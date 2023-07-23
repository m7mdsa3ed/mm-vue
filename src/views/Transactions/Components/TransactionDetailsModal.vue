<template>
  <div
    class="modal fade"
    id="TransactionDetailsModal"
    tabindex="-1"
    aria-labelledby="TransactionDetailsModalLabel"
    aria-hidden="true"
    ref="TransactionDetailsModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Transaction Details</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="d-flex flex-column gap-3">
            <div>
              <span class="text-muted small"> Type </span>
              <p class="mb-0">{{ transaction?.type == 1 ? "Income" : "Outcome" }}</p>
            </div>

            <div>
              <span class="text-muted small"> Amount </span>
              <p class="mb-0">
                {{
                  $fn.money(
                    transaction?.amount,
                    transaction?.account?.currency?.name
                  )
                }}
              </p>
            </div>

            <div v-if="transaction?.description">
              <span class="text-muted small"> Description </span>
              <p class="white-space-pre-wrap mb-0">
                {{ transaction?.description }}
              </p>
            </div>

            <div>
              <span class="text-muted small"> Date </span>
              <p class="mb-0">{{ $date(transaction?.created_at).format("YYYY-MM-DD") }}</p>
            </div>

            <div>
              <span class="text-muted small"> Time of Transaction </span>
              <p class="mb-0">
                {{ $date(transaction?.created_at).format("hh:mm A") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["transaction"]);
</script>