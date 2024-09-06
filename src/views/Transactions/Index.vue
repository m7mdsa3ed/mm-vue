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

    <div class="box box-sm bg-main">
      <div class="accordion accordion-flush " id="transactions">
        <div
          v-for="transaction in transactions.data"
          :key="transaction.id"
          class="accordion-item rounded-3"
        >
          <h2 class="accordion-header bg-main">
            <div
              class="accordion-button collapsed p-2 bg-main"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#${transaction.id}`"
              aria-expanded="false"
              :aria-controls="transaction.id"
            >
              <div
                class="d-flex flex-wrap justify-content-between gap-2 text-nowrap w-100 small"
              >
                <div class="d-flex flex-column align-items-start me-2 gap-1">
                  <span>
                    {{ transaction.account?.name }} 
                    <span class="badge">
                      ({{ money(transaction.balance, transaction.account?.currency?.name) }})
                    </span>
                  </span>

                  <span
                    :class="
                      transaction.action == 2 ? 'text-danger' : 'text-success'
                    "
                    class="text-nowrap"
                  >
                    {{
                      money(
                        transaction.amount,
                        transaction.account?.currency?.name
                      )
                    }}
                  </span>
                </div>

                <div class="d-flex flex-column align-items-end me-2 gap-1">
                  <span>{{ $date(transaction.created_at).format("ddd") }}</span>
                  <span>{{
                    $date(transaction.created_at).format("YYYY-MM-DD")
                  }}</span>
                </div>
              </div>
            </div>
          </h2>

          <div
            :id="transaction.id"
            class="accordion-collapse collapse"
            data-bs-parent="#transactions"
          >
            <div class="accordion-body bg-main p-2">
              <div v-if="transaction.description">
                <span> Description </span>
                <p>
                  {{ transaction.description }}
                </p>
              </div>

              <div v-if="transaction.tags.length">
                <span> Tags </span>
                <p>
                  <span
                    v-for="tag in transaction.tags"
                    :key="tag.id"
                    class="badge bg-secondary rounded-0"
                  >
                    {{ tag.name }}
                  </span>
                </p>
              </div>

              <div v-if="transaction.contact">
                <span> Contact </span>
                <p>
                  {{ transaction.contact.name }}
                </p>
              </div>

              <div v-if="transaction.account">
                <span> Account </span>
                <p>
                  {{ transaction.account.name }}
                </p>
              </div>

              <div v-if="transaction.category">
                <span> Category </span>
                <p>
                  {{ transaction.category.name }}
                </p>
              </div>

              <div v-if="transaction.balance">
                <span> Account Balance </span>
                <p>
                  {{ money(transaction.balance) }}
                </p>
              </div>

              <div>
                <span> Posted Date </span> 
                <p>
                  {{ $date(transaction.updated_at).format("YYYY-MM-DD dddd") }}
                </p>
              </div>

              <div class="d-flex justify-content-between gap-2">
                <button class="w-100 btn btn-sm btn-dark" @click="selectTransactionOpenModal(transaction, 'edit')">
                  <i class="icon fas fa-edit"></i>
                  Edit
                </button>

                <button class="w-100 btn btn-sm btn-danger" @click="remove(transaction)">
                  <i class="icon fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between">
          <Paginator
            :data="transactions"
            :loading="isFetching"
            infinityLoad="true"
            @change="fetch"
          />
        </div>
      </div>
    </div>

    <TransactionSaveModal :currentTransaction="selectedTransaction" />

    <TransactionDetailsModal :transaction="selectedTransaction" />
  </div>
</template>

<script setup>
import Paginator from "../../components/Paginator.vue";
import TransactionsFilter from "./Components/TransactionsFilter.vue";
import TransactionSaveModal from "./Components/TransactionSaveModal.vue";
import TransactionDetailsModal from "./Components/TransactionDetailsModal.vue";
import { Modal } from "bootstrap";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { money, copy } from "../../helpers.js";
import { useLazyCallback } from "../../hooks/useLazyCallback";

const { state, dispatch } = useStore();

const transactions = computed(() => state.transactions.data);

const selectedTransaction = ref(null);

const filter = ref({});

const [fetching, { loading: isFetching, error: fetchingError }] =
  useLazyCallback(async (url, filter, append) => {
    await dispatch("transactions/fetch", { url, filter, append });
  });

const [remove] = useLazyCallback(async (transaction) => {
  await dispatch("transactions/delete", { transaction });
});

const fetch = async (payload) => {
  const url = typeof payload === "object" ? payload.url : payload;

  const append = typeof payload === "object" ? payload.append : false;

  await fetching(url, filter.value, append);
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
