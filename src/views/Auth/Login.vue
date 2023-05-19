<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Login</p>

          <div v-if="errors.message" class="alert alert-danger">
            {{ errors.message }}
          </div>

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
          </form>

          <div class="d-flex flex-wrap justify-content-between mb-3">
            <p
              class="mb-0 small"
              role="button"
              @click="$router.push({ name: 'register' })"
            >
              <i class="fas fa-arrow-right fa-sm me-2"></i>
              Create your account
            </p>

            <p
              class="mb-0 small"
              role="button"
              @click="$router.push({ name: 'forget' })"
            >
              <i class="fas fa-question fa-sm me-2"></i>
              Forget Password
            </p>
          </div>

          <OAuthLogin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import OAuthLogin from "./Components/OAuthLogin.vue";

export default {
  components: {
    OAuthLogin,
  },

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