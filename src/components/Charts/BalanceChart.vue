<template>
  <div>
    <template v-if="loading"> Loading... </template>

    <template v-else>
      <div id="chart-balance"></div>
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

  computed: {
    chartOptions() {
      const data = this.chartData?.map(({ balance, timestamp }) => [
        timestamp * 1000,
        parseFloat(balance),
      ]);

      const options = {
        theme: {
          mode: "dark",
        },

        series: [
          {
            data: [...data],
          },
        ],
        chart: {
          id: "area-datetime",
          type: "area",
          height: 450,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
          min: data[0]?.timestamp,
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
      };

      return options;
    },
  },

  mounted() {
    this.init();
  },

  updated() {
    this.init();
  },

  methods: {
    init() {
      if (!this.chartData) {
        return;
      }

      this.chart ??= new ApexCharts(
        document.querySelector("#chart-balance"),
        this.chartOptions
      );

      this.chart.render();
    },
  },
};
</script>
