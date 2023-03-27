<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Transactions</p>

      <button class="btn btn-outline-danger" @click="fetch">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#TransactionModal"
        ref="TransactionModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Transaction
      </button>
    </div>

    <div class="mb-3 box bg-main">
      <TransactionsFilter />
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-3">
        <thead>
          <tr>
            <th width="50">Type</th>
            <th>Category</th>
            <th class="text-end">Amount</th>
            <th class="d-none d-lg-table-cell text-end">Date</th>
          </tr>
        </thead>

        <tbody>
          <template
            v-for="transaction in transactions.data"
            :key="transaction.id"
          >
            <tr>
              <td>
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
                      class="small fw-bold bg-light px-1 ms-2"
                      @click="
                        toRoute('transactions', { query: { tag_id: tag.id } })
                      "
                      >#{{ tag.name.toUpperCase() }}
                    </span>
                  </template>
                </p>
                <span
                  class="small text-muted text-multi-truncate text-multi-truncate-2 white-space-pre-wrap"
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
                  <span>
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
              <td class="text-nowrap d-none d-lg-table-cell text-end">
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
                          setTransactionOpenModal(transaction, 'details')
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
                          setTransactionOpenModal(transaction, 'edit')
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
                        @click.prevent="removeTransaction(transaction)"
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

    <TransactionModal
      :modal="modals.TransactionModal.instance"
      :transaction="modals.TransactionModal.transaction"
    />
    <TransactionDetailsModal
      :transaction="modals.TransactionDetailsModal.transaction"
    />
  </div>
</template>

<script>
import Paginator from "@/components/Paginator.vue";
import TransactionsFilter from "@/components/Transactions/TransactionsFilter.vue";
import TransactionModal from "@/components/Transactions/TransactionModal.vue";
import TransactionDetailsModal from "@/components/Transactions/TransactionDetailsModal.vue";
import { Modal } from "bootstrap";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Paginator,
    TransactionsFilter,
    TransactionModal,
    TransactionDetailsModal,
  },

  data() {
    return {
      filter: {},
      modals: {
        activeModal: null,
        TransactionModal: {
          instance: null,
          transaction: null,
        },
        TransactionDetailsModal: {
          instance: null,
          transaction: null,
        },
      },
    };
  },

  computed: {
    ...mapState({
      transactions: (state) => state.transactions.data,
    }),
  },

  mounted() {
    this.fetch();
    [
      document.querySelector("#TransactionModal"),
      document.querySelector("#TransactionDetailsModal"),
    ].forEach((modal) => {
      const name = modal.id;

      // Modal Instance
      this.modals[name].instance = new Modal(modal);

      // Set transaction to NULL on hide
      modal.addEventListener("hidden.bs.modal", () => {
        this.modals[name].transaction = null;
      });
    });
  },

  watch: {
    "$route.query": {
      immediate: true,
      handler(to, from) {
        this.filter = to ?? {};
        this.fetch();
      },
    },
  },

  methods: {
    ...mapActions({
      deleteTransaction: "transactions/delete",
    }),

    fetch(url = null) {
      this.$store.dispatch("transactions/fetch", {
        url,
        filter: this.filter,
        refreshBeforeFetch: !!this.$route.query.rbf,
      });
    },

    setTransactionOpenModal(transaction, modal) {
      var modalName, modal;

      switch (modal) {
        case "edit":
          modal = this.modals.TransactionModal;
          modalName = "TransactionModal";
          break;

        case "details":
          modal = this.modals.TransactionDetailsModal;
          modalName = "TransactionDetailsModal";
          break;
      }

      modal.instance.show();

      modal.transaction = { ...transaction };
      this.modals.activeModal = modalName;
    },

    removeTransaction(transaction) {
      this.deleteTransaction({ transaction });
    },
  },
};
</script>