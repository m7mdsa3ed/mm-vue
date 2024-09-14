<script setup>
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {Chart} from "chart.js";
import {useStore} from "vuex";
import {enUS} from "date-fns/locale";

const props = defineProps({
  chartData: {
    type: Array,
  },
  id: {
    type: String
  }
})

const getConfig = () => {
  const balance = [];

  const amounts = [];

  const labels = [];

  for (const key in props.chartData) {
    const value = props.chartData[key];

    labels.push(value.date);

    balance.push(value.balance);

    amounts.push(value.amount);
  }

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: balance,
          label: 'Balance',
          borderWidth: 1,
        },
        {
          data: amounts,
          label: 'Amount',
          borderWidth: 1,
        },
      ]
    },
    options: {
      animation: {
        duration: 0,
      },
      responsive: true,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        title: {
          display: true,
          text: 'Balance / Amount Per Day'
        }
      },
      scales: {
        x: {
          type: 'time',
          adapter: {
            date: {
              locale: enUS
            }
          },
          title: {
            display: true,
            text: 'Date',
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Amount',
          }
        }
      },
    }
  };
}

const data = computed(() => props.chartData)

const config = ref()

let chart = null;

const setConfigAndDraw = () => {
  if (!props.chartData.length) {
    return;
  }

  config.value = getConfig();

  if (chart) {
    chart.data.labels = config.value.data.labels;
    chart.data.datasets[0].data = config.value.data.datasets[0].data;
    chart.data.datasets[1].data = config.value.data.datasets[1].data;

    chart.update('active');

    return;
  }

  chart = new Chart(
    document.getElementById(props.id),
    config.value
  )
}

onMounted(() => {
  setConfigAndDraw();
})

onUpdated(() => {
  setConfigAndDraw();
})

watch(props, function (to, from) {
  setConfigAndDraw();
})
</script>

<template>
  <div>
    <canvas :id="props.id"></canvas>
  </div>
</template>