<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Settings</p>

      <button class="btn btn-outline-danger" @click="load">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

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

    <hr />

    <div class="box bg-main">
      <h2>Currencies Settings</h2>

      <table class="table table-borderless table-striped">
        <thead>
          <tr>
            <th>Currency Name</th>
            <th style="width: 1px"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="currency in currencies" :key="currency.id">
            <tr>
              <td>
                <input type="text" :value="currency.name" class="form-control bg-transparent border-0" @change="(evt) => updateCurrency(evt, currency)">
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      roles: (state) => state.roles.data?.roles,
      permissions: (state) => state.roles.data?.permissions,
      currencies: (state) => state.currencies.data,
    }),
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      this.$store.dispatch("roles/fetch");
    },

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

    updateCurrency(evt, currency) {
      const name = evt.target.value;
      
      const fd = new FormData();

      fd.append('id', currency.id);
      
      fd.append('name', name);

      this.$store.dispatch('currencies/update', {
        fd
      })
    }
  },
};
</script>