<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Signup</p>

          <div v-if="errors.message" class="alert alert-danger">
            {{ errors.message }}
          </div>

          <form @submit.prevent="register">
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="user.name"
                placeholder="Full Name"
                class="form-control mb-3"
              />
              <label> Full Name </label>
            </div>
            <hr />
            <div class="form-floating mb-3">
              <input
                type="email"
                v-model="user.email"
                placeholder="Email"
                class="form-control mb-3"
              />
              <label> Email </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                v-model="user.password"
                placeholder="Password"
                class="form-control mb-3"
              />
              <label> Password </label>
            </div>

            <button class="btn btn-dark mb-3 w-100">Signup</button>
            <p
              class="mb-0 small"
              role="button"
              @click="$router.push({ name: 'login' })"
            >
              <i class="fas fa-arrow-left fa-sm me-2"></i>
              Already have an account?
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
  data() {
    return {
      user: {},
    };
  },

  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },

  methods: {
    ...mapActions({
      _register: "auth/register",
      login: "auth/_login",
    }),

    register(e) {
      this._register(this.user).then((response) => {
        this.login(response.data);
        this.$router.push({ name: "home" });
      });
    },
  },
};
</script>