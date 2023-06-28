<template>
  <div>
    <div class="mb-3 d-flex gap-2 flex-wrap align-items-center justify-content-between">
      <p class="display-6 mb-0">Dashboard</p>

      <div class="d-flex flex-wrap gap-3">
        <PeriodSelector @periodChanged="(args) => period = args" />

        <button
          class="btn btn-outline-danger"
          @click="refresh"
        >
          <i class="fa-fw fas fa-refresh"></i>
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-4 d-flex flex-column gap-3">
        <Balances
          v-if="dashboardStats?.balance_summary?.length"
          :balanceSummary="dashboardStats?.balance_summary"
          :balanceByMainCurrency="dashboardStats?.balanceByMainCurrency?.amount"
        />

        <PinnedAccounts
          v-if="dashboardStats?.pinned_accounts?.length"
          :accountIds="dashboardStats?.pinned_accounts"
        />

        <MonthReport
          :inAmount="dashboardStats?.summary?.in_amount"
          :outAmount="dashboardStats?.summary?.out_amount"
        />

        <CategoryBalanceSummaryDetails
          :categoriesSummary="dashboardStats?.categories_summary ?? []"
        />
      </div>

      <div class="col-12 col-lg-8">
        <div class="d-flex flex-column gap-3">
          <div>
            <h2>Charts</h2>

            <div class="d-flex flex-column gap-3">
              <div class="box bg-main p-4">
                <BalanceChart
                  :loading="!dashboardStats"
                  :chartData="dashboardStats?.charts?.balance[1]"
                />
              </div>
              <div class="box bg-main p-4">
                <ExpensesPieChart
                  :loading="!dashboardStats"
                  :chartData="dashboardStats?.charts?.expensesPie[1]"
                />
              </div>
            </div>
          </div>

          <div>
            <h2>Estimate</h2>

            <div class="box bg-main">
              <EstimateCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BalanceChart from "./Components/Charts/BalanceChart.vue";
import ExpensesPieChart from "./Components/Charts/ExpensesPieChart.vue";
import Balances from "./Components/Balances.vue";
import MonthReport from "./Components/MonthReport.vue";
import PinnedAccounts from "./Components/PinnedAccounts.vue";
import PeriodSelector from "./Components/PeriodSelector.vue";
import CategoryBalanceSummaryDetails from "./Components/CategoryBalanceSummaryDetails.vue";
import EstimateCalculator from "@/components/EstimateCalculator.vue";
import { useStore } from "vuex";

const { state, dispatch } = useStore();

const dashboardStats = computed(() => state.app.stats);

const period = ref({});

const refresh = () => {
  dispatch('app/fetchStats', period.value)
};
</script>
