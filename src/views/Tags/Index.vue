<template>
  <div>
    <div class="mb-3">
      <p class="display-6">Tags</p>
    </div>

    <div class="box bg-main mb-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="modal"
        data-bs-target="#TagModal"
        ref="TagModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Tag
      </button>
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="tag in tags" :key="tag.id">
            <tr>
              <td>
                <p class="mb-0">
                  {{ tag.name }}
                </p>

                <span class="text-muted small">
                  Transactions: {{ tag.transactions_count }}
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
                        @click="
                          toRoute('transactions', { query: { tag_id: tag.id } })
                        "
                      >
                        <span> Details </span>
                      </a>
                    </li>

                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="setTagOpenModal(tag, 'edit')"
                      >
                        <span> Edit </span>
                      </a>
                    </li>

                    <li><hr class="dropdown-divider" /></li>

                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeTag(tag)"
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
    <TagModal :modal="this.modals.TagModal?.instance" />
    <TagEditModal
      :modal="this.modals.TagEditModal?.instance"
      :tag="this.modals.TagEditModal?.data"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TagModal from "@/components/Tags/TagModal.vue";
import TagEditModal from "@/components/Tags/TagEditModal.vue";
import { Modal } from "bootstrap";
export default {
  components: {
    TagModal,
    TagEditModal,
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
      tags: (state) => state.tags.tags,
    }),
  },

  mounted() {
    document.querySelectorAll(".modal").forEach((modalElement) => {
      this.modals[modalElement.id] = { instance: new Modal(modalElement) };
    });
  },

  methods: {
    setTagOpenModal(data, modal) {
      var modalName, modal;

      switch (modal) {
        case "edit":
          modal = this.modals.TagEditModal;
          modalName = "TagEditModal";
          break;
      }

      modal.instance.show();

      modal.data = { ...data };
      this.modals.activeModal = modalName;
    },

    removeTag(tag) {
      if (confirm("Are you sure you want to delete this tag?")) {
        this.$store.dispatch("tags/delete", {
          tag,
        });
      }
    },
  },
};
</script>