<script setup>
import { Chart } from "chart.js";
import { computed, onMounted, watch } from "vue";

const props = defineProps({
  data: Object,
})

const labels = computed(() => props.data.map(item => item.label));

const expenses = computed(() => props.data.map(item => item.expense));

const revenues = computed(() => props.data.map(item => item.revenue));

const data = {
  labels: labels.value,
  datasets: [
    {
      label: "Expenses",
      data: expenses.value,
      backgroundColor: "#f87979",
    },
    {
      label: "Revenues",
      data: revenues.value,
      backgroundColor: "#00c853",
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    animation: {
      duration: 0,
    },
    elements: {
      bar: {
        barPercentage: 1.0,
        borderRadius: 10,
      },
    },
    aspectRatio: 16 / 9,
    plugins: {
      title: {
        display: true,
        text: "Last 12 Months",
      },

      legend: {
        display: false,
      },

    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: (key) => {
            const [year, month] = labels.value[key].split('-'); 

            return `${month}/${year.slice(2)}`;
          },
        },
      },
      y: {
        stacked: true,
        ticks: {
          callback: (value) => ``,
        },
      },
    },
  },
};

let chart = null;

onMounted(() => {
  const ctx = document.getElementById("chartjs").getContext("2d");

  chart = new Chart(ctx, config);
});

watch(props, function (to, from) {
  chart.data.labels = labels.value;
  chart.data.datasets[0].data = expenses.value;
  chart.data.datasets[1].data = revenues.value;
  chart.update();
})

</script>

<template>
    <canvas id="chartjs"></canvas>
</template>

