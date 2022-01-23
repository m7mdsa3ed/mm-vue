<template>
  <div ref="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
  props: ["data"],

  data() {
    return {
      chart: null,
    };
  },

  mounted() {
    const { labels, series } = this.data;

    var optionsBar = {
      chart: {
        type: "bar",
        width: "100%",
        height: "600px",
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      series,
      labels,
      xaxis: {
        labels: {},
        axisBorder: {
          show: false,
        },
        axisTicks: {},
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      title: {
        text: "Monthly Spend per Category",
        align: "left",
        style: {
          fontSize: "18px",
        },
      },
    };
    this.chart = new ApexCharts(this.$refs.chart, optionsBar);
    this.chart.render();
  },
};
</script>