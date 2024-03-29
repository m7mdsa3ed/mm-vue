<template>
  <div
    class="modal fade"
    id="SaveBudgetModal"
    tabindex="-1"
    aria-labelledby="SaveBudgetModalLabel"
    aria-hidden="true"
    ref="SaveBudgetModal"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <p class="fs-4 fw-light mb-0">Budget</p>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form
            @submit.prevent="save"
            id="budgetForm"
            class="d-flex gap-3 flex-column"
          >
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder=" "
                v-model="budget.name"
                required
              />

              <label> Name </label>
            </div>

            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                name="description"
                v-model="budget.description"
                placeholder=" "
              />

              <label for=""> Description </label>
            </div>

            <div class="form-floating">
              <select
                class="form-select"
                name="type"
                v-model="budget.type"
                required
              >
                <option value="undefined" disabled selected>Select Type</option>

                <template v-for="t in types" :key="t.id">
                  <option :value="t.id">
                    {{ t.name }}
                  </option>
                </template>
              </select>

              <label> Type </label>
            </div>

            <div class="form-floating">
              <select
                class="form-select"
                name="category_id[]"
                style="min-height: 150px"
                required
                multiple
              >
                <option value="undefined" disabled selected>
                  Select Category
                </option>

                <template v-for="category in categories" :key="category.id">
                  <option
                    :value="category.id"
                    :selected="budgetCategoryIds.includes(category.id)"
                  >
                    {{ category.name }}
                  </option>
                </template>
              </select>

              <label> Category </label>
            </div>

            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                name="amount"
                v-model="budget.amount"
                placeholder=" "
              />

              <label for=""> Amount </label>
            </div>

            <div class="d-flex justify-content-between small">
              <div>
                <span class="text-muted"> Get the average? </span>
                <span role="button" @click="getAverageForBudget"> Check? </span>
              </div>
              
              <span v-if="averageAmount != null"> {{ money(averageAmount) }} </span>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            form="budgetForm"
            type="submit"
            class="btn btn-dark border w-100"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {formToJson} from "@/helpers";
import {Modal} from "bootstrap";
import {getAverageAmountForBudget} from "../../../api/budgets.js";
import {money} from "../../../helpers.js";

const props = defineProps({
  budget: {
    type: Object,
  },
});

const averageAmount = ref(null);

const {dispatch, state} = useStore();

const categories = computed(() => state.categories.categories);

const budgetCategoryIds = computed(() => {
  if (props.budget.categories) {
    return props.budget.categories.map((c) => c.id);
  }

  return [];
});

const types = ref([
  {
    id: 1,
    name: "Monthly",
  },
  {
    id: 2,
    name: "Yearly",
  },
]);

const save = (e) => {
  const budget = formToJson(e.target);

  if (props.budget.id) {
    budget.id = props.budget.id;
  }

  dispatch("budgets/save", {
    budget,
  });

  const modal = Modal.getOrCreateInstance(
    document.getElementById("SaveBudgetModal")
  );

  modal.hide();
};

const getAverageForBudget = async () => {
  const budget = formToJson(document.getElementById("budgetForm"));

  const { amount } = await getAverageAmountForBudget(budget);

  averageAmount.value = amount;
}
</script>