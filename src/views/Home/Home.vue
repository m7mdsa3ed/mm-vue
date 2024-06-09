<template>
  <div>
    <div
      class="mb-3 d-flex gap-2 flex-wrap align-items-center justify-content-between"
    >
      <p class="display-6 mb-0">Dashboard</p>

      <div class="d-flex flex-wrap gap-1">
        <PeriodSelector @periodChanged="(args) => (period = args)"/>

        <div>
          <select class="form-control" v-model="selectedCurrencySlug">
            <template v-for="slug in currencySlugs" :key="slug">
              <option :value="slug">{{ slug }}</option>
            </template>
          </select>
        </div>

        <button class="btn btn-outline-danger" @click="refresh">
          <i class="fa-fw fas fa-refresh"></i>
        </button>
      </div>
    </div>

    <div class="row g-4 mb-3">
      <div class="col-12 col-lg-4 d-flex flex-column gap-3">
        <Balances
          v-if="dashboardStats?.balance_summary?.length"
          :balanceSummary="dashboardStats?.balance_summary"
          :balanceByMainCurrency="dashboardStats?.balanceByMainCurrency?.amount"
        />

        <PeriodReport
          :inAmount="periodSummary?.inAmount"
          :inLoanAmount="periodSummary?.inLoanAmount"
          :inDebitAmount="periodSummary?.inDebitAmount"
          :inHeldAmount="periodSummary?.inHeldAmount"
          :outAmount="periodSummary?.outAmount"
          :outLoanAmount="periodSummary?.outLoanAmount"
          :outDebitAmount="periodSummary?.outDebitAmount"
          :outHeldAmount="periodSummary?.outHeldAmount"
          :currencySlug="periodSummary?.currencySlug"
        />

        <PinnedAccounts
          v-if="dashboardStats?.pinned_accounts?.length"
          :accountIds="dashboardStats?.pinned_accounts"
        />

        <SubscriptionsAlert
          v-if="subscriptionsAboutToExpire?.length"
          :subscriptions="subscriptionsAboutToExpire"
        />

        <CategoryBalanceSummaryDetails
          :categoriesSummary="categoriesSummaryData"
        />
      </div>

      <div class="col-12 col-lg-8">
        <div class="d-flex flex-column gap-3">
          <div>
            <h2>Charts</h2>

            <div class="d-flex flex-column gap-3">
              <div class="box bg-main">
                <BalanceChart
                  :id="'chart-balance'"
                  :loading="!balanceChartData"
                  :chartData="balanceChartData"
                />
              </div>

            </div>
          </div>
          
          <div v-if="budgetsAboutToExpire.length">
            <h2>Budgets</h2>
            
            <BudgetTracks :budgets="budgetsAboutToExpire"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import BalanceChart from "./Components/Charts/BalanceChart.vue";
import Balances from "./Components/Balances.vue";
import PeriodReport from "./Components/PeriodReport.vue";
import PinnedAccounts from "./Components/PinnedAccounts.vue";
import PeriodSelector from "./Components/PeriodSelector.vue";
import CategoryBalanceSummaryDetails from "./Components/CategoryBalanceSummaryDetails.vue";
import SubscriptionsAlert from "./Components/SubscriptionsAlert.vue";
import BudgetTracks from "./Components/BudgetTracks.vue";
import {useStore} from "vuex";
import collect from "collect.js";

const {state, dispatch} = useStore();

const period = ref({});

const selectedCurrencySlug = ref("EGP");

const pieType = ref("2");

const dashboardStats = computed(() => state.app.stats);

const currencySlugs = computed(() => {
  return collect(dashboardStats.value?.summary)
    .pluck("currency_slug")
    .toArray();
});

const balanceChartData = computed(() => {
  const data = collect(dashboardStats.value?.charts.balance)
    .where("currency_slug", selectedCurrencySlug.value)
    .toArray();

  return data;
});

const pieChartData = computed(() => {
  const data = collect(dashboardStats.value?.charts.categoryPie)
    .where("currency_slug", selectedCurrencySlug.value)
    .where("action", parseInt(pieType.value))
    .toArray();

  return data;
});

const categoriesSummaryData = computed(() => {
  const data = collect(dashboardStats.value?.categories_summary)
    .where("currency_slug", selectedCurrencySlug.value)
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        inAmount: parseFloat(item.in_amount),
        outAmount: parseFloat(item.out_amount),
        currencySlug: item.currency_slug,
      };
    })
    .toArray();

  return data;
});

const periodSummary = computed(() => {
  const data = collect(dashboardStats.value?.summary)
    .where("currency_slug", selectedCurrencySlug.value)
    .map((item) => {
      return {
        inAmount: parseFloat(item.in_amount),
        inLoanAmount: parseFloat(item.in_loan_amount),
        inDebitAmount: parseFloat(item.in_debit_amount),
        inHeldAmount: parseFloat(item.in_held_amount),
        outAmount: parseFloat(item.out_amount),
        outLoanAmount: parseFloat(item.out_loan_amount),
        outDebitAmount: parseFloat(item.out_debit_amount),
        outHeldAmount: parseFloat(item.out_held_amount),
        currencySlug: item.currency_slug,
      };
    })
    .first();

  return data;
});

const subscriptionsAboutToExpire = computed(() => {
  return collect(dashboardStats.value?.subscriptionsAboutToExpire)
    .toArray();
})


const budgetsAboutToExpire = computed(() => {
  return collect(dashboardStats.value?.budgetsAboutToExpire)
    .toArray();
})


const refresh = () => {
  dispatch("app/fetchStats", period.value);
};
</script>
