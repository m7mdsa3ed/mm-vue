<template>
  <div>
    <div class="mb-3">
      <p class="display-6">Transactions</p>
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
                </p>
                <span
                  class="
                    small
                    text-muted text-multi-truncate text-multi-truncate-2
                    white-space-pre-wrap
                  "
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
                    {{ $fn.money(transaction.amount) }}
                  </span>

                  <span class="badge bg-secondary rounded-0 mt-1">
                    {{ transaction.action_type_as_string }}
                  </span>
                </span>
              </td>
              <td class="text-nowrap d-none d-lg-table-cell text-end">
                <p class="mb-0 small">
                  {{ $date(transaction.created_at).format("YYYY-MM-DD") }}
                </p>
              </td>
              <td width="1">
                <div class="dropdown">
                  <span role="button" data-bs-toggle="dropdown">
                    <i class="fa-fw fas fa-ellipsis-v"></i>
                  </span>

                  <ul
                    class="
                      dropdown-menu dropdown-menu-end dropdown-menu-custom
                      mx-0
                    "
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
      @newTransaction="pushOrUpdate"
    />
    <TransactionDetailsModal
      :transaction="modals.TransactionDetailsModal.transaction"
    />
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";
import TransactionsFilter from "@/components/TransactionsFilter";
import TransactionModal from "@/components/TransactionModal";
import TransactionDetailsModal from "@/components/TransactionDetailsModal";
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
      this.$store.dispatch("transactions/fetch", { url, filter: this.filter });
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
      this.deleteTransaction({ transaction }).then(() => {
        const transactionIndex = this.transactions.data.findIndex(
          (x) => (x.id = transaction.id)
        );
        this.transactions.data.splice(transactionIndex, 1);
      });
    },

    pushOrUpdate(transaction) {
      if (!transaction) return;

      // If transactions exists => update it
      const transactionIndex = this.transactions.data.findIndex(
        (x) => x.id == transaction.id
      );

      if (transactionIndex != -1) {
        this.transactions.data[transactionIndex] = transaction;
      }

      // Push it
      else {
        this.transactions.data.unshift(transaction);
      }
    },
  },
};
</script>