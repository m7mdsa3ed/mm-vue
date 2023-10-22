<template>
  <div>
    <div class="d-flex align-items-start gap-3 w-100">
      <div class="d-flex flex-column gap-3 w-100 bg-main box">
        <div class="d-flex flex-column gap-2">
          <div class="d-flex flex-column gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#earningDetails">
            <i class="icon icon-bg-success fas fa-arrow-up"></i>
            <p class="mb-0 lead">
              {{ $fn.money(inAmount, currencySlug) }}
            </p>
          </div>

          <div class="collapse" id="earningDetails">
            <div class="d-flex flex-column gap-2 small text-muted">
              <div class="d-flex justify-content-between">
                <span>Loans</span>
                {{ $fn.money(inLoanAmount, currencySlug) }}
              </div>

              <div class="d-flex justify-content-between">
                <span>Debits</span>
                {{ $fn.money(inDebitAmount, currencySlug) }}
              </div>

              <div class="d-flex justify-content-between">
                <span>Holds</span>
                {{ $fn.money(inHeldAmount, currencySlug) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column gap-3 w-100 bg-main box">
        <div class="d-flex flex-column gap-2">
          <div class="d-flex flex-column gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#expensesDetails">
            <i class="icon icon-bg-danger fas fa-arrow-down"></i>
            <p class="mb-0 lead">
              {{ $fn.money(outAmount, currencySlug) }}
            </p>
          </div>

          <div class="collapse" id="expensesDetails">
            <div class="d-flex flex-column gap-2 small text-muted collapse" id="expensesDetails">
              <div class="d-flex justify-content-between">
                <span>Loans</span>
                {{ $fn.money(outLoanAmount, currencySlug) }}
              </div>
  
              <div class="d-flex justify-content-between">
                <span>Debits</span>
                {{ $fn.money(outDebitAmount, currencySlug) }}
              </div>
  
              <div class="d-flex justify-content-between">
                <span>Holds</span>
                {{ $fn.money(outHeldAmount, currencySlug) }}
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps([
  "inAmount",
  "inLoanAmount",
  "inDebitAmount",
  "inHeldAmount",
  "outAmount",
  "outLoanAmount",
  "outDebitAmount",
  "outHeldAmount",
  "currencySlug",
]);
</script>