<script setup>

import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import dayjs from "dayjs";

const {state, dispatch} = useStore();

const notifications = computed(() => state.notifications.notifications)

onMounted(() => {
  dispatch('notifications/fetch')
})
</script>

<template>
  <div class="d-flex flex-column -center justify-content-center gap-2">
    <template v-for="notification in notifications" :key="notification.id">
      <div
        class="box d-flex justify-content-between align-items-start"
        :class="` ${notification.read_at ? '' : 'bg-main'}`"
      >
        <div>
          <p class="mb-0 lead">{{ notification.data?.title }}</p>

          <p class="mb-0 small text-muted">{{ notification.data?.message }}</p>
        </div>
        
        <div class="text-end d-flex align-items-end flex-column gap-2">
          <span class="text-nowrap">
            {{ dayjs(notification.created_at).format('ll') }} <br>
            {{ dayjs(notification.created_at).format('hh:mm:ss A') }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>