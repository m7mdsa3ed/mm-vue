<template>
  <div>
    <p class="lead fw-bold">Month Report</p>

    <div class="d-flex gap-3 w-100">
      <div
        class="d-flex justify-content-between align-items-center w-100 bg-main box"
      >
        <i class="icon icon-bg-success fas fa-arrow-up"></i>
        <p class="mb-0">
          {{ $fn.money(inAmount, currencySlug) }}
        </p>
      </div>

      <div
        class="d-flex justify-content-between align-items-center w-100 bg-main box"
      >
        <i class="icon icon-bg-danger fas fa-arrow-down"></i>
        <p class="mb-0">
          {{ $fn.money(outAmount, currencySlug) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["inAmount", "outAmount", "currencySlug"]);
</script>