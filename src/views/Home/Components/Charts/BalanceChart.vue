<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <div :id="id"></div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import { readableNumbers } from '../../../../helpers';

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

      const data = this.chartData?.map(({ balance, date }) => [
        date,
        parseFloat(balance).toFixed(2),
      ]);

      const options = {
        theme: {
          mode: this.$store.getters["app/appSchema"],
        },
        chart: {
          type: "line",
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            top: 5,
            left: 2,
            blur: 5,
            opacity: 1,
            color: '#00000050'
          }
        },
        colors: ["#008FFB"],
        title: {
          text: "Balance Chart",
          align: "left",
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0
        },
        subtitle: {
          text: "Balance Movements",
          align: "left",
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            data: [...data],
            name: "Balance",
          },
        ],
        xaxis: {
          type: "datetime",
          min: data[0]?.timestamp,
          tickAmount: 6,
        },
        yaxis: {
          opposite: true,
          labels: {
            formatter: (value) => {
              return readableNumbers(value);
            },
          },
        },
      };

      const chart = await this.createChartInstance(options);

      chart.updateOptions(options);
    },
  },
};
</script>
