<template>
  <div class="bg-main box">
    <p class="fs-4 fw-light mb-0">Categories</p>
    <table class="table align-middle table-borderless mb-3">
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
          <td class="text-end">{{ $fn.money(stat.in) }}</td>
          <td class="text-end">{{ $fn.money(stat.out) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["stats"],
};
</script>