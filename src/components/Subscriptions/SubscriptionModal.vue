<template>
  <div
    class="modal fade"
    id="SubscriptionModal"
    tabindex="-1"
    aria-labelledby="SubscriptionModalLabel"
    aria-hidden="true"
    ref="SubscriptionModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Subscription</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="save">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="_subscription.name"
              />
              <label> Name </label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="number"
                step="any"
                class="form-control"
                placeholder=" "
                v-model="_subscription.amount"
              />
              <label> Amount </label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="date"
                class="form-control"
                placeholder=" "
                v-model="_subscription.starts_at"
              />
              <label> Starts At </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="accountSelect"
                v-model="_subscription.account_id"
                required
              >
                <option selected :value="undefined">Select Account</option>

                <option
                  v-for="account in accounts"
                  :key="account.id"
                  :value="account.id"
                >
                  {{ account.name }}
                </option>
              </select>
              <label for="accountSelect">Account</label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="categorySelect"
                v-model="_subscription.category_id"
              >
                <option selected :value="undefined">Select Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <label for="categorySelect">Category</label>
            </div>

            <div class="d-flex gap-3">
              <div class="form-floating mb-3 w-75">
                <input
                  type="number"
                  class="form-control"
                  placeholder=" "
                  v-model="_subscription.interval_count"
                />
                <label> Every (number) </label>
              </div>

              <div class="form-floating">
                <select
                  class="form-select"
                  id="unitSelector"
                  v-model="_subscription.interval_unit"
                  name="interval_unit"
                  required
                >
                  <option selected :value="undefined">Select</option>

                  <template
                    v-for="unit in [
                      { name: 'Days', value: 1 },
                      { name: 'Weeks', value: 2 },
                      { name: 'Months', value: 3 },
                    ]"
                    :key="unit.value"
                  >
                    <option :value="unit.value">
                      {{ unit.name }}
                    </option>
                  </template>
                </select>
                <label for="unitSelector">Unit</label>
              </div>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["modal", "subscription"],

  data() {
    return {
      _subscription: {},
    };
  },

  mounted() {
    this._subscription = this.subscription || {};
  },

  watch: {
    subscription(to) {
      if (to) {
        this._subscription = to;
      }
    },
  },

  computed: {
    ...mapState({
      accounts: (state) => state.accounts.data,
      categories: (state) => state.categories.categories,
    }),
  },

  methods: {
    save() {
      this.$store
        .dispatch("subscriptions/save", {
          data: this._subscription,
          isUpdating: !!this.subscription,
        })
        .then(() => {
          this.modal.hide();
        });
    },
  },
};
</script>