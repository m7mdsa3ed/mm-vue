<template>
  <RouterView />
</template>

<script>
import { mapActions } from "vuex";
export default {
  beforeCreate() {
    this.$store.commit("restoreState");
  },

  mounted() {
    this.getUser()
      .then((res) => {
        this.fetchAccounts();
        this.fetchCategories();
        this.fetchTransactions();
      })
      .catch(() => {
        this.$router.push({ name: "login" });
      });
  },

  methods: {
    ...mapActions({
      fetchAccounts: "accounts/fetch",
      fetchCategories: "categories/fetch",
      fetchTransactions: "transactions/fetch",
      getUser: "auth/getUser",
    }),
  },
};
</script>