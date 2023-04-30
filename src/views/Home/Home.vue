<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Dashboard</p>

      <button
        class="btn btn-outline-danger"
        @click="$store.dispatch('app/fetchStats')"
      >
        <i class="fa-fw fas fa-refresh"></i>
      </button>
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
        <h2>Charts</h2>

        <div class="d-flex flex-column gap-3">
          <div class="box bg-main p-4">
            <BalanceChart
              :loading="!this.dashboardStats"
              :chartData="this.dashboardStats?.charts?.balance[1]"
            />
          </div>
          <div class="box bg-main p-4">
            <ExpensesPieChart
              :loading="!this.dashboardStats"
              :chartData="this.dashboardStats?.charts?.expensesPie[1]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import BalanceChart from "@/components/Charts/BalanceChart.vue";
import ExpensesPieChart from "@/components/Charts/ExpensesPieChart.vue";
import Balances from "./Components/Balances.vue";
import MonthReport from "./Components/MonthReport.vue";
import PinnedAccounts from "./Components/PinnedAccounts.vue";
import CategoryBalanceSummaryDetails from "./Components/CategoryBalanceSummaryDetails.vue";

export default {
  data() {
    return {
      balanceInfo: {},
    };
  },

  components: {
    Balances,
    BalanceChart,
    ExpensesPieChart,
    MonthReport,
    PinnedAccounts,
    CategoryBalanceSummaryDetails,
  },

  computed: {
    ...mapState({
      dashboardStats: (state) => state.app.stats,
    }),
  },
};
</script>
