<template>
  <div>
    <div class="bg-main box mb-3">
      <p class="h1 fw-light mb-0">
        {{ $fn.money(stats?.balance) }}
      </p>
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light mb-0">Account Balances</p>

      <table class="table table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="account in stats?.balancePerAccount || []"
            :key="account.date"
          >
            <td>{{ account.name }}</td>
            <td class="text-end">{{ $fn.money(account.balance) }}</td>
          </tr>
        </tbody>
      </table>

      <button
        class="btn btn-dark btn-sm w-100 mt-4"
        data-bs-toggle="modal"
        data-bs-target="#MoveMoneyModal"
      >
        <i class="icon fas fa-exchange-alt"> </i> Move Money
      </button>

      <MoveMoneyModal />
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light">Today</p>
      <p class="h3 fw-light">{{ $fn.money(stats?.today.balance) }}</p>
      <div class="d-flex flex-wrap gap-3">
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.today.in) }}
          </span>
        </div>
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i
            class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"
          ></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.today.out) }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light">Last 7 Days</p>
      <p class="h3 fw-light">{{ $fn.money(stats?.last7Days.balance) }}</p>
      <div class="d-flex flex-wrap gap-3">
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.last7Days.in) }}
          </span>
        </div>
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i
            class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"
          ></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.last7Days.out) }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light">Last 30 Days</p>
      <p class="h3 fw-light">{{ $fn.money(stats?.last30Days.balance) }}</p>
      <div class="d-flex flex-wrap gap-3">
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.last30Days.in) }}
          </span>
        </div>
        <div class="d-flex align-items-center" style="font-size: 12px">
          <i
            class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"
          ></i>
          <span class="fw-bold">
            {{ $fn.money(stats?.last30Days.out) }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light mb-0">Monthly Rates</p>

      <table class="table table-borderless mb-0">
        <thead>
          <tr>
            <th>Date</th>
            <th class="text-end">Income</th>
            <th class="text-end">Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rate in stats?.ratesPerMonth || []" :key="rate.date">
            <td>
              {{ $date(`${rate.date}-01`).format("YYYY MMM") }}
            </td>
            <td class="text-end">{{ $fn.money(rate.incomeRate) }}</td>
            <td class="text-end">{{ $fn.money(rate.outcomeRate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-main box mb-3">
      <p class="fs-4 fw-light">Category Monthly Rates</p>

      <div class="d-flex gap-2 flex-wrap">
        <span
          class="badge bg-dark"
          role="button"
          v-for="rate in stats?.ratesPerMonth || []"
          :key="rate.date"
          @click.prevent="setCategoryRates(rate.ratesPerCategory)"
        >
          {{ rate.date }}
        </span>
      </div>

      <CategoryMonthlyRatesModal :rates="rates" />
    </div>
  </div>
</template>

<script>
import MoveMoneyModal from "./MoveMoneyModal";
import CategoryMonthlyRatesModal from "./CategoryMonthlyRatesModal";
import { Modal } from "bootstrap";

export default {
  props: ["stats"],

  components: {
    MoveMoneyModal,
    CategoryMonthlyRatesModal,
  },

  data() {
    return {
      rates: null,
      models: {
        CategoryMonthlyRatesModal: null,
      },
    };
  },

  mounted() {
    this.models["CategoryMonthlyRatesModal"] = new Modal(
      "#CategoryMonthlyRatesModal"
    );
  },

  methods: {
    setCategoryRates(rates) {
      this.rates = rates;

      this.models.CategoryMonthlyRatesModal.show();
    },
  },
};
</script>