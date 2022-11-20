<template>
  <div class="col-12 col-lg-4">
    <div>
      <p class="lead fw-bold">
        Month Report
      </p>

      <div class="d-flex gap-3 w-100 mb-3">
        <div class="d-flex justify-content-between align-items-center w-100 bg-main box">
          <i class="icon icon-bg-success fas fa-arrow-up"></i>
          <p class="mb-0"> {{ $fn.money(dashboardStats?.summary?.in_amount) }} </p>
        </div>

        <div class="d-flex justify-content-between align-items-center w-100 bg-main box">
          <i class="icon icon-bg-danger fas fa-arrow-down"></i>
          <p class="mb-0"> {{ $fn.money(dashboardStats?.summary?.out_amount) }} </p>
        </div>
      </div>
    </div>

    <div>
      <p>
        Categories
      </p>

      <div class=" d-flex flex-column gap-3 w-100 ">
        <div class="accordion" id="categoryData">
          <template v-for="category in dashboardStats?.categories_summary ?? []" :key="category.id">
            <div class="accordion-item ">
              <h2 class="accordion-header " :id="`categoryHeader${category.id}`">
                <button class="bg-main box accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#categoryId${category.id}`" aria-expanded="false" :aria-controls="`categoryId${category.id}`">
                  <div class="d-flex flex-column">
                    <p class="mb-2">
                      {{ category.name ?? 'Other' }}
                    </p>

                    <div>
                      <span>
                        <i class="fas fa-sm fa-arrow-up text-success"></i> {{ category.in_amount }}
                      </span>
                      -
                      <span>
                        <i class="fas fa-sm fa-arrow-down text-danger"></i> {{ category.out_amount }}
                      </span>
                    </div>
                  </div>
                </button>
              </h2>

              <div :id="`categoryId${category.id}`" class="accordion-collapse collapse" :aria-labelledby="`categoryHeader${category.id}`" data-bs-parent="#categoryData">
                <div class="accordion-body">
                  <template v-for="row in category.data">
                    <div class="d-flex gap-1 justify-content-between">
                      <p class="mb-0 text-truncate" :title="row.name">{{ row.name }}</p>
                      <p class="mb-0 text-nowrap">
                        {{ $fn.money(row.amount) }}

                        <i v-if="row.type == 1" class="fas fa-sm fa-arrow-up text-success"></i>
                        <i v-else class="fas fa-sm fa-arrow-down text-danger"></i>
                      </p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardStats: null,
    }
  },

  mounted() {
    this.getDashboardStats();
  },

  methods: {
    getDashboardStats() {
      this.$http.get('/stats')
        .then(res => {

          this.dashboardStats = res.data
        })
    }
  }
};
</script>