<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.fetchAccounts();
    this.fetchCategories();
  },
  methods: {
    ...mapActions({
      fetchAccounts: "accounts/fetch",
      fetchCategories: "categories/fetch",
    }),
  },
};
</script>