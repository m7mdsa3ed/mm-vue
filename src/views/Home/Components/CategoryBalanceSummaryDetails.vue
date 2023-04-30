<template>
  <div>
    <p>Categories</p>

    <div class="d-flex flex-column gap-3 w-100">
      <div class="accordion" id="categoryData">
        <template v-for="category in categoriesSummary" :key="category.id">
          <div class="accordion-item">
            <h2 class="accordion-header" :id="`categoryHeader${category.id}`">
              <button
                class="bg-main box accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#categoryId${category.id}`"
                aria-expanded="false"
                :aria-controls="`categoryId${category.id}`"
              >
                <div class="d-flex flex-column">
                  <p class="mb-2">
                    {{ category.name ?? "Other" }}
                  </p>

                  <div>
                    <span>
                      <i class="icon icon-bg-success fas fa-sm fa-arrow-up"></i>
                      {{ category.in_amount }}
                    </span>
                    -
                    <span>
                      <i
                        class="icon icon-bg-danger fas fa-sm fa-arrow-down"
                      ></i>
                      {{ category.out_amount }}
                    </span>
                  </div>
                </div>
              </button>
            </h2>

            <div
              :id="`categoryId${category.id}`"
              class="accordion-collapse collapse"
              :aria-labelledby="`categoryHeader${category.id}`"
              data-bs-parent="#categoryData"
            >
              <div class="accordion-body p-1 d-flex flex-column gap-1">
                <template v-for="row in category.data" :key="row.name">
                  <div
                    class="d-flex flex-column gap-1 justify-content-between p-2 border rounded"
                  >
                    <p class="mb-0 text-truncate" :title="row.name">
                      {{ row.name }}
                    </p>

                    <div class="d-flex justify-content-between">
                      <span class="small text-muted fw-light">
                        {{ row.date }}
                      </span>
                      <p class="mb-0 text-nowrap">
                        {{ $fn.money(row.amount, row.currency_name) }}

                        <i
                          v-if="row.type == 1"
                          class="icon icon-bg-success fas fa-sm fa-arrow-up text-success"
                        ></i>
                        <i
                          v-else
                          class="icon icon-bg-danger fas fa-sm fa-arrow-down text-danger"
                        ></i>
                      </p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categoriesSummary"],
};
</script>