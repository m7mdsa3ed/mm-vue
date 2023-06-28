<template>
  <div>
    <div class="input-group">
      <select
        class="form-control"
        v-model="selectPeriod"
        @change="onPeriodChange"
      >
        <option value="null" selected disabled>Custom Range</option>

        <template v-for="period in periods" :key="period">
          <option :value="period">{{ camelCaseToReadable(period) }}</option>
        </template>
      </select>

      <input
        type="date"
        class="form-control"
        v-model="fromDate"
        v-if="selectPeriod == customRangeKey"
        @change="onPeriodChange"
      />
      <input
        type="date"
        class="form-control"
        v-model="toDate"
        v-if="selectPeriod == customRangeKey"
        @change="onPeriodChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { camelCaseToReadable } from "../../../helpers";

const emit = defineEmits(["periodChanged"]);

const { state } = useStore();

const periods = computed(() => state.app.info.statsPeriods);

const customRangeKey = "range";

const selectPeriod = ref(null);

const fromDate = ref(null);

const toDate = ref(null);

const onPeriodChange = () => {
  const payload = {
    period: selectPeriod.value,
    from: fromDate.value,
    to: toDate.value,
  };

  console.log({ payload });
  emit("periodChanged", payload);
};
</script>