<template>
  <div>
    <ReloadServiceWorkerVue />
    <RouterView />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ReloadServiceWorkerVue from "./components/ReloadServiceWorker.vue";

export default {
  components: {
    ReloadServiceWorkerVue
  },

  beforeCreate() {
    this.$store.commit("restoreState");
  },

  created() {
    this.syncColorSchema();
  },

  mounted() {
    if (this.$store.state.auth.user) {
      this.$store.dispatch("app/fetchAll");
    }

    this.submitFormShortcut()
  },

  methods: {
    ...mapActions({
      getUser: "auth/getUser",
    }),

    syncColorSchema() {
      const changeSchema = (schema = "light") => {
        document.documentElement.setAttribute("data-bs-theme", schema);
        
        const bodyBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--body-bg')

        document.querySelector('meta[name="theme-color"]').setAttribute("content", bodyBackgroundColor.trim());
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
    }
  },
};
</script>