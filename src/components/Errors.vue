<template>
  <div class="alert alert-danger" role="alert" v-if="errors">
    <h4 class="alert-heading" v-if="errors.message">
      {{ errors.message }}
    </h4>
    
    <div class="d-flex flex-column gap-1">
      <template v-for="(message, key) in errors" :key="key">
        <p v-if="key != 'message'" class="mb-0">
          {{ Array.isArray(message) ? message.join(", ") : message }}
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  errors: {
    type: Object,
    required: true,
  },
});

console.log(errors);

</script>