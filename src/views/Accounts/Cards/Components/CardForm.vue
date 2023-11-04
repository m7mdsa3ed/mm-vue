<script setup>
import {ref, watch} from "vue";
import creditCardType from 'credit-card-type'

const emit = defineEmits(['saveCard'])

const defaultFormCard = {
  ccName: null,
  ccNumber: null,
  ccCsc: null,
  ccExp: null,
  ccType: null,
  ccBrand: null,
}

const formCard = ref(defaultFormCard)

const saveCard = () => emit('saveCard', formCard.value) && (formCard.value = defaultFormCard);

watch(formCard.value, (to) => {
  if (to.ccNumber) {
    const brand = creditCardType(to.ccNumber.toString())[0] ?? null;

    formCard.value.ccBrand = brand?.niceType;
  }
}, {deep: true})
</script>

<template>
  <div class="d-flex flex-column gap-3 flex-wrap">
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="form-floating">
          <input type="text" v-model="formCard.ccName" name="cc-name" max="21" class="form-control" placeholder=" "/>
          <label> Name </label>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-3">
        <div class="form-floating">
          <input type="text" v-model="formCard.ccType" name="cc-exp-year" max="4" class="form-control"
                 placeholder=" "/>
          <label> Card Type </label>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-3">
        <div class="form-floating">
          <input type="text" v-model="formCard.ccBrand" name="cc-exp-year" max="4" class="form-control"
                 placeholder=" "/>
          <label> Brand </label>
        </div>
      </div>
      
      <div class="col-12 col-lg-7">
        <div class="form-floating">
          <input type="number" v-model="formCard.ccNumber" name="cc-number" max="16" class="form-control"
                 placeholder=" "/>
          <label> Card Number </label>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-2">
        <div class="form-floating">
          <input type="number" v-model="formCard.ccCsc" name="cc-cvv" max="4" class="form-control" placeholder=" "/>
          <label> CVV </label>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-3">
        <div class="form-floating">
          <input type="month" v-model="formCard.ccExp" name="cc-exp" max="2" class="form-control" placeholder=" "/>
          <label> Expiration Date </label>
        </div>
      </div>

    </div>

    <button class="btn btn-danger w-100" @click="saveCard">
      Save
    </button>
  </div>
</template>