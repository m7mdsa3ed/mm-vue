<template>
  <div ref="sparkChart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
  props: ["data", "title"],

  data() {
    return {
      chart: null,
    };
  },

  mounted() {
    const currentAmount = this.data[this.data.length - 1].amount;
    const currentAmountText = this.$fn.money(currentAmount);

    const options = {
      chart: {
        id: "sparkline1",
        height: "160px",
        type: "area",
        group: "sparklines",

        sparkline: {
          enabled: true,
        },
        stroke: {
          curve: "straight",
        },
      },
      series: [
        {
          name: "Amount",
          data: this.data.map((row) => row.amount),
        },
      ],
      xaxis: {
        categories: this.data.map((row) => row.date),
      },
      title: {
        text: currentAmountText,
        offsetX: 20,
        offsetY: 20,
        style: {
          fontSize: "14px",
        },
      },
      subtitle: {
        text: this.title ?? "No Title",
        offsetX: 20,
        offsetY: 50,
        style: {
          fontSize: "12px",
        },
      },
    };

    this.chart = new ApexCharts(this.$refs.sparkChart, options);
    this.chart.render();
  },
};
</script>