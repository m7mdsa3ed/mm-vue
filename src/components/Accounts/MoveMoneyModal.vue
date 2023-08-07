<template>
  <div
    class="modal fade"
    id="MoveMoneyModal"
    tabindex="-1"
    aria-labelledby="MoveMoneyModalLabel"
    aria-hidden="true"
    ref="MoveMoneyModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Move Money</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="moveMoney" id="accountMoveForm">
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="accountSelect"
                v-model="move.from"
                :class="{ 'is-invalid': hasErrors('from') }"
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
              <label for="accountSelect">From Account</label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="accountSelect"
                v-model="move.to"
                :class="{ 'is-invalid': hasErrors('to') }"
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
              <label for="accountSelect">To Account</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="number"
                placeholder="Amount"
                v-model="move.amount"
                class="form-control mb-3"
                :class="{ 'is-invalid': hasErrors('amount') }"
              />
              <label>Amount</label>
            </div>

            <div v-if="differentCurrency">
              <div class="form-floating">
                <input
                  type="number"
                  placeholder="To Amount"
                  v-model="move.toAmount"
                  class="form-control mb-3"
                />
                <label> To Amount </label>
              </div>
            </div>

            <div class="form-floating mb-3">
              <textarea
                class="form-control mb-3"
                placeholder="Description"
                style="height: 100px"
                v-model="move.description"
              ></textarea>
              <label>Description</label>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button form="accountMoveForm" class="btn btn-dark border w-100">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["modal"],

  data() {
    return {
      move: {
        from: "",
        to: "",
      },
      errors: null,
    };
  },

  computed: {
    ...mapState({
      accounts: (state) => state.accounts.data,
    }),

    differentCurrency() {
      const from = this.accounts.find(
        (account) => account.id === this.move.from
      );

      const to = this.accounts.find((account) => account.id === this.move.to);

      if (from && to) {
        return from.currency_id !== to.currency_id;
      }

      return false;
    },
  },

  methods: {
    moveMoney() {
      const fd = new FormData();

      for (const key in this.move) {
        fd.append(key, this.move[key]);
      }

      this.$http
        .post("transactions/move", fd)
        .then(() => {
          this.$store.dispatch("accounts/fetch");
          this.modal.hide();
        })
        .catch((err) => {
          const data = err.response?.data;

          if (data.errors) {
            this.errors = errors;
          }
        });
    },

    hasErrors(field) {
      if (this.errors) {
        return Object.keys(this.errors).includes(field);
      }
    },
  },
};
</script>