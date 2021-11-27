<template>
  <div class="container-xxl mt-3">
    <div class="row g-3">
      <div class="col-12">
        <StatusWidget />
      </div>
      <div class="col-12 col-lg-4">
        <template v-if="stats">
          <div class="bg-main box mb-3">
            <p class="h1 fw-bold mb-0">
              {{ $fn.money(stats.balance) }}
            </p>
          </div>

          <AccountBalances :balancePerAccount="stats.balancePerAccount" />

          <PeriodStatus
            :today="stats.today"
            :last7Days="stats.last7Days"
            :last30Days="stats.last30Days"
          />

          <MonthlyRates :ratesPerMonth="stats.ratesPerMonth" />
        </template>
      </div>

      <div class="col-12 col-lg-8">
        <TimeCalculator class="mb-3" />
        <Transactions class="mb-3" />
        <CategroyStats :stats="stats?.perCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import Transactions from "../components/Transactions";
import TimeCalculator from "../components/TimeCalculator";
import CategroyStats from "../components/CategroyStats";
import MonthlyRates from "../components/Widgets/MonthlyRates.vue";
import PeriodStatus from "../components/Widgets/PeriodStatus.vue";
import AccountBalances from "../components/Widgets/AccountBalances.vue";
import StatusWidget from "../components/Widgets/StatusWidget.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Transactions,
    TimeCalculator,
    CategroyStats,
    MonthlyRates,
    PeriodStatus,
    AccountBalances,
    StatusWidget,
  },

  computed: {
    ...mapState({
      stats: (state) => state.app.stats,
    }),
  },

  mounted() {
    this.fetchStats();
  },

  methods: {
    ...mapActions({
      fetchStats: "app/fetchStats",
    }),
  },
};
</script>