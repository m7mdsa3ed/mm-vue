<script setup>

import {ref} from "vue";
import AccountsSetup from "./Components/AccountsSetup.vue";
import CategoriesSetup from "./Components/CategoriesSetup.vue";
import TagsSetup from "./Components/TagsSetup.vue";
import BudgetsSetup from "./Components/BudgetsSetup.vue";

const currentStep = ref(0);

const stepComponent = [
  AccountsSetup,
  CategoriesSetup,
  TagsSetup,
  BudgetsSetup,
]

const getComponent = () => stepComponent.find((_, index) => index === currentStep.value)

const changeStep = (step) => {
  const newStep = currentStep.value + step;

  if (newStep >= 0 && newStep < stepComponent.length) {
    currentStep.value = newStep;
  }
}
</script>

<template>
  <div class="container-xxl">
    <div class="box bg-main d-flex flex-column mt-4">
      <component :is="getComponent()"/>

      <hr>
      
      <div class="d-flex justify-content-between">
        <button class="btn btn-dark" @click="changeStep(-1)">
          Previous
        </button>

        <button class="btn btn-dark" @click="changeStep(1)">
          Next
        </button>
      </div>
    </div>
  </div>
</template>