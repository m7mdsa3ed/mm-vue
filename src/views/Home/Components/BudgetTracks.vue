<script setup>
import Budget from "../../Budgets/Components/Budget.vue";

const props = defineProps({
  budgets: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <div class="row g-3">
    <template v-for="budget in budgets">
      <div class="col-12 col-lg-6">
        <Budget
          :budget="budget" 
          :showActions="false"
        />
      </div>
    </template>
  </div>
</template>