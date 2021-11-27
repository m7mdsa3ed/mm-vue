<template>
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
        <tr v-for="rate in ratesPerMonth || []" :key="rate.date">
          <td>
            {{ $date(`${rate.date}-01`).format("YYYY MMM") }}
          </td>
          <td class="text-end">{{ $fn.money(rate.incomeRate) }}</td>
          <td class="text-end">{{ $fn.money(rate.outcomeRate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["ratesPerMonth"],
};
</script>