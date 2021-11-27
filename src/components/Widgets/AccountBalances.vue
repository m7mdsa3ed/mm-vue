<template>
  <div class="bg-main box mb-3">
    <p class="fs-4 fw-light mb-0">Accounts</p>

    <table class="table table-borderless">
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-end">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="account in balancePerAccount || []" :key="account.date">
          <td>{{ account.name }}</td>
          <td class="text-end">{{ $fn.money(account.balance) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-group w-100">
      <button
        class="btn btn-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#MoveMoneyModal"
      >
        <i class="icon fas fa-exchange-alt"> </i> Move Money
      </button>
      <button
        class="btn btn-dark btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#AccountModal"
      >
        <i class="icon fas fa-plus"> </i> Account
      </button>
    </div>

    <MoveMoneyModal />
    <AccountModal />
  </div>
</template>

<script>
import MoveMoneyModal from "../MoveMoneyModal";
import AccountModal from "../AccountModal";

export default {
  props: ["balancePerAccount"],
  components: { MoveMoneyModal, AccountModal },
};
</script>