<template>
  <div
    class="modal fade"
    id="TransactionModal"
    tabindex="-1"
    aria-labelledby="TransactionModalLabel"
    aria-hidden="true"
    ref="TransactionModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Transaction</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="save">
            <div
              class="btn-group mb-3 w-100"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <template
                v-for="actionType in actionTypes"
                :key="actionType.value"
              >
                <input
                  type="radio"
                  class="btn-check"
                  v-model="activeTransaction.action_type"
                  name="action_type"
                  :id="`actionType${actionType.name}`"
                  :value="actionType.value"
                  autocomplete="off"
                  required
                />

                <label
                  class="btn btn-dark"
                  :for="`actionType${actionType.name}`"
                  >{{ actionType.name }}</label
                >
              </template>
            </div>
            <div
              class="btn-group mb-3 w-100"
              role="group"
              aria-label="Basic radio toggle button group"
              v-if="[4, 5].includes(activeTransaction.action_type)"
            >
              <template
                v-for="action in [
                  { name: 'Income', value: 1 },
                  { name: 'Outcome', value: 2 },
                ]"
                :key="action.value"
              >
                <input
                  type="radio"
                  class="btn-check"
                  v-model="activeTransaction.action"
                  name="action"
                  :id="`action${action.name}`"
                  :value="action.value"
                  autocomplete="off"
                  required
                />

                <label
                  class="btn btn-dark"
                  :for="`action${action.name}`"
                  >{{ action.name }}</label
                >
              </template>
            </div>

            <div class="form-floating mb-3">
              <input
                type="number"
                placeholder="Amount"
                v-model="activeTransaction.amount"
                class="form-control mb-3"
                step="any"
                required
              />
              <label> Amount</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control mb-3"
                placeholder="Description"
                style="height: 100px"
                v-model="activeTransaction.description"
              ></textarea>
              <label>Description</label>
            </div>
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="categorySelect"
                v-model="activeTransaction.category_id"
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

            <div class="form-floating mb-3">
              <select
                class="form-select"
                style="min-height: 100px"
                id="tagsSelect"
                v-model="activeTransaction.tag_ids"
                multiple
              >
                <option
                  v-for="tag in tags"
                  :key="tag.id"
                  :value="tag.id"
                  :selected="activeTransaction.tag_ids?.indexOf(tag.id) != -1"
                >
                  {{ tag.name }}
                </option>
              </select>

              <label for="tagsSelect">Tag</label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="accountSelect"
                v-model="activeTransaction.account_id"
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
              <input
                type="date"
                placeholder="Date"
                v-model="activeTransaction.created_at"
                class="form-control mb-3"
                required
              />
              <label> Date</label>
            </div>
            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    transaction: {
      type: Object,
    },
    modal: {
      type: Object,
    },
  },

  data() {
    return {
      actionTypes: [
        {
          name: "Income",
          value: 1,
        },
        {
          name: "Outcome",
          value: 2,
        },
        {
          name: "Loan",
          value: 4,
        },
        {
          name: "Debit",
          value: 5,
        },
      ],

      activeTransaction: {},
    };
  },

  watch: {
    transaction: {
      immediate: true,
      handler(to) {
        this.activeTransaction = this.getTransaction(to);
      },
    },

    "transaction.action_type"(action_type) {
      if (action_type == 1 || action_type == 2) {
        this.transaction.action = action_type
      }
    }
  },

  computed: {
    ...mapState({
      tags: (state) => state.tags.tags,
      accounts: (state) => state.accounts.data,
      categories: (state) => state.categories.categories,
    }),

    isUpdating() {
      return !!this.activeTransaction.id;
    },
  },

  methods: {
    ...mapActions({
      saveTransaction: "transactions/save",
    }),

    getTransaction(t) {
      const transaction = t ?? {};

      const defaultProps = {
        action_type: 2,
        created_at: this.$date().format("YYYY-MM-DD"),
        tag_ids: transaction.tags?.map((tag) => tag.id) ?? [],
      };

      for (const key in defaultProps) {
        transaction[key] = transaction[key] ?? defaultProps[key];
      }

      return transaction;
    },

    save() {
      this.saveTransaction({
        data: this.activeTransaction,
        isUpdating: this.isUpdating,
      }).then((transaction) => {
        this.$emit("newTransaction", transaction);
        this.modal.hide();
      });
    },
  },
};
</script>