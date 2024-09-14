<script setup>
import { Chart } from "chart.js";
import { computed, onMounted } from "vue";

const labels = ["January", "February", "March", "April", "May"];

const expenses = [
  1500,
  500,
  0,
  25000,
  -35000,
];

const balance = expenses.reduce((acc, expense) => {
  const newBalance = acc[acc.length - 1] + expense;

  return [...acc, newBalance];
}, [expenses[0]]);

const data = {
  labels: labels,
  datasets: [
    {
      label: "Amount",
      data: expenses,
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      order: 1,
    },
    {
      label: "Balance",
      data: balance,
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      type: "line",
      order: 0,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Combined Line/Bar Chart",
      },
    },
  },
};

let chart = null;

onMounted(() => {
  const ctx = document.getElementById("chartjs").getContext("2d");
  new Chart(ctx, config);
});
</script>

<template>
  <div class="box bg-main container my-5">
    <canvas id="chartjs"></canvas>
  </div>
</template>

