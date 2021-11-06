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
          <form @submit.prevent="save">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="account.name"
              />
              <label> Account Name </label>
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
      modal: null,
      account: {},
    };
  },

  mounted() {
    this.modal = new Modal(document.querySelector("#AccountModal"));
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

      this.$http.post("accounts", fd).then(() => {
        this.modal.hide();
      });
    },
  },
};
</script>