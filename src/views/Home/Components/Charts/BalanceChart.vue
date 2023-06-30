<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <div :id="id"></div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  props: ["chartData", "loading", "id"],

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
          document.querySelector(`#${this.id}`),
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
        parseFloat(balance).toFixed(2),
      ]);

      const options = {
        theme: {
          mode: this.$store.getters['app/appSchema'],
        },
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 1,
            opacityTo: .5,
          }
        },
        title: {
          text: 'Balance Chart',
          align: 'left'
        },
        subtitle: {
          text: 'Balance Movements',
          align: 'left'
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            data: [...data],
            name: 'Balance'
          },
        ],
        xaxis: {
          type: "datetime",
          min: data[0]?.timestamp,
          tickAmount: 6,
        },
        yaxis: {
          opposite: true,
        },
      };

      const chart = await this.createChartInstance(options);

      chart.updateOptions(options);
    },
  },
};
</script>
