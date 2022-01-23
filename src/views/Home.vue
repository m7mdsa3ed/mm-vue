<template>
  <div class="p-4">
    <div class="mb-3">
      <p class="display-6">
        {{ "Welcome" }} {{ this.$store.state.auth.user?.name }}
      </p>
    </div>
    <div class="row g-3 mb-3" v-if="stats">
      <template v-if="charts">
        <div class="col-12 col-md-4">
          <div class="box p-0 overflow-hidden bg-main">
            <SparkChart :data="charts.balanceChart" title="Current Balance" />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="box p-0 overflow-hidden bg-main">
            <SparkChart :data="charts.incomeChart" title="Income this month" />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="box p-0 overflow-hidden bg-main">
            <SparkChart :data="charts.spendChart" title="Spend this month" />
          </div>
        </div>
        <div class="col-12 col-md-9">
          <div class="box bg-main">
            <MonthlySpendPerCategory :data="charts.monthlySpendPerCategory" />
          </div>
        </div>
      </template>

      <div class="col-12 col-md-3">
        <PeriodStatus
          :today="stats?.today"
          :last7Days="stats?.last7Days"
          :last30Days="stats?.last30Days"
        />
      </div>

      <div class="col-12 col-md-9">
        <div class="bg-main box mb-3">
          <div class="d-flex justify-content-between mb-2">
            <p class="lead mb-0">Transactions</p>
            <button
              class="btn btn-outline-dark btn-sm"
              @click="$router.push({ name: 'transactions' })"
            >
              See More
            </button>
          </div>

          <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="
              d-flex
              align-items-start
              justify-content-between
              fw-bold
              border-bottom
              py-1
            "
          >
            <div>
              <span class="small text-muted">
                {{ transaction.account?.name }}
                <span class="d-none d-md-inline-block"> Account </span>
              </span>
              <p class="mb-0">{{ transaction.description }}</p>
            </div>
            <div class="d-flex flex-column text-end">
              <b class="small text-muted">
                {{ $fn.money(transaction.amount) }}
              </b>
              <span class="small text-muted">
                {{ transaction.category?.name || "Other" }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-3">
        <div class="bg-main box mb-3">
          <div class="d-flex justify-content-between mb-2">
            <p class="lead mb-0">Accounts</p>
            <button
              class="btn btn-outline-dark btn-sm"
              @click="$router.push({ name: 'accounts' })"
            >
              See More
            </button>
          </div>

          <div
            v-for="account in accounts.filter((e, i) => i <= 4)"
            :key="account.id"
            class="
              d-flex
              align-items-start
              justify-content-between
              fw-bold
              border-bottom
              py-1
            "
          >
            <p class="mb-0">{{ account.name }}</p>
            <div class="d-flex flex-column text-end">
              <b class="small text-muted ms-2">
                {{ $fn.money(account.balance) }}
              </b>
              <span class="small text-muted">
                ({{ account.transactions_count }})
                <span class="d-none d-md-inline-block"> Transactions </span>
              </span>
            </div>
          </div>
        </div>
        <div class="bg-main box mb-3">
          <div class="d-flex justify-content-between mb-2">
            <p class="lead mb-0">Categories</p>
            <button
              class="btn btn-outline-dark btn-sm"
              @click="$router.push({ name: 'categories' })"
            >
              See More
            </button>
          </div>

          <div
            v-for="category in categories.filter((e, i) => i <= 4)"
            :key="category.id"
            class="
              d-flex
              align-items-start
              justify-content-between
              fw-bold
              border-bottom
              py-1
            "
          >
            <p class="mb-0">{{ category.name }}</p>
            <div class="d-flex flex-column text-end">
              <b class="small text-muted">
                {{ $fn.money(category.balance) }}
              </b>
              <span class="small text-muted">
                ({{ category.transactions_count }})
                <span class="d-none d-md-inline-block"> Transactions </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PeriodStatus from "@/components/Widgets/PeriodStatus.vue";
import SparkChart from "@/components/Charts/SparkChart.vue";
import MonthlySpendPerCategory from "@/components/Charts/MonthlySpendPerCategory.vue";

import { mapActions, mapState } from "vuex";
export default {
  components: {
    PeriodStatus,
    SparkChart,
    MonthlySpendPerCategory,
  },

  computed: {
    ...mapState({
      stats: (state) => state.app.stats,
      charts: (state) => state.app.charts,
      accounts: (state) => state.accounts.data,
      categories: (state) => state.categories.categories,
      transactions: (state) => state.transactions.data.data,
    }),
  },

  mounted() {
    this.fetchStats();
    this.loadChartData();
  },

  methods: {
    ...mapActions({
      fetchStats: "app/fetchStats",
      loadChartData: "app/loadChartData",
    }),
  },
};
</script>