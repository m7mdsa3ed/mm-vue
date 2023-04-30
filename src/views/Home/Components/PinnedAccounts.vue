<template>
  <div>
    <p class="lead fw-bold">Pinned Accounts</p>

    <div class="box bg-main">
      <template v-for="pinnedAccount in pinnedAccounts" :key="pinnedAccount.name">
        <div class="d-flex justify-content-between">
          <span> {{ pinnedAccount.name }} </span>
          <span> {{ $fn.money(pinnedAccount.balance) }} </span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  props: [
    'accountIds'
  ],

  computed: {
    ...mapState({
      accounts: state => state.accounts.data
    }),

    pinnedAccounts() {
      return this.accounts.filter(account => this.accountIds.includes(account.id))
    }
  }
}
</script>