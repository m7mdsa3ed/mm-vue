<template>
  <div id="loadingSpinner" v-if="$store.state.app.loading">
    <div>
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      {{ $store.getters["app/loadingMessage"] }}
    </div>
  </div>

  <RouterView />
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.fetchAccounts();
    this.fetchCategories();

    this.getUser().catch(() => {
      this.$router.push({ name: "login" });
    });
  },

  methods: {
    ...mapActions({
      fetchAccounts: "accounts/fetch",
      fetchCategories: "categories/fetch",
      getUser: "auth/getUser",
    }),
  },
};
</script>