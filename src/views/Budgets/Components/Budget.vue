<template>
  <div class="box bg-main d-flex flex-column gap-3">
    <div class="d-flex justify-content-between align-items-start">
      <p class="lead mb-0">
        {{ budget.name }}
      </p>

      <div class="d-flex align-items-center">
        <span class="badge bg-primary">
          {{ budget.type_as_string }}
        </span>

        <div class="dropdown" v-if="showActions">
          <span role="button" data-bs-toggle="dropdown">
            <i class="fa-fw fas fa-ellipsis-v"></i>
          </span>

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-custom mx-0"
            style="width: 220px"
          >
            <li>
              <a
                class="dropdown-item"
                href=""
                @click.prevent="$emit('edit', budget)"
              >
                <span> Edit </span>
              </a>
            </li>
            <li>
              <a
                class="dropdown-item text-danger"
                href=""
                @click.prevent="$emit('delete', budget)"
              >
                <span> Delete </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p class="mb-0 text-multi-truncate-3 overflow-hidden" style="height: 3rem; max-height: 3rem;">
      {{ budget.description ?? 'No Description' }}
    </p>

    <div class="d-flex flex-column gap-1">
      <div class="d-flex flex-wrap justify-content-between">
        <div class="d-flex gap-1 flex-wrap">
          {{ money(budget.balance) }}

          <span class="mb-0 text-danger" v-if="budget.exceeded_amount">
            {{ money(budget.exceeded_amount) }}
          </span>
        </div>

        <span>
          {{ money(budget.amount) }}
        </span>
      </div>

      <div
        class="progress bg-dark"
        role="progressbar"
        aria-label="Example with label"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
        style="height: 25px"
      >
        <div
          :class="`progress-bar ${progressBg(budget.progress)}`"
          :style="`width: ${budget.progress}%`"
        >
          {{ budget.progress }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {money} from "../../../helpers.js";

defineProps({
  budget: {
    type: Object,
    required: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
});

const progressBg = (progress) => {
  if (progress > 75) {
    return "bg-danger";
  }

  if (progress > 50) {
    return "bg-warning";
  }
  if (progress > 25) {
    return "bg-info";
  }

  return "bg-success";
};

</script>