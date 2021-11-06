<template>
  <div class="bg-main box">
    <p class="fs-4 fw-light mb-0">Categories</p>
    <table class="table align-middle table-borderless">
      <thead>
        <tr>
          <th>Category</th>
          <th class="text-end">Total in</th>
          <th class="text-end">Total out</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="stat in stats" :key="stat">
          <td>{{ stat.name }}</td>
          <td class="text-end text-success">{{ $fn.money(stat.in) }}</td>
          <td class="text-end text-danger">{{ $fn.money(stat.out) }}</td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn btn-dark btn-sm w-100"
      data-bs-toggle="modal"
      data-bs-target="#CategoryModal"
    >
      <i class="icon fas fa-plus"> </i> Category
    </button>

    <CategoryModal />
  </div>
</template>

<script>
import CategoryModal from "./CategoryModal";

export default {
  props: ["stats"],
  components: {
    CategoryModal,
  },
};
</script>