<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Signup</p>

          <Errors v-if="errors" :errors="errors" />

          <form @submit.prevent="register">
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

            <hr />

            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="user.name"
                placeholder="Full Name"
                class="form-control mb-3"
              />
              <label> Full Name </label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="user.phone"
                placeholder="Phone"
                class="form-control mb-3"
              />
              <label> Phone </label>
            </div>

            <button class="btn btn-dark mb-3 w-100">
              <template v-if="!isLoading"> Register </template>
              <template v-else> Loading... </template>
            </button>
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

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Errors from "../../components/Errors.vue";
import router from "../../router";

const { dispatch, state } = useStore();

const user = ref({});

const isLoading = computed(() => state.auth.loading);

const errors = computed(() => state.auth.errors);

const register = async () => {
  try {
    await dispatch("auth/register", user.value);

    if (!errors.value) {
      router.push({ name: "home" });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>