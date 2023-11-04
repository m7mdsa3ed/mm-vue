<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Accounts</p>

      <div class="d-flex gap-2">
        <button class="btn btn-danger" @click="$router.push({ name: 'account-types' })">
          Account Types
        </button>

        <button
          class="btn btn-outline-danger"
          @click="$store.dispatch('accounts/fetch')"
        >
          <i class="fa-fw fas fa-refresh"></i>
        </button>
      </div>
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
                </p>

                <p class="fw-bolder small mb-0">
                  {{ account.type?.name }}
                </p>

                <p class="text-muted small mb-0">
                  Transactions: {{ account.transactions_count }}
                </p>
              </td>
              <td>
                <div class="text-end d-flex flex-column">
                  <span>
                    {{ $fn.money(account.balance, account.currency?.name) }}
                  </span>
                  <span
                    v-if="account.loans && Number(account.loans) != 0"
                    class="small text-success text-uppercase fw-bold"
                  >
                    {{ account.loans }} Loans
                  </span>
                  <span
                    v-if="account.debits && Number(account.debits) != 0"
                    class="small text-danger text-uppercase fw-bold"
                  >
                    {{ account.debits }} Debits
                  </span>
                  <span
                    v-if="account.held && Number(account.held) != 0"
                    class="small text-danger text-uppercase fw-bold"
                  >
                    {{ account.held }} Held
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
                          $router.push({
                            name: 'transactions',
                            query: { account_id: account.id, rbf: 1 },
                          })
                        "
                      >
                        <span> Transactions </span>
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        @click.prevent="openAccountDetailsModal(account)"
                      >
                        <span> Details </span>
                      </a>
                    </li>
                    <li v-if="account.type?.name === 'Bank'">
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="
                          $router.push({
                            name: 'account-cards',
                            params: { id: account.id },
                          })
                        "
                      >
                        <span> Cards </span>
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
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="pinAccount(account)"
                      >
                        <span> Pin / Unpin </span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider"/>
                    </li>
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

    <AccountModal :modal="this.modals.AccountModal?.instance"/>
    <AccountEditModal
      :account="this.modals.AccountEditModal?.data ?? null"
      :modal="this.modals.AccountEditModal?.instance"
    />
    <MoveMoneyModal :modal="this.modals.MoveMoneyModal?.instance"/>
    <AccountDetailsModal :account="focusedAccount"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AccountModal from "@/components/Accounts/AccountModal.vue";
import AccountEditModal from "@/components/Accounts/AccountEditModal.vue";
import MoveMoneyModal from "@/components/Accounts/MoveMoneyModal.vue";
import AccountDetailsModal from "@/components/Accounts/AccountDetailsModal.vue";
import {Modal} from "bootstrap";
import {pinAccount} from "../../api/accounts";

export default {
  components: {
    AccountModal,
    AccountEditModal,
    MoveMoneyModal,
    AccountDetailsModal
  },

  data() {
    return {
      modals: {
        activeModal: null,
      },
      focusedAccount: null,
    };
  },

  mounted() {
    document.querySelectorAll(".modal").forEach((modalElement) => {
      this.modals[modalElement.id] = {instance: new Modal(modalElement)};
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

      modal.data = {...data};
      this.modals.activeModal = modalName;
    },

    removeAccount(account) {
      this.$store.dispatch("accounts/delete", {account});
    },

    async pinAccount(account) {
      await pinAccount(account.id);
    },

    openAccountDetailsModal(account) {
      this.focusedAccount = account;

      const modal = new Modal(document.getElementById("AccountDetailsModal"));

      modal.show();
    },
  },
};
</script>