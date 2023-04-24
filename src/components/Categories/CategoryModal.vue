<template>
  <div
    class="modal fade"
    id="CategoryModal"
    tabindex="-1"
    aria-labelledby="CategoryModalLabel"
    aria-hidden="true"
    ref="CategoryModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="bg-main box">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <p class="fs-4 fw-light mb-0">Category</p>
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
                v-model="category.name"
              />
              <label> Category Name </label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="categorySelect"
                v-model="category.parent_id"
              >
                <option selected :value="undefined">Parent Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <label for="categorySelect">Category</label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["modal"],

  data() {
    return {
      category: {},
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
  },

  methods: {
    save() {
      const data = new FormData();

      for (const key in this.category) {
        const value = this.category[key];
        if (value) {
          data.append(key, value);
        }
      }

      this.$store.dispatch("categories/save", { data }).then(() => {
        this.modal.hide();
      });
    },
  },
};
</script>