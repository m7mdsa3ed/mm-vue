<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <template v-else>
      <div id="chart-pie"></div>
    </template>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  props: ["chartData", "loading"],

  data() {
    return {
      chart: null,
    };
  },

  mounted() {
    this.renderChart();
  },

  updated() {
    this.renderChart();
  },

  methods: {
    async createChartInstance(defaultOptions) {
      if (!this.chart) {
        const chart = new ApexCharts(
          document.querySelector("#chart-pie"),
          defaultOptions
        );

        await chart.render();

        this.chart = chart;
      }

      return this.chart;
    },

    async renderChart() {
      if (!this.chartData?.length) {
        return;
      }

      const labels = this.chartData?.map(({ name }) => name) ?? [];

      const series = this.chartData?.map(({ expenses }) => expenses * -1) ?? [];

      const options = {
        theme: {
          mode: "dark",
        },
        series: [...series],
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [...labels],
        title: {
          text: "Balance Per Category"
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: .5,
          }
        },
        legend: {
          position: 'left',
          horizontalAlign: 'center'
        },
      };

      const chart = await this.createChartInstance(options);

      chart.updateOptions(options);
    },
  },
};
</script>
