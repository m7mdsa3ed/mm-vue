<template>
  <div class="wrapper">
    <div class="sidebar bg-body" :class="{ open: isOpen }">
      <div class="sticky-top p-4">
        <div class="d-flex justify-content-between px-2">
          <i class="sidebar-toggler fas fa-close" @click="toggleOpen"></i>
        </div>

        <Navigation :isSidebar="true" />
      </div>
    </div>

    <div class="content py-4">
      <div class="container-fluid">
        <i class="fas fa-bars sidebar-toggler" @click="toggleOpen"></i>

        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation/Navigation.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();

const { state, commit } = useStore();

const isOpen = computed(() => state.navigation.isOpen);

const toggleOpen = () => commit("navigation/toggle");

watch(route, () => {
  if (isOpen.value) {
    toggleOpen();
  }
});
</script>
