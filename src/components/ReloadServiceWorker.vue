<template>
  <div
    v-if="false"
    class="mb-1 bg-main box d-flex align-items-center justify-content-center"
  >
    <p class="mb-0 me-2 fw-bold">An update is available</p>
    <button class="btn btn-primary px-4 btn-sm" @click="() => {}">
      Refresh
    </button>
  </div>
</template>

<script setup lang="ts">
// import { useRegisterSW } from "virtual:pwa-register/vue";
// import { watch } from "vue";
//
// const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
//
// watch(needRefresh, (to) => {
//   if (to) {
//     updateServiceWorker()
//   }
// });
</script>
