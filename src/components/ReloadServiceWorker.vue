<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();

const refresh = () => {
  updateServiceWorker();
};
</script>

<template>
  <div
    v-if="needRefresh"
    class="mb-1 bg-main box d-flex align-items-center justify-content-center"
  >
    <p class="mb-0 me-2 fw-bold">An update is available</p>

    <button class="btn btn-primary px-4 btn-sm" @click="refresh">
      Refresh
    </button>
  </div>
</template>
