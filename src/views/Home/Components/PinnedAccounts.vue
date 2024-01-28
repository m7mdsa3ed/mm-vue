<template>
  <div>
    <p class="lead fw-bold">Pinned Accounts</p>

    <div class="box bg-main">
      <template v-for="pinnedAccount in pinnedAccounts" :key="pinnedAccount.name">
        <div class="d-flex justify-content-between">
          <span> {{ pinnedAccount.name }} </span>
          <span> {{ $fn.money(pinnedAccount.balance, pinnedAccount.currency.slug) }} </span>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const {state} = useStore();

const props = defineProps({
  accountIds: {
    type: Array,
    required: true
  }
})

const pinnedAccounts = computed(() => state.accounts.data.filter(account => props.accountIds.includes(account.id)))

</script>