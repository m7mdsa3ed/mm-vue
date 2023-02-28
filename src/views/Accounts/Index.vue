<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Accounts</p>
      
      <button class="btn btn-outline-danger" @click="$store.dispatch('accounts/fetch')">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3 d-flex gap-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#AccountModal"
        ref="AccountModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Account
      </button>
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#MoveMoneyModal"
        ref="MoveMoneyModalButton"
      >
        <i class="icon fas fa-sync"></i>
        Move Money
      </button>
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Balance</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="account in accounts" :key="account.id">
            <tr>
              <td>
                <p class="mb-0">
                  {{ account.name }}

                  <span class="badge">
                    {{ account.type }}
                  </span>
                </p>

                <span class="text-muted small">
                  Transactions: {{ account.transactions_count }}
                </span>
              </td>
              <td class="text-end d-flex flex-column">
                {{ $fn.money(account.balance, account.currency?.name) }}
                <span
                  v-if="Number(account.loans) != 0"
                  class="small text-success text-uppercase fw-bold"
                >
                  {{ account.loans }} Loans
                </span>
                <span
                  v-if="Number(account.debits) != 0"
                  class="small text-danger text-uppercase fw-bold"
                >
                  {{ account.debits }} Debits
                </span>
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
                          $router.push({
                            name: 'transactions',
                            query: { account_id: account.id, rbf: 1 },
                          })
                        "
                      >
                        <span> Details </span>
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="setAccountOpenModal(account, 'edit')"
                      >
                        <span> Edit </span>
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeAccount(account)"
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
    </div>

    <AccountModal :modal="this.modals.AccountModal?.instance" />
    <AccountEditModal
      :account="this.modals.AccountEditModal?.data ?? null"
      :modal="this.modals.AccountEditModal?.instance"
    />
    <MoveMoneyModal :modal="this.modals.MoveMoneyModal?.instance" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AccountModal from "@/components/Accounts/AccountModal.vue";
import AccountEditModal from "@/components/Accounts/AccountEditModal.vue";
import MoveMoneyModal from "@/components/Accounts/MoveMoneyModal.vue";
import { Modal } from "bootstrap";
export default {
  components: {
    AccountModal,
    AccountEditModal,
    MoveMoneyModal,
  },

  data() {
    return {
      modals: {
        activeModal: null,
      },
    };
  },

  mounted() {
    document.querySelectorAll(".modal").forEach((modalElement) => {
      this.modals[modalElement.id] = { instance: new Modal(modalElement) };
    });
  },

  computed: {
    ...mapState({
      accounts: (state) => state.accounts.data,
    }),

    modalData() {
      const modalName = this.modals.activeModal;

      if (modalName) {
        return this.modals[modalName].data ?? null;
      }

      return null;
    },
  },

  methods: {
    setAccountOpenModal(data, modal) {
      var modalName, modal;

      switch (modal) {
        case "edit":
          modal = this.modals.AccountEditModal;
          modalName = "AccountEditModal";
          break;
      }

      modal.instance.show();

      modal.data = { ...data };
      this.modals.activeModal = modalName;
    },

    removeAccount(account) {
      this.$store.dispatch("accounts/delete", { account });
    },
  },
};
</script>