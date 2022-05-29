<template>
  <div
    class="modal fade"
    id="TagModal"
    tabindex="-1"
    aria-labelledby="TagModalLabel"
    aria-hidden="true"
    ref="TagModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Tag</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="save">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder=" "
                v-model="tag.name"
              />
              <label> Tag Name </label>
            </div>
            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modal"],

  data() {
    return {
      tag: {},
    };
  },

  methods: {
    save() {
      const data = new FormData();

      for (const key in this.tag) {
        const value = this.tag[key];
        if (value) {
          data.append(key, value);
        }
      }

      this.$store.dispatch("tags/save", { data }).then(() => {
        this.modal.hide();
      });
    },
  },
};
</script>