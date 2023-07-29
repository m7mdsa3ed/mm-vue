<template>
  <div
    class="modal fade"
    id="CategoryDetailsModal"
    tabindex="-1"
    aria-labelledby="CategoryDetailsModalLabel"
    aria-hidden="true"
    ref="CategoryDetailsModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content ">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Category</p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
        </div>

        <div class="modal-body" v-if="category">
          <pre>{{ JSON.stringify(category, null, 2) }}</pre>
        </div>

        <div class="modal-footer">
          <button data-bs-dismiss="modal" class="btn btn-dark w-100">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  category: {
    type: Object,
  },
});

</script>