<template>
  <nav class="navbar navbar-expand-lg bg-body mb-3">
    <div class="container-xxl">
      <a
        class="navbar-brand d-flex gap-3 align-items-center"
        href="#"
        @click.prevent="$router.push('/')"
      >
        Home
        <div v-if="loading.length" class="d-flex gap-2 align-items-center">
          <span class="badge bg-dark" v-if="loading.length > 1">
            {{ loading.length }}
          </span>

          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <span
          v-if="isPasskeyChecked"
          class="text-muted"
          data-bs-toggle="tooltip"
          data-bs-placement="top" 
          data-bs-title="Passkey check passed" 
        >
          <i class="fas fa-fw fa-sm fa-unlock"></i>
        </span>
      </a>

      <button
        class="navbar-toggler bg-main"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="fas fa-bars"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <template v-for="(link, index) in navLinks" :key="index">
            <template
              v-if="link.roles?.length ? havePrivilege(link.roles) : true"
            >
              <li class="nav-item">
                <span
                  role="button"
                  class="nav-link"
                  aria-current="page"
                  @click="goto(link.routeName)"
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
              @click="$store.dispatch('auth/logout')"
            >
              <span class="me-1">
                <i class="icon fas fa-sign-out-alt"></i>
              </span>
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from "vuex";
import {Tooltip} from 'bootstrap'

export default {
  data() {
    return {
      navLinks: [
        {
          name: "Transactions",
          routeName: "Transactions",
          icon: `<i class="icon fas fa-dollar-sign"></i>`,
        },
        {
          name: "Accounts",
          routeName: "Accounts",
          icon: `<i class="icon fas fa-file-alt"></i>`,
        },
        {
          name: "Categories",
          routeName: "Categories",
          icon: `<i class="icon fas fa-th"></i>`,
        },
        {
          name: "Tags",
          routeName: "Tags",
          icon: `<i class="icon fas fa-tags"></i>`,
        },
        {
          name: "Budget",
          routeName: "Budget",
          icon: `<i class="icon fas fa-wallet"></i>`,
        },
        {
          name: "Subscriptions",
          routeName: "Subscriptions",
          icon: `<i class="icon fas fa-clock"></i>`,
        },
        {
          name: "Profile",
          routeName: "Profile",
          icon: `<i class="icon fas fa-user"></i>`,
        },
        {
          name: "Settings",
          routeName: "Settings",
          icon: `<i class="icon fas fa-gear"></i>`,
          roles: ["manager"],
        },
      ],
    };
  },

  computed: {
    ...mapState({
      loading: (state) => state.app.loading,
      isPasskeyChecked: state => state.auth.credentials?.id
    }),
  },

  watch: {
    $route() {
      const nContentWrapper = document.querySelector("#navbarSupportedContent");
      const nContentToggler = document.querySelector(
        `[data-bs-target='#${nContentWrapper.id}']`
      );

      const nOpened = nContentWrapper.classList.contains("show");

      if (nOpened) {
        nContentToggler.click();
      }
    },
  },

  mounted() {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]')

    tooltips.forEach((tooltip) => {
      new Tooltip(tooltip, {})
    })
  },

  methods: {
    goto(name = null) {
      if (name) {
        this.$router.push({name: name.toLowerCase()});
      }
    },

    havePrivilege(roles) {
      if (roles && roles.length) {
        const userRoles =
          this.$store.state.auth.user?.roles?.map((roleObj) => roleObj.name) ||
          [];

        if (roles.filter((role) => userRoles.includes(role)).length) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>