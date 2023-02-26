<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <div id="chart-balance"></div>
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
          document.querySelector("#chart-balance"),
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

      const data = this.chartData?.map(({ balance, timestamp }) => [
        timestamp * 1000,
        parseFloat(balance),
      ]);

      const options = {
        theme: {
          mode: "dark",
        },
        chart: {
          type: "area",
          height: 450,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            data: [...data],
          },
        ],
        xaxis: {
          type: "datetime",
          min: data[0]?.timestamp,
          tickAmount: 6,
        },
      };

      const chart = await this.createChartInstance(options);

      chart.updateOptions(options);
    },
  },
};
</script>
