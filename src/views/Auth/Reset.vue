<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Set New Password</p>

          <p class="alert bg-dark" v-if="message">
            {{ message }}
          </p>

          <form @submit.prevent="requestResetPassword">
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Password"
                class="form-control mb-3"
                v-model="password"
              />
              <label> Password </label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resetPassword } from "../../api/authentication";

export default {
  data() {
    return {
      password: null,
    };
  },

  methods: {
    async requestResetPassword() {
      const { token } = this.$route.query;

      if (!token) {
        return;
      }

      try {
        await resetPassword({
          token,
          password: this.password,
          password_confirmation: this.password,
        });

        this.$router.push({ name: "login" });
      } catch (error) {
        this.message = error.toString();
      }
    },
  },
};
</script>