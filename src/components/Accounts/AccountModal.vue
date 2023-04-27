<template>
  <div
    class="modal fade"
    id="AccountModal"
    tabindex="-1"
    aria-labelledby="AccountModalLabel"
    aria-hidden="true"
    ref="AccountModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Account</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="save" id="accountForm">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="account.name"
              />
              <label> Account Name </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="account.type_id"
                aria-label="Floating label select example"
                form="accountForm"
                required
              >
                <option selected :value="undefined">Open this select menu</option>
                <option
                  v-for="accountType in accountTypes"
                  :key="accountType.id"
                  :value="accountType.id"
                >
                  {{ accountType.name }}
                </option>
              </select>

              <label> Type </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="account.currency_id"
                aria-label="Floating label select example"
                form="accountForm"
                required
              >
                <option selected :value="undefined">Open this select menu</option>
                <option
                  v-for="currency in currencies"
                  :key="currency.id"
                  :value="currency.id"
                >
                  {{ currency.name }}
                </option>
              </select>

              <label> Currency </label>
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
  props: ["modal"],

  data() {
    return {
      account: {
        currency_id: undefined
      },
    };
  },

  computed: {
    ...mapState({
      currencies: (state) => state.currencies.data,
      accountTypes: (state) => state.accounts.types
    }),
  },

  methods: {
    save() {
      const fd = new FormData();

      for (const key in this.account) {
        const value = this.account[key];
        if (value) {
          fd.append(key, value);
        }
      }

      this.$store
        .dispatch("accounts/save", {
          data: fd,
        })
        .then(() => {
          this.modal.hide();
        });
    },
  },
};
</script>