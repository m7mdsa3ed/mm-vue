<template>
  <div>
    <div
      v-if="updateExists"
      class="
        alert alert-primary
        d-flex
        align-items-center
        justify-content-center
      "
    >
      <p class="mb-0 me-2 fw-bold">An update is available</p>
      <button class="btn btn-dark btn-sm" @click="refreshApp">Update</button>
    </div>

    <RouterView />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ServiceWorkerUpdate from "@/mixins/swUpdate";

export default {
  mixins: [ServiceWorkerUpdate],

  beforeCreate() {
    this.$store.commit("restoreState");
  },

  created() {
    this.syncColorSchema();
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

    syncColorSchema() {
      const changeSchema = (schema = "light") => {
        document.documentElement.setAttribute("data-bs-theme", schema);
      };

      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

      systemDarkMode.addEventListener(
        "change",
        (e) => e.matches && changeSchema("dark")
      );

      if (systemDarkMode.matches) {
        changeSchema("dark");
      }
    },
  },
};
</script>