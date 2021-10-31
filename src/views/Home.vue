<template>
  <div class="container-xxl mt-3">
    <div class="row g-3">
      <div class="col-12 col-lg-4">
        <StatsWidget :stats="stats" />
      </div>

      <div class="col-12 col-lg-8">
        <TimeCalculator class="mb-3" />
        <Transactions class="mb-3" />
        <CategroyStats :stats="stats?.perCategory" class="mb-3" />
      </div>
    </div>
  </div>
</template>

<script>
import Transactions from "../components/Transactions";
import StatsWidget from "../components/StatsWidget";
import TimeCalculator from "../components/TimeCalculator";
import CategroyStats from "../components/CategroyStats";
export default {
  components: {
    Transactions,
    StatsWidget,
    TimeCalculator,
    CategroyStats,
  },

  data() {
    return {
      stats: null,
    };
  },

  mounted() {
    this.fetchStats();
  },

  methods: {
    fetchStats() {
      this.$http.get("stats").then((res) => {
        const { data } = res;
        this.stats = data;
      });
    },
  },
};
</script>