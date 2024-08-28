<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { computed } from "vue";
import { useStore } from "vuex";

const { state } = useStore();

const { needRefresh, updateServiceWorker } = useRegisterSW();

const refresh = () => {
  updateServiceWorker();
};

const serviceWorkerStatus = computed(() => state.app.serviceWorkerStatus);

const showBanner = computed(() => needRefresh.value || (serviceWorkerStatus.value?.installing === 'true'))

const message = computed(() => {
  if (serviceWorkerStatus.value?.installing) {
    return "Installing new version...";
  }

  if (needRefresh) {
    return "New version available. Click refresh to update.";
  }

  return "App is up to date.";
});
</script>

<template>
  <div>
    <div
      v-if="showBanner"
      class="mb-1 bg-main box d-flex align-items-center justify-content-center"
    >
      <p class="mb-0 me-2 fw-bold">{{ message }}</p>

      <button class="btn btn-primary px-4 btn-sm" @click="refresh" v-if="needRefresh">
        Refresh
      </button>
    </div>
  </div>
</template>
