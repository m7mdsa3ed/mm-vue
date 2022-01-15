<template>
  <ul
    class="
      list-unstyled
      d-flex
      flex-column
      gap-3
      h-100
      justify-content-center
      c-sidebar
    "
  >
    <li @click="goto('Home')" class="text-nowrap">
      <i class="icon fas fa-home"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Home </span>
    </li>
    <li @click="goto('Transactions')" class="text-nowrap">
      <i class="icon fas fa-dollar-sign"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Transactions </span>
    </li>
    <li @click="goto('Accounts')" class="text-nowrap">
      <i class="icon fas fa-file-alt"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Accounts </span>
    </li>
    <li @click="goto('Categories')" class="text-nowrap">
      <i class="icon fas fa-th"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Categories </span>
    </li>
    <li></li>
    <li @click="goto('Profile')" class="text-nowrap">
      <i class="icon fas fa-user"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Profile </span>
    </li>
    <li></li>
    <li @click="logout" class="text-nowrap">
      <i class="icon fas fa-sign-out-alt"></i>
      <span class="ms-2 d-none d-lg-inline-block"> Logout </span>
    </li>
  </ul>
</template>

<script>
export default {
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