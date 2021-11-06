<template>
  <div class="bg-main box">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <p class="lead mb-0">How much time needed to get?</p>
      <span class="badge text-muted bg-light small border text-uppercase">
        Experimental
      </span>
    </div>
    <div class="input-group">
      <input
        type="text"
        class="form-control mb-2"
        placeholder="Amount"
        v-model="amount"
      />

      <input
        type="number"
        class="form-control mb-2"
        v-model="avg"
        placeholder="Balance average"
      />
    </div>
    <div class="form-floating">
      <input
        type="month"
        class="form-control mb-2"
        v-model="after"
        placeholder=" "
      />
      <label> Start the calculation from this month </label>
    </div>

    <button class="btn btn-dark btn-sm w-100" @click.prevent="calculate">
      <i class="icon fas fa-calculator"></i>
      Calculate
    </button>

    <p class="mb-0 alert alert-info mt-4" v-if="results">
      Based on
      <span class="fw-bold"> {{ $fn.money(results.monthlyAvg) }} </span>
      balance average, you will be able to get this amount in
      <span class="fw-bold"> {{ results.approx }} </span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: null,
      amount: null,
      after: null,
      avg: null,
    };
  },

  methods: {
    calculate() {
      const fd = new FormData();

      fd.append("amount", this.amount ?? null);
      fd.append("after", this.after ?? "");
      fd.append("avg", this.avg ?? "");

      this.$http.post("calculate", fd).then((response) => {
        this.results = response.data;
      });
    },
  },
};
</script>