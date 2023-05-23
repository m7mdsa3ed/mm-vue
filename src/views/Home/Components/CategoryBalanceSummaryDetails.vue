<template>
  <div>
    <p>Categories</p>

    <div class="d-flex flex-column gap-1 w-100">
        <template v-for="category in categoriesSummary" :key="category.id">
          <div class="d-flex flex-column  gap-2 box bg-main">
            <p class="mb-0">
              {{ category.name ?? "Other" }}
            </p>

            <div>
              <span>
                <i class="icon icon-bg-success fas fa-sm fa-arrow-up"></i>
                {{ category.in_amount }}
              </span>
              -
              <span>
                <i class="icon icon-bg-danger fas fa-sm fa-arrow-down"></i>
                {{ category.out_amount }}
              </span>
            </div>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categoriesSummary"],
};
</script>