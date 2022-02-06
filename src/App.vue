<template>
  <div
    v-if="updateExists"
    class="alert alert-primary d-flex align-items-center justify-content-center"
  >
    <p class="mb-0 me-4 lead">An update is available</p>
    <button class="btn btn-dark btn-sm" @click="refreshApp">Update</button>
  </div>

  <RouterView />
</template>

<script>
import { mapActions } from "vuex";
import ServiceWorkerUpdate from "@/mixins/swUpdate";

export default {
  mixins: [ServiceWorkerUpdate],

  beforeCreate() {
    this.$store.commit("restoreState");
  },

  mounted() {
    this.getUser()
      .then((res) => {
        this.$store.dispatch("app/fetchAll");
      })
      .catch(() => {
        this.$router.push({ name: "login" });
      });
  },

  methods: {
    ...mapActions({
      getUser: "auth/getUser",
    }),
  },
};
</script>