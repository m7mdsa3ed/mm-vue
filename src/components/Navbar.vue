<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-3">
    <div class="container-xxl">
      <a class="navbar-brand" href="#" @click.prevent="$router.push('/')">
        Home
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="(link, index) in navLinks" :key="index">
            <span
              role="button"
              class="nav-link"
              aria-current="page"
              @click="goto(link.routeName)"
            >
              <span v-html="link.icon"></span>
              <span>{{ link.name }}</span>
            </span>
          </li>

          <li class="nav-item">
            <span
              role="button"
              class="nav-link"
              aria-current="page"
              @click="$store.dispatch('auth/logout')"
            >
              <span>
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
          name: "Subscriptions",
          routeName: "Subscriptions",
          icon: `<i class="icon fas fa-check-double"></i>`,
        },
        {
          name: "Profile",
          routeName: "Profile",
          icon: `<i class="icon fas fa-user"></i>`,
        },
      ],
    };
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

  methods: {
    goto(name = null) {
      if (name) {
        this.$router.push({ name: name.toLowerCase() });
      }
    },

    logout() {
      console.log("Bye");
    },
  },
};
</script>