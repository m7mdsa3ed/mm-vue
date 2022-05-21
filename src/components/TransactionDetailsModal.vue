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
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Transaction Details</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div>
            <div class="mb-2">
              <span class="text-muted small"> Type </span>
              <p>{{ transaction?.type == 1 ? "Income" : "Outcome" }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Amount </span>
              <p>{{ $fn.money(transaction?.amount) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Description </span>
              <p class="white-space-pre-wrap">
                {{ transaction?.description }}
              </p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Date </span>
              <p>{{ $date(transaction?.created_at).format("YYYY-MM-DD") }}</p>
            </div>

            <div class="mb-2">
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

<script>
import { Modal } from "bootstrap";
export default {
  props: ["transaction"],
};
</script>