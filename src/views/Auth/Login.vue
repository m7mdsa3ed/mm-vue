<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Login</p>
          <form @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Email"
                class="form-control mb-3"
                name="email"
                v-model="user.email"
              />
              <label> Email </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                placeholder="Password"
                class="form-control mb-3"
                name="password"
                v-model="user.password"
              />
              <label> Password </label>
            </div>

            <button class="btn btn-dark mb-3 w-100">Login</button>
            <p
              class="mb-0 small"
              role="button"
              @click="$router.push({ name: 'register' })"
            >
              <i class="icon icon-bg-dark fas fa-arrow-right fa-sm me-2"></i>
              Create your account
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      loading: (state) => state.auth.loginLoading,
      errors: (state) => state.auth.errors,
    }),
  },

  data() {
    return {
      user: {},
    };
  },

  methods: {
    login() {
      this.$store.dispatch("auth/login", this.user).then(() => {
        this.$router.push({ name: "home" });
      });
    },
  },
};
</script>