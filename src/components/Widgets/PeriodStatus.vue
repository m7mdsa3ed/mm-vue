<template>
  <div class="bg-main box mb-3">
    <p class="fs-4 fw-light">Today</p>
    <p class="h3 fw-light">{{ $fn.money(today.balance) }}</p>
    <div class="d-flex flex-wrap gap-3">
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(today.in) }}
        </span>
      </div>
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(today.out) }}
        </span>
      </div>
    </div>
  </div>

  <div class="bg-main box mb-3">
    <p class="fs-4 fw-light">Last 7 Days</p>
    <p class="h3 fw-light">{{ $fn.money(last7Days.balance) }}</p>
    <div class="d-flex flex-wrap gap-3">
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(last7Days.in) }}
        </span>
      </div>
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(last7Days.out) }}
        </span>
      </div>
    </div>
  </div>

  <div class="bg-main box mb-3">
    <p class="fs-4 fw-light">Last 30 Days</p>
    <p class="h3 fw-light">{{ $fn.money(last30Days.balance) }}</p>
    <div class="d-flex flex-wrap gap-3">
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(last30Days.in) }}
        </span>
      </div>
      <div class="d-flex align-items-center" style="font-size: 12px">
        <i class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"></i>
        <span class="fw-bold">
          {{ $fn.money(last30Days.out) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["today", "last7Days", "last30Days"],
};
</script>