<template>
  <div>
    <div class="mb-3">
      <p class="display-6">Categories</p>
    </div>

    <div class="box bg-main mb-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#CategoryModal"
        ref="CategoryModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Category
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
          <template v-for="category in categories" :key="category.id">
            <tr>
              <td>
                <p class="mb-0">
                  {{ category.name }}
                </p>
                <span class="text-muted small">
                  Transactions: {{ category.transactions_count }}
                </span>
              </td>
              <td class="text-end">
                {{ $fn.money(category.balance) }}
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
                            params: { id: category.id },
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
                        @click.prevent="setCategoryOpenModal(category, 'edit')"
                      >
                        <span> Edit </span>
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeCategory(category)"
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
    <CategoryModal :modal="this.modals.CategoryModal?.instance" />
    <CategoryEditModal
      :modal="this.modals.CategoryEditModal?.instance"
      :category="this.modals.CategoryEditModal?.data"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryModal from "@/components/CategoryModal";
import CategoryEditModal from "@/components/CategoryEditModal";
import { Modal } from "bootstrap";
export default {
  components: {
    CategoryModal,
    CategoryEditModal,
  },

  data() {
    return {
      modals: {
        activeModal: null,
      },
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },

  mounted() {
    document.querySelectorAll(".modal").forEach((modalElement) => {
      this.modals[modalElement.id] = { instance: new Modal(modalElement) };
    });
  },

  methods: {
    setCategoryOpenModal(data, modal) {
      var modalName, modal;

      switch (modal) {
        case "edit":
          modal = this.modals.CategoryEditModal;
          modalName = "CategoryEditModal";
          break;
      }

      modal.instance.show();

      modal.data = { ...data };
      this.modals.activeModal = modalName;
    },

    removeCategory(category) {
      if (confirm("Are you sure you want to delete this category?")) {
        this.$store.dispatch("categories/delete", {
          category,
        });
      }
    },
  },
};
</script>