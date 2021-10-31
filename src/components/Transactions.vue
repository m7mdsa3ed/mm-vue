<template>
  <div class="bg-main box table-responsive">
    <p class="fs-4 fw-light mb-0">Transactions</p>

    <table class="table align-middle table-borderless mb-3">
      <thead>
        <tr>
          <th width="50">Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th class="d-none d-lg-table-cell">Date</th>
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
                    transaction.type == 1
                      ? 'icon-bg-success fas fa-arrow-up'
                      : 'icon-bg-danger fas fa-arrow-down'
                  "
                ></i>
              </span>
            </td>
            <td>
              <p class="mb-0 small">
                {{ transaction.category?.name || "No Category" }}
              </p>
              <span class="small text-muted">
                {{ transaction.account?.name }}
              </span>
            </td>
            <td>
              <span class="small">
                {{ $fn.money(transaction.amount) }}
              </span>
            </td>
            <td class="text-nowrap d-none d-lg-table-cell">
              <p class="mb-0 small">
                {{ $date(transaction.created_at).format("YYYY-MM-DD") }}
              </p>
              <span class="small text-muted">{{
                $date(transaction.created_at).format("h:s:m A")
              }}</span>
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
                      @click.prevent="removeTransation(transaction, 'details')"
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
      <button
        class="btn btn-sm btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#TransactionModal"
        ref="TransactionModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Transaction
      </button>

      <Paginator :data="transactions" @change="fetch" />
    </div>

    <TransactionModal
      :transaction="modals.TransactionModal.transaction"
      @newTransaction="pushOrUpdate"
    />
    <TransactionDetailsModal
      :transaction="modals.TransactionDetailsModal.transaction"
    />
  </div>
</template>

<script>
import Paginator from "./Paginator";
import TransactionModal from "./TransactionModal";
import TransactionDetailsModal from "./TransactionDetailsModal";
import { Modal } from "bootstrap";

export default {
  components: {
    Paginator,
    TransactionModal,
    TransactionDetailsModal,
  },

  data() {
    return {
      transactions: [],
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
      modal.addEventListener("hide.bs.modal", () => {
        this.modals[name].transaction = null;
      });
    });
  },

  methods: {
    fetch(url = null) {
      this.$http.get(url ?? "transactions").then((res) => {
        const { data } = res;

        this.transactions = data;
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

    removeTransation(transaction) {
      this.$http.post(`transactions/${transaction.id}/delete`).then(() => {
        const transactionIndex = this.transactions.data.findIndex(
          (x) => (x.id = transaction.id)
        );
        this.transactions.data.splice(transactionIndex, 1);
      });
    },

    pushOrUpdate(transaction) {
      if (!this.transaction) return;

      // If transactions exists => update it
      const transactionIndex = this.transactions.data.findIndex(
        (x) => (x.id = transaction.id)
      );

      if (transactionIndex) {
        this.transactions[transactionIndex] = this.transaction;
      }

      // Push it
      else {
        this.transactions.data.unshift(this.transaction);
      }

      // Hide Modal
      this.modals[this.modals.activeModal].instance.hide();
    },
  },
};
</script>