<template>
  <div class="p-4">
    <div class="mb-3">
      <p class="display-6">Accounts</p>
    </div>

    <div class="box bg-main mb-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#AccountModal"
        ref="AccountModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Account
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
                <span class="text-muted small">
                  Transactions: {{ account.transactions_count }}
                </span>
              </td>
              <td class="text-end">
                {{ $fn.money(account.balance) }}
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
                    <li v-if="false">
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="
                          $router.push({
                            name: 'accounts.detail',
                            params: { id: account.id },
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
                    <template v-if="false">
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
                    </template>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import AccountModal from "@/components/AccountModal";
import AccountEditModal from "@/components/AccountEditModal";
import { Modal } from "bootstrap";
export default {
  components: {
    AccountModal,
    AccountEditModal,
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
      console.log("removing account");
    },
  },
};
</script>