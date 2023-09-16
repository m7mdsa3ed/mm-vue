<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();

const { state, dispatch } = useStore();

const links = computed(() => state.navigation.links);

const havePrivilege = (roles) => {
  if (roles && roles.length) {
    const userRoles =
      state.auth.user?.roles?.map((roleObj) => roleObj.name) || [];

    if (roles.filter((role) => userRoles.includes(role)).length) {
      return true;
    }
  }

  return false;
};

const logout = () => dispatch("auth/logout");
</script>

<template>
  <div>
    <ul class="navbar-nav ms-auto">
      <template v-for="(link, index) in links" :key="index">
        <template v-if="link.roles?.length ? havePrivilege(link.roles) : true">
          <li class="nav-item">
            <span
              role="button"
              class="nav-link"
              aria-current="page"
              @click="router.push({ name: link.routeName })"
            >
              <span class="me-1" v-html="link.icon"></span>
              <span>{{ link.name }}</span>
            </span>
          </li>
        </template>
      </template>

      <li class="nav-item">
        <span
          role="button"
          class="nav-link"
          aria-current="page"
          @click="logout()"
        >
          <span class="me-1">
            <i class="icon fas fa-sign-out"></i>
          </span>
          <span> Logout </span>
        </span>
      </li>
    </ul>
  </div>
</template>