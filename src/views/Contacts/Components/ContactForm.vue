<script setup>

import {ref, watch} from "vue";
import {useStore} from "vuex";

const {dispatch} = useStore();

const props = defineProps({
  contact: {
    type: Object,
  },
})

const currentContact = ref({
  name: '',
})

watch(() => props.contact, (contact) => {
  currentContact.value = contact
})

const saveContact = async () => {
  await dispatch('contacts/save', {
    contact: currentContact.value
  })
}

</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="nameInput"
        placeholder="Name"
        v-model="currentContact.name"
      />
      
      <label for="nameInput">
        Name
      </label>
    </div>
    
    <button class="btn btn-primary w-100" @click="saveContact">Save</button>
  </div>
</template>