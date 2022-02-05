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
              <input
                type="radio"
                class="btn-check"
                v-model="activeTransaction.type"
                name="type"
                id="typeIncome"
                value="1"
                autocomplete="off"
                required
              />
              <label class="btn btn-outline-dark" for="typeIncome"
                >Income</label
              >

              <input
                type="radio"
                class="btn-check"
                v-model="activeTransaction.type"
                name="type"
                id="typeOutcome"
                value="2"
                autocomplete="off"
                required
              />
              <label class="btn btn-outline-dark" for="typeOutcome"
                >Outcome</label
              >
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
                <option selected value>Select Category</option>
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
                id="accountSelect"
                v-model="activeTransaction.account_id"
                required
              >
                <option selected value>Select Account</option>

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
import { Modal } from "bootstrap";
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

  computed: {
    ...mapState({
      accounts: (state) => state.accounts.data,
      categories: (state) => state.categories.categories,
    }),

    activeTransaction() {
      const transaction = this.transaction ?? {};
      const defaultProps = {
        type: "2",
        account_id: "",
        category_id: "",
        created_at: this.$date().format("YYYY-MM-DD"),
      };

      for (const key in defaultProps) {
        transaction[key] = transaction[key] ?? defaultProps[key];
      }

      return transaction;
    },

    isUpdating() {
      return !!this.activeTransaction.id;
    },
  },

  methods: {
    ...mapActions({
      saveTransaction: "transactions/save",
    }),

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