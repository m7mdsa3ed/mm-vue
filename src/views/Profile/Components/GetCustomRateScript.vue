<script setup>

import {AsyncFunction} from "../../../helpers.js";
import {ref, watch} from "vue";

const emit = defineEmits(['onRate'])

const props = defineProps({
  script: {
    type: String,
  }
})

const currentScript = ref(props.script)

const randomId = Math.floor(Math.random() * 1000)

const getRate = async (script) => {
  const fn = new AsyncFunction(script)

  emit('onRate', await fn())
}

const changeModelScript = () => {
  currentScript.value = props.script ? props.script : ''
}
</script>

<template>
  <button @click="getRate(script)" class="btn btn-dark btn-sm" v-if="script">
    Get
  </button>
  
  <button class="btn btn-dark btn-sm" :data-bs-target="`#editCustomRateScriptModal${randomId}`" data-bs-toggle="modal" @click="changeModelScript">
    Edit
  </button>
  
  <div class="modal fade" :id="`editCustomRateScriptModal${randomId}`" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Custom Rate Script</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <textarea class="form-control" rows="10" v-model="currentScript"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="getRate(currentScript)">Get</button>
        </div>
      </div>
    </div>
  </div>
</template>