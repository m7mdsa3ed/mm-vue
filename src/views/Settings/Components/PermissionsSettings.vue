<template>
  <div class="box bg-main">
    <h2>Permissions Settings</h2>
    <template v-for="role in roles" :key="role.id">
      <div class="col-12 col-sm-6 mb-3">
        <p class="lead fw-bold">
          {{ this.readableString(role.name) }}
        </p>

        <div class="row">
          <template v-for="permission in permissions" :key="permission.id">
            <div class="col-12 col-sm-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  form="rolesFrom"
                  :name="`roles[${role.id}][]`"
                  :value="permission.id"
                  :checked="role.permissions.includes(permission.id)"
                />

                <label class="form-check-label">
                  {{ this.readableString(permission.name) }}
                </label>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <form id="rolesFrom" @submit.prevent="saveRoles">
      <button class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["roles", "permissions"],

  methods: {
    readableString(string) {
      return string
        .replace(".", " ")
        .toLowerCase()
        .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase());
    },

    async saveRoles({ target }) {
      await this.$store.dispatch("roles/save", {
        fd: new FormData(target),
      });
    },
  },
};
</script>

<style>
</style>