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

  computed: {
    chartOptions() {
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
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {},
            },
          },
        ],
      }

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
        document.querySelector("#chart-pie"),
        this.chartOptions
      );

      this.chart.render();
    },
  },
};
</script>
