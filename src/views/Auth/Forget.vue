<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Forget Password</p>

          <p class="alert bg-dark" v-if="message">
            {{ message }}
          </p>

          <form @submit.prevent="requestForgetPassword">
            <div class="form-floating mb-3">
              <input
                type="email"
                placeholder="Email"
                class="form-control mb-3"
                v-model="email"
              />
              <label> Email </label>
            </div>

            <button type="submit" class="btn btn-dark w-100">Reset</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forgetPassword } from "../../api/authentication";
import { getPath, url } from "../../helpers";

export default {
  data() {
    return {
      email: null,
      message: null,
    };
  },

  methods: {
    async requestForgetPassword() {
      this.message = null;

      if (!this.email) {
        this.message = "Email is required";

        return;
      }

      try {
        const response = await forgetPassword({
          email: this.email,
          redirectUrl: url(getPath("reset")),
        });

        this.message = response.message;
      } catch (error) {
        this.message = error.toString();
      }
    },
  },
};
</script>