<template>
  <div
    class="modal fade"
    id="AccountEditModal"
    tabindex="-1"
    aria-labelledby="AccountEditModalLabel"
    aria-hidden="true"
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
          <form @submit.prevent="save">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="data.name"
              />
              <label> Account Name </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                v-model="data.currency_id"
                aria-label="Floating label select example"
                form="accountForm"
                required
              >
                <option selected>Open this select menu</option>
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
  props: ["account", "modal"],

  computed: {
    data() {
      if (this.account) {
        return this.account;
      }

      return {};
    },

    ...mapState({
      currencies: (state) => state.currencies.data,
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
          account: this.account,
          data: fd,
        })
        .then(() => {
          this.modal.hide();
        });
    },
  },
};
</script>