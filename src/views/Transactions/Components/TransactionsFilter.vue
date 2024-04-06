<template>
  <div class="row g-2">
    <div class="col-sm-6 col-md-4 col-lg-2">
      <div class="form-floating">
        <select
          placeholder="Category"
          class="form-control"
          name="category_id"
          v-model="filter.category_id"
        >
          <option value="undefined" selected>Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>

        <label> Category </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2">
      <div class="form-floating">
        <select
          placeholder="Account"
          name="account_id"
          class="form-control"
          v-model="filter.account_id"
        >
          <option value="undefined" selected>Select Account</option>
          <option
            v-for="account in accounts"
            :key="account.id"
            :value="account.id"
          >
            {{ account.name }}
          </option>
        </select>
        <label> Account </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2">
      <div class="form-floating">
        <select
          placeholder="Tag"
          class="form-control"
          name="tag_id"
          v-model="filter.tag_id"
        >
          <option value="undefined" selected>Select Tag</option>
          <option v-for="tag in tags" :key="tag.id" :value="tag.id">
            {{ tag.name }}
          </option>
        </select>
        <label> Tag </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2">
      <div class="form-floating">
        <input
          type="text"
          name="action_types"
          placeholder="Action Type"
          class="form-control"
          v-model="filter.action_types"
        />
        <label> Action Type </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2">
      <div class="form-floating">
        <select class="form-select" name="period" v-model="filter.period">
          <option value="1">Today</option>
          <option value="2">This Week</option>
          <option value="3">This Month</option>
          <option value="0">Custom</option>
        </select>
        <label> Period </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2" v-if="filter.period == '0'">
      <div class="form-floating">
        <input
          type="date"
          name="date_from"
          placeholder="Date From"
          class="form-control"
          v-model="filter.date_from"
        />
        <label> Date From </label>
      </div>
    </div>

    <div class="col-sm-6 col-md-4 col-lg-2" v-if="filter.period == '0'">
      <div class="form-floating">
        <input
          type="date"
          name="date_to"
          placeholder="Date To"
          class="form-control"
          v-model="filter.date_to"
        />
        <label> Date To </label>
      </div>
    </div>

    <div class="col-12">
      <div class="btn-group w-100">
        <button class="btn btn-dark btn-sm w-100" @click="search">
          <i class="icon fas fa-search"></i>
          Search
        </button>
        <button class="btn btn-danger btn-sm" @click="removeFilter()">
          <i class="icon fas fa-undo"></i>
        </button>
      </div>
    </div>

    <div class="col-12">
      <div class="d-flex gap-2">
        <template v-for="(value, filterName) in definedFilters" :key="value">
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="removeFilter(filterName)"
          >
            {{ filterName }}

            <span class="badge text-bg-danger">{{ value }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const emit = defineEmits(["search"]);

const { state } = useStore();

const route = useRoute();

const initialFilter = {
  period: "0",
};

const filter = ref(initialFilter);

const filtersOptions = [
  {
    name: "category_id",
    label: "Category",
    type: "select",
  },
  {
    name: "account_id",
    label: "Account",
    type: "select",
  },
  {
    name: "tag_id",
    label: "Tag",
    type: "select",
  },
  {
    name: "date_from",
    label: "Date From",
    type: "date",
  },
  {
    name: "date_to",
    label: "Date To",
    type: "date",
  }, 
  {
    name: "include_move_type",
    label: "Include Move",
    type: "select",
  },
  {
    name: "period",
    label: "Period",
    type: "select",
    skip: true,
  },
];

const definedFilters = computed(() => {
  return Object.keys(filter.value).reduce((obj, key) => {
    const value = filter.value[key];

    const options = filtersOptions.find((filter) => filter.name == key);

    if (!options) return obj;

    if (options.skip) return {};

    switch (options.type) {
      case "select":
        const optionText = document.querySelector(
          `select[name="${options.name}"] option[value="${value}"]`
        );

        obj[options.label] = optionText?.innerHTML ?? value;
        break;

      default:
        obj[key] = value;
        break;
    }

    return obj;
  }, {});
});

const categories = computed(() => state.categories.categories);

const accounts = computed(() => state.accounts.data);

const tags = computed(() => state.tags.tags);

const search = () => {
  emit("search", filter.value);
};

const removeFilter = (filterName) => {
  const filterKey = filtersOptions.filter(
    (filter) => filter.name == filterName
  )[0]?.name;

  if (filterName && filterKey) {
    delete filter.value[filterKey];
  } else {
    filter.value = initialFilter;
  }
};

watch(
  () => route.query,
  (newQuery) => {
    filter.value = {
      ...filter.value,
      ...newQuery,
    };

    search();
  },
  { immediate: true }
);
</script>