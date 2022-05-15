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

    // Ctrl + Enter to submit the form
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "Enter") {
        const element = e.target;

        // Get form from [form] attribute or the closest one
        const form = element.form || element.closest("form");

        form.dispatchEvent(new Event("submit"));
      }
    });
  },

  methods: {
    ...mapActions({
      getUser: "auth/getUser",
    }),
  },
};
</script>