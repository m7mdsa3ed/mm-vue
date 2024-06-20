<script setup>
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {Chart} from "chart.js";
import {useStore} from "vuex";
import {enUS} from "date-fns/locale";

const props = defineProps({
  chartData: {
    type: Array,
  }
})

const getAnimation = (data) => {
  const totalDuration = 1000;

  const delayBetweenPoints = totalDuration / data.length;

  const previousY = (ctx) => ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

  return {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };
}

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

  const animation = getAnimation(data.value);

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
      animation,
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
    chart.destroy();
  }

  chart = new Chart(
    document.getElementById('chart'),
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
    <canvas id="chart"></canvas>
  </div>
</template>