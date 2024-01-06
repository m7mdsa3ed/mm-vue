<script setup>

import {ref, watch} from "vue";

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

</script>

<template>
  <div>
    <div class="form-floating">
      <input
        type="text"
        class="form-control"
        id="nameInput"
        placeholder="Name"
        v-model="currentContact.name"
      />
    </div>
  </div>
</template>