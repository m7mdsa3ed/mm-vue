<template>
  <div>
    <ReloadServiceWorkerVue />
    <div
      v-if="$store.state.app.loading && $store.state.app.stopActions"
      class="position-absolute top-0 bottom-0 end-0 start-0 user-select-none d-flex justify-content-center align-items-center fade show"
      style="z-index: 2000; background-color: #00000030"
    >
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script>
import ReloadServiceWorkerVue from "./components/ReloadServiceWorker.vue";

export default {
  components: {
    ReloadServiceWorkerVue,
  },

  beforeCreate() {
    this.$store.commit("restoreState");
  },

  created() {
    this.syncColorSchema();
  },

  mounted() {
    this.$store.dispatch("app/fetchAppInfo");

    if (this.$store.state.auth.user) {
      this.$store.dispatch("app/fetchAll");
    }

    this.submitFormShortcut();
  },

  methods: {
    syncColorSchema() {
      const changeSchema = (schema = "light") => {
        document.documentElement.setAttribute("data-bs-theme", schema);

        this.$store.dispatch("app/changeAppSchema", schema);

        const bodyBackgroundColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--body-bg");

        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute("content", bodyBackgroundColor.trim());
      };

      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

      systemDarkMode.addEventListener(
        "change",
        (e) => e.matches && changeSchema("dark")
      );

      changeSchema(systemDarkMode.matches ? "dark" : "light");
    },

    submitFormShortcut() {
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
  },
};
</script>