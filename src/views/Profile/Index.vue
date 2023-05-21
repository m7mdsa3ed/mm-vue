<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Profile</p>

      <button class="btn btn-outline-danger" @click="load">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <h1>{{ profile.name }}</h1>

    <div class="mb-3 d-flex gap-2">
      <div class="badge bg-danger" v-for="role in roles" :key="role">
        {{ role }}
      </div>
    </div>

    <div class="d-flex flex-column gap-3">
      <div class="box bg-main">
        <div class="d-flex flex-column gap-3">
          <div>
            <p class="mb-0">
              <i class="fa-fw fas fa-phone me-2"></i>
              Phone
            </p>
            <p class="mb-0 lead">{{ profile.phone }}</p>
          </div>

          <div>
            <p class="mb-0">
              <i class="fa-fw fas fa-at me-2"></i>
              Email Address
            </p>
            <p class="mb-0 lead">{{ profile.email }}</p>
          </div>

          <div>
            <p class="mb-0">
              <i class="fa-fw fas fa-clock me-2"></i>
              Joined Date
            </p>
            <p class="mb-0 lead">{{ $date(profile.created_at).format("LL") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { notationToReadable } from "../../helpers";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      profile: (state) => state.auth.user,
      currencies: (state) => state.currencies.data
    }),

    roles() {
      return this.profile.roles.map((role) => notationToReadable(role.name));
    },

    permissions() {
      return (
        this.profile?.roles
          .map((role) =>
            role.permissions.map((permission) =>
              notationToReadable(permission.name)
            )
          )
          .flat(1) ?? []
      );
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {},
  },
};
</script>