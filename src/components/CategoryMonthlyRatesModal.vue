<template>
  <div
    class="modal fade"
    id="CategoryMonthlyRatesModal"
    tabindex="-1"
    aria-labelledby="CategoryMonthlyRatesModalLabel"
    aria-hidden="true"
    ref="CategoryMonthlyRatesModal"
    data-bs-backdrop="static"
  >
    <div
      class="
        modal-dialog
        modal-dialog-centered
        modal-dialog-scrollable
        modal-xl
        modal-fullscreen-lg-down
      "
    >
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Day Rate Per Month Per Category</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <table class="table table-borderless mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rate</th>
                <th>Income</th>
                <th>Outcome</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(rate, categoryName) in rates" :key="rate.name">
                <td>{{ categoryName }}</td>
                <td>{{ rate.rate }}</td>
                <td class="text-end">
                  <p class="mb-0 small">
                    {{ $fn.money(rate.totalIncome) }}
                  </p>
                  <p class="mb-0 small">
                    {{ rate.incomeRate }}
                  </p>
                </td>
                <td class="text-end">
                  <p class="mb-0 small">
                    {{ $fn.money(rate.totalOutcome) }}
                  </p>
                  <p class="mb-0 small">
                    {{ rate.outcomeRate }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
};
</script>