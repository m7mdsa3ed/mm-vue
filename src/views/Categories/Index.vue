<template>
  <div class="p-4">
    <div class="mb-3">
      <p class="display-6">Categories</p>
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
          <template v-for="cateogry in categories" :key="cateogry.id">
            <tr>
              <td>
                {{ cateogry.name }}
              </td>
              <td class="text-end">
                {{ $fn.money(cateogry.balance) }}
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
                            name: 'categories.detail',
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
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeTransation(Account, 'details')"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      modals: {
        activeModal: null,
        AccountModal: {
          instance: null,
          account: null,
        },
        AccountDetailsModal: {
          instance: null,
          account: null,
        },
      },
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },

  methods: {
    setAccountOpenModal(Account, modal) {
      var modalName, modal;

      switch (modal) {
        case "edit":
          modal = this.modals.AccountModal;
          modalName = "AccountModal";
          break;

        case "details":
          modal = this.modals.AccountDetailsModal;
          modalName = "AccountDetailsModal";
          break;
      }

      modal.instance.show();

      modal.account = { ...account };
      this.modals.activeModal = modalName;
    },
  },
};
</script>