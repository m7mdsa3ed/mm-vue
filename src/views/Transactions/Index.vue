<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Transactions</p>

      <button class="btn btn-outline-danger" @click="fetch()">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3 d-flex gap-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#TransactionModal"
        ref="TransactionModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Transaction
      </button>

      <button
        class="btn btn-dark"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#transactionFilterCollapse"
        aria-expanded="false"
        aria-controls="transactionFilterCollapse"
      >
        Filter
      </button>
    </div>

    <div class="collapse" id="transactionFilterCollapse">
      <div class="box bg-main mb-3">
        <TransactionsFilter @search="search" />
      </div>
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-3">
        <thead>
          <tr>
            <th class="d-none d-lg-table-cell" width="50">Type</th>
            <th>Category</th>
            <th class="text-end">Amount</th>
            <th class="text-end">Date</th>
          </tr>
        </thead>

        <tbody>
          <template
            v-for="transaction in transactions.data"
            :key="transaction.id"
          >
            <tr>
              <td class="d-none d-lg-table-cell">
                <span class="small">
                  <i
                    class="icon fa-sm"
                    :class="
                      transaction.action == 1
                        ? 'icon-bg-success fas fa-arrow-up'
                        : 'icon-bg-danger fas fa-arrow-down'
                    "
                  ></i>
                </span>
              </td>

              <td>
                <p class="mb-0 small">
                  <span>
                    {{ transaction.category?.name || "No Category" }}
                  </span>
                  -
                  <span class="text-muted small">
                    {{ transaction.account?.name }}
                  </span>

                  <template v-for="tag in transaction.tags" :key="tag.id">
                    <span
                      role="button"
                      class="small fw-bold bg-body px-1 ms-2 d-none d-lg-inline-block"
                      >#{{ tag.name.toUpperCase() }}
                    </span>
                  </template>
                </p>
                <span
                  class="small text-muted text-multi-truncate text-multi-truncate-2 white-space-pre-wrap d-none d-lg-inline-block"
                >
                  {{ transaction.description }}
                </span>
              </td>
              <td class="text-end">
                <span
                  class="small d-flex flex-column align-items-end"
                  :class="
                    transaction.action == 2 ? 'text-danger' : 'text-success'
                  "
                >
                  <span class="text-nowrap">
                    {{ transaction.action == 2 ? "-" : "+" }}
                    {{
                      $fn.money(
                        transaction.amount,
                        transaction.account?.currency?.name
                      )
                    }}
                  </span>

                  <span class="badge bg-secondary rounded-0 mt-1">
                    {{ transaction.action_type_as_string }}
                  </span>
                </span>
              </td>
              <td class="text-nowrap text-end">
                <div class="mb-0 small d-flex flex-column">
                  <span class="fw-bold">
                    {{ $date(transaction.created_at).format("dddd") }}
                  </span>

                  <span class="text-muted">
                    {{ $date(transaction.created_at).format("YYYY-MM-DD") }}
                  </span>
                </div>
              </td>
              <td width="1">
                <div class="dropdown">
                  <span role="button" data-bs-toggle="dropdown">
                    <i class="fa-fw fas fa-ellipsis-v"></i>
                  </span>

                  <ul
                    class="dropdown-menu dropdown-menu-end dropdown-menu-custom mx-0"
                    style="width: 220px"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="
                          selectTransactionOpenModal(transaction, 'details')
                        "
                      >
                        <span> Details </span>
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="
                          selectTransactionOpenModal(transaction, 'edit')
                        "
                      >
                        <span> Edit </span>
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="remove(transaction)"
                      >
                        <span> Delete </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <Paginator :data="transactions" @change="fetch" />
      </div>
    </div>

    <TransactionSaveModal :currentTransaction="selectedTransaction" />

    <TransactionDetailsModal :transaction="selectedTransaction" />
  </div>
</template>

<script setup>
import Paginator from "@/components/Paginator.vue";
import TransactionsFilter from "./Components/TransactionsFilter.vue";
import TransactionSaveModal from "./Components/TransactionSaveModal.vue";
import TransactionDetailsModal from "./Components/TransactionDetailsModal.vue";
import { Modal } from "bootstrap";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const { state, dispatch } = useStore();

const transactions = computed(() => state.transactions.data);

const selectedTransaction = ref(null);

const filter = ref({});

const route = useRoute();

const fetch = async (url = null) => {
  await dispatch("transactions/fetch", {
    url,
    filter: filter.value,
  });
};

const remove = async (transaction) => {
  await dispatch("transactions/delete", { transaction });
};

const selectTransactionOpenModal = (transaction, type) => {
  selectedTransaction.value = transaction;

  const getModal = () => {
    switch (type) {
      case "edit":
        return "#TransactionModal";
      case "details":
        return "#TransactionDetailsModal";
    }
  };

  const modal = Modal.getOrCreateInstance(getModal());

  modal.show();
};

const search = (filterObject) => {
  filter.value = filterObject;

  fetch();
};
</script>