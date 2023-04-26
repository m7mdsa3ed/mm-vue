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
        <div>
          <p class="lead fw-bold">Balances</p>

          <div class="box bg-main d-flex flex-column gap-3">
            <template
              v-for="(balance, index) in dashboardStats?.balance_summary"
              :key="index"
            >
              <div class="w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <span>
                    {{ $fn.money(balance.amount, balance.currency_name) }}
                  </span>

                  <i
                    role="button"
                    class="icon icon-bg-info fas fa-exclamation"
                    data-bs-toggle="modal"
                    data-bs-target="#BalanceInfoModal"
                    @click="
                      balanceInfo = {
                        balance: balance.amount,
                        currencyId: balance.currency_id,
                      }
                    "
                  ></i>
                </div>

                <ul class="list-unstyled text-muted mb-0">
                  <li v-if="balance.loan_amount != 0">
                    Loans:
                    <span class="fw-bold text-success">
                      {{ $fn.money(balance.loan_amount) }}
                    </span>
                  </li>
                  <li v-if="balance.debit_amount != 0">
                    Debits:
                    <span class="fw-bold text-danger">
                      {{ $fn.money(balance.debit_amount) }}
                    </span>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
        
        <PinnedAccounts
          v-if="dashboardStats?.pinned_accounts?.length"
          :accountIds="dashboardStats?.pinned_accounts"
        />

        <MonthReport 
          :inAmount="dashboardStats?.summary?.in_amount" 
          :outAmount="dashboardStats?.summary?.out_amount"
        />

        <div>
          <p>Categories</p>

          <div class="d-flex flex-column gap-3 w-100">
            <div class="accordion" id="categoryData">
              <template
                v-for="category in dashboardStats?.categories_summary ?? []"
                :key="category.id"
              >
                <div class="accordion-item">
                  <h2
                    class="accordion-header"
                    :id="`categoryHeader${category.id}`"
                  >
                    <button
                      class="bg-main box accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#categoryId${category.id}`"
                      aria-expanded="false"
                      :aria-controls="`categoryId${category.id}`"
                    >
                      <div class="d-flex flex-column">
                        <p class="mb-2">
                          {{ category.name ?? "Other" }}
                        </p>

                        <div>
                          <span>
                            <i class="icon icon-bg-success fas fa-sm fa-arrow-up"></i>
                            {{ category.in_amount }}
                          </span>
                          -
                          <span>
                            <i class="icon icon-bg-danger fas fa-sm fa-arrow-down"></i>
                            {{ category.out_amount }}
                          </span>
                        </div>
                      </div>
                    </button>
                  </h2>

                  <div
                    :id="`categoryId${category.id}`"
                    class="accordion-collapse collapse"
                    :aria-labelledby="`categoryHeader${category.id}`"
                    data-bs-parent="#categoryData"
                  >
                    <div class="accordion-body p-1 d-flex flex-column gap-1">
                      <template v-for="row in category.data" :key="row.name">
                        <div
                          class="d-flex flex-column gap-1 justify-content-between p-2 border rounded"
                        >
                          <p class="mb-0 text-truncate" :title="row.name">
                            {{ row.name }}
                          </p>

                          <div class="d-flex justify-content-between">
                            <span class="small text-muted fw-light">
                              {{ row.date }}
                            </span>
                            <p class="mb-0 text-nowrap">
                              {{ $fn.money(row.amount, row.currency_name) }}

                              <i
                                v-if="row.type == 1"
                                class="icon icon-bg-success fas fa-sm fa-arrow-up text-success"
                              ></i>
                              <i
                                v-else
                                class="icon icon-bg-danger fas fa-sm fa-arrow-down text-danger"
                              ></i>
                            </p>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <BalanceInfoModal
          :balance="balanceInfo.balance"
          :currencyId="balanceInfo.currencyId"
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
import BalanceInfoModal from "@/components/BalanceInfoModal.vue";
import BalanceChart from "@/components/Charts/BalanceChart.vue";
import ExpensesPieChart from "@/components/Charts/ExpensesPieChart.vue";
import MonthReport from "./Components/MonthReport.vue";
import PinnedAccounts from "./Components/PinnedAccounts.vue";

export default {
  data() {
    return {
      balanceInfo: {},
    };
  },

  components: {
    BalanceInfoModal,
    BalanceChart,
    ExpensesPieChart,
    MonthReport,
    PinnedAccounts
  },

  computed: {
    ...mapState({
      dashboardStats: (state) => state.app.stats,
    }),
  },
};
</script>