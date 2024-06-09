<template>
  <div>
    <div class="input-group">
      <select
        class="form-control"
        v-model="selectPeriod"
        @change="onPeriodChange"
      >
        <template v-for="period in periods" :key="period">
          <option :value="period.key">{{ period.key }}</option>
        </template>
      </select>

      <input
        type="date"
        class="form-control"
        v-model="rangeFrom"
        @change="onPeriodChange"
        v-if="selectPeriod == 'Range'"
      />

      <input
        type="date"
        class="form-control"
        v-model="rangeTo"
        @change="onPeriodChange"
        v-if="selectPeriod == 'Range'"
      />

      <input
        type="month"
        class="form-control"
        v-model="selectedMonth"
        @change="onPeriodChange"
        v-if="selectPeriod == 'Month'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const emit = defineEmits(["periodChanged"]);

const periods = [
  {
    key: "Today",
    dates: {
      from: dayjs().format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    },
  },
  {
    key: "This Month",
    selected: true,
    dates: {
      from: dayjs().startOf("month").format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    },
  },
  {
    key: "This Year",
    dates: {
      from: dayjs().startOf("year").format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    },
  },
  {
    key: "Range",
    dates: (from, to) => ({
      from: dayjs(from).format("YYYY-MM-DD"),
      to: dayjs(to).format("YYYY-MM-DD"),
    }),
  },
  {
    key: "Month",
    dates: (value) => ({
      from: dayjs(value).startOf("month").format("YYYY-MM-DD"),
      to: dayjs(value).endOf("month").format("YYYY-MM-DD"),
    }),
  },
];

const selectPeriod = ref("This Month");

const rangeFrom = ref(null);

const rangeTo = ref(null);

const selectedMonth = ref(null);

const getDatesByPeriod = (period) => {
  switch (period) {
    case "Range":
      return periods
        .find((period) => period.key == "Range")
        .dates(rangeFrom.value, rangeTo.value);

    case "Month":
      return periods
        .find((period) => period.key == "Month")
        .dates(selectedMonth.value);
  
    default:
      return periods.find((p) => p.key == period).dates;
  }
};

const onPeriodChange = () => {
  const dates = getDatesByPeriod(selectPeriod.value);

  const payload = {
    ...dates,
  };

  console.log(payload);

  emit("periodChanged", payload);
};
</script>