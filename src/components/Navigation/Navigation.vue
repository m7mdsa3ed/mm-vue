<template>
  <Sidebar v-if="isSidebar" />
  <Topbar v-else />
</template>

<script setup>
import Sidebar from "@/components/Navigation/Sidebar.vue";
import Topbar from "@/components/Navigation/Topbar.vue";

defineProps({
  isSidebar: {
    type: Boolean,
    default: false,
  },
});
</script>