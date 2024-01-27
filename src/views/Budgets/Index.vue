<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Budgets</p>

      <button class="btn btn-outline-danger" @click="dispatch('budgets/fetch')">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3 d-flex gap-3">
      <button
        class="btn btn-sm btn-dark w-100"
        @click="openSaveModal({})"
        ref="SaveBudgetModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Budget
      </button>
    </div>

    <div class="row g-3">
      <template v-for="budget in budgets" :key="budget.id">
        <div class="col-12 col-lg-4">
          <Budget
            :budget="budget"
            :showActions="true"
            @edit="openSaveModal(budget)"
            @delete="dispatch('budgets/delete', { budget })"
          />
        </div>
      </template>
    </div>

    <SaveBudgetModal :budget="focusedBudget" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import SaveBudgetModal from "./Components/SaveBudgetModal.vue";
import Budget from "./Components/Budget.vue";
import { Modal } from "bootstrap";
import { cloneObject } from "../../helpers";

const { state, dispatch } = useStore();

const budgets = computed(() => state.budgets.data);

const focusedBudget = ref({});

const openSaveModal = (budget) => {
  focusedBudget.value = cloneObject(budget);

  const modal = Modal.getOrCreateInstance(
    document.getElementById("SaveBudgetModal")
  );

  modal.show();
};

onMounted(() => {
  dispatch("budgets/fetch");
});
</script>
