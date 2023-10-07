<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {cloneObject} from "../../../helpers";

const {state, dispatch} = useStore()

const accountTypes = computed(() => state.accountTypes.data)

const isLoading = computed(() => state.accountTypes.loading)

const errors = computed(() => state.accountTypes.errors)

const currentAccountType = ref({})

const saveAccountType = async () => {
  console.log({
    accountType: currentAccountType.value
  });
  
  await dispatch("accountTypes/save", {
    accountType: currentAccountType.value
  })
}

const removeAccountType = (accountType) => {
  dispatch("accountTypes/delete", {
    accountType
  })
}

</script>

<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Account Types</p>

      <button
        class="btn btn-outline-danger"
        @click="dispatch('accountTypes/fetch')"
      >
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3">
      <form @submit.prevent="saveAccountType">
        <div class="input-group">
          <div class="form-floating">
            <input type="text" class="form-control" placeholder=" " v-model="currentAccountType.name"/>

            <label> Account Type Name </label>
          </div>

          <button class="btn btn-danger"> Save </button>
        </div>
      </form>
    </div>

    <div class="box bg-main">
      <table class="table align-middle table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="accountType in accountTypes" :key="accountType.id">
            <tr>
              <td>
                <p class="mb-0">
                  {{ accountType.name }}
                </p>

                <p class="text-muted small mb-0">
                  Accounts: {{ accountType.accounts_count }}
                </p>
              </td>
              <td width="1">
                <div class="dropdown">
                  <span role="button" data-bs-toggle="dropdown">
                    <i class="fa-fw fas fa-ellipsis-v"></i>
                  </span>

                  <ul
                    class="dropdown-menu dropdown-menu-end dropdown-menu-custom mx-0"
                    style="width: 220px"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="currentAccountType = cloneObject(accountType)"
                      >
                        <span> Edit </span>
                      </a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="removeAccountType(accountType)"
                      >
                        <span> Delete </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </td>

            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
