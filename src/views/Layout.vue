<template>
  <div class="d-flex">
    <div class="p-4 bg-white vh-100 sticky-top">
      <Sidebar />
    </div>

    <div class="w-100">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  components: {
    Sidebar,
  },
};
</script>