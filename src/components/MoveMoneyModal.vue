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
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Move Money</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="moveMoney">
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
            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      move: {
        from: "",
        to: "",
      },
      accounts: [],
      errors: null,
    };
  },

  mounted() {
    this.fetchAccounts();
  },

  methods: {
    fetchAccounts() {
      this.$http
        .get("accounts", {
          params: {
            all: true,
          },
        })
        .then((res) => {
          this.accounts = res.data;
        });
    },

    moveMoney() {
      const fd = new FormData();

      for (const key in this.move) {
        fd.append(key, this.move[key]);
      }

      this.$http.post("transactions/move", fd).catch((err) => {
        const { errors } = err.response?.data;

        if (errors) {
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