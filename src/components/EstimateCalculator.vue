<template>
  <div v-if="results" class="alert alert-success d-flex flex-column gap-3">
    <span>
      You need almost <b class="text-danger"> {{ results.estimatedMonthsNeeded.toFixed() }} month(s) </b> to
      get this amount {{ money(estimate.neededAmount) }} based on estimated
      incoming avg per month {{ money(results.estimatedAvgPerMonth) }}.
    </span>

    <span>
      That's almost <b class="text-danger"> {{ results.estimatedYearsNeeded.toFixed() }} year(s) </b> with
      {{ money(results.estimatedAvgPerYear) }} a year.
    </span>
  </div>

  <div v-if="errors" class="alert alert-danger">
    {{ errors }}
  </div>

  <div class="d-flex flex-column gap-3">
    <div class="form-floating">
      <input
        type="text"
        name="dsa"
        v-model="estimate.neededAmount"
        placeholder="neededAmount"
        class="form-control"
      />

      <label> Needed Amount </label>
    </div>

    <div class="hr-text"> Incoming Amount </div>

    <div class="form-floating">
      <input
        type="number"
        v-model="estimate.avgAmount"
        placeholder="avgAmount"
        class="form-control"
      />

      <label> Average Incoming Amount </label>
    </div>

    <div class="hr-text"> OR </div>

    <p class="mb-0">Calculate Avg Amount Based on Your Transactions</p>

    <div class="d-flex gap-3 just">
      <div class="form-floating w-100">
        <input
          type="date"
          v-model="estimate.fromDate"
          placeholder="fromDate"
          class="form-control"
        />

        <label> Start Date </label>
      </div>

      <div class="form-floating w-100">
        <select class="form-control" v-model="estimate.currencyId">
          <option value="null">Select Currency</option>

          <option
            v-for="currency in currencies"
            :key="currency.name"
            :value="currency.id"
          >
            {{ currency.name }}
          </option>
        </select>

        <label> Currency </label>
      </div>
    </div>

    <div class="form-floating w-100">
      <input
        type="number"
        v-model="estimate.adjustAmount"
        placeholder="adjustAmount"
        class="form-control"
      />

      <label> Adjust Amount From Total Balance </label>
    </div>

    <button class="btn btn-dark" @click="getEstimate">Get Estimate</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { getEstimate as getEstimateRequest } from "../api/app";
import { money } from "../helpers";

const { state } = useStore();

const currencies = computed(() => state.currencies.data);

const errors = ref();

const results = ref();

const estimate = ref({
  neededAmount: null,
  avgAmount: null,
  fromDate: null,
  currencyId: null,
  adjustAmount: null,
});

const getEstimate = async () => {
  const payload = estimate.value;

  try {
    const response = await getEstimateRequest(payload);

    results.value = response;
  } catch (error) {
    errors.value = error.toString();
  }
};
</script>
