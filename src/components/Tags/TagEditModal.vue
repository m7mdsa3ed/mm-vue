<template>
  <div
    class="modal fade"
    id="TagEditModal"
    tabindex="-1"
    aria-labelledby="TagEditModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Tag</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="save" id="tagSaveForm">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="data.name"
              />
              <label> Tag Name </label>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button form="tagSaveForm" class="btn btn-dark border w-100">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tag", "modal"],

  computed: {
    data() {
      if (this.tag) {
        return this.tag;
      }

      return {};
    },
  },

  methods: {
    save() {
      const fd = new FormData();

      for (const key in this.tag) {
        const value = this.tag[key];
        if (value) {
          fd.append(key, value);
        }
      }

      this.$store
        .dispatch("tags/save", {
          tag: this.tag,
          data: fd,
        })
        .then(() => {
          this.modal.hide();
        });
    },
  },
};
</script>