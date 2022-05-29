<template>
  <form @submit.prevent="setFilter">
    <div class="row g-2">
      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="form-floating">
          <select
            placeholder="Category"
            class="form-control"
            v-model="filter.category_id"
          >
            <option value selected>Select Category</option>
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
            class="form-control"
            v-model="filter.account_id"
          >
            <option value selected>Select Account</option>
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
            v-model="filter.tag_id"
          >
            <option value selected>Select Tag</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">
              {{ tag.name }}
            </option>
          </select>
          <label> Tag </label>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-2">
        <div class="form-floating">
          <select class="form-select" v-model="filter.period">
            <option selected value="">Select Period</option>
            <option value="1">Today</option>
            <option value="2">This Week</option>
            <option value="3">This Month</option>
            <option value="0">Custom</option>
          </select>
          <label> Period </label>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-2" v-if="filter.period == 0">
        <div class="form-floating">
          <input
            type="date"
            placeholder="Date From"
            class="form-control"
            v-model="filter.date_from"
          />
          <label> Date From </label>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 col-lg-2" v-if="filter.period == 0">
        <div class="form-floating">
          <input
            type="date"
            placeholder="Date To"
            class="form-control"
            v-model="filter.date_to"
          />
          <label> Date To </label>
        </div>
      </div>

      <div class="col-12">
        <div class="btn-group w-100">
          <button class="btn btn-dark btn-sm w-100">
            <i class="icon fas fa-search"></i>
            Search
          </button>
          <button class="btn btn-danger btn-sm" @click="resetFilter">
            <i class="icon fas fa-undo"></i>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      filter: {},
      filterDefault: {
        category_id: "",
        account_id: "",
        tag_id: "",
        period: "",
      },
    };
  },

  mounted() {
    const filter = JSON.parse(JSON.stringify(this.$route.query));
    const defaults = this.resetFilter();

    for (const key in filter) {
      const value = filter[key];
      const defaulValue = defaults[key];

      this.filter[key] = value ?? defaulValue;
    }
  },

  computed: {
    ...mapState({
      tags: (state) => state.tags.tags,
      accounts: (state) => state.accounts.data,
      categories: (state) => state.categories.categories,
    }),
  },

  methods: {
    setFilter() {
      const filter = {};

      for (const key in this.filter) {
        const value = this.filter[key];
        if (value) {
          filter[key] = value;
        }
      }

      this.$router.push({
        query: filter,
      });
    },

    resetFilter() {
      const defaults = JSON.parse(JSON.stringify(this.filterDefault));
      this.filter = defaults;

      return defaults;
    },
  },
};
</script>