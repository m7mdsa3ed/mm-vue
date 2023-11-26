<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {money} from "../../helpers.js";
import SaveSubscriptionForm from "./Components/SaveSubscriptionForm.vue";

const {state, dispatch} = useStore()

const subscriptions = computed(() => state.subscriptions.data)

const currentSubscription = ref();

const toggleCollapse = (status) => {
  const isOpen = document.getElementById('formCollapse').classList.contains('show')

  if (isOpen && !status) {
    document.querySelector('[data-bs-target="#formCollapse"]').click()
  } else if (!isOpen && status) {
    document.querySelector('[data-bs-target="#formCollapse"]').click()
  }
}

const onEdit = (subscription) => {
  currentSubscription.value = subscription

  toggleCollapse(true)
}

const onCancel = async (subscription) => {
  await dispatch('subscriptions/cancel', {subscription})
}

const onReactivate = async (subscription) => {
  await dispatch('subscriptions/reactivate', {subscription})
}

const onRenew = async (subscription) => {
  await dispatch('subscriptions/renew', {subscription})
}

const onDelete = async (subscription) => {
  await dispatch('subscriptions/delete', {subscription})
}

</script>

<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Subscriptions</p>

      <button class="btn btn-outline-danger" @click="dispatch('subscriptions/fetch')">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="box bg-main mb-3 d-flex gap-3">
      <button
        class="btn btn-sm btn-dark w-100"
        data-bs-toggle="collapse"
        data-bs-target="#formCollapse"
        ref="AccountModalButton"
      >
        <i class="icon fas fa-plus"></i>
        Subscription
      </button>
    </div>

    <div class="collapse" id="formCollapse">
      <div class="box bg-main mb-3">
        <SaveSubscriptionForm :currentSubscription="currentSubscription" @afterSave="toggleCollapse(false)"/>
      </div>
    </div>

    <div class="table-responsive box bg-main">
      <table class="table align-middle table-borderless mb-0">
        <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Amount</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="subscription in subscriptions" :key="subscription.id">
            <tr class="">
              <td>
                <div class="d-flex gap-2 align-items-center">
                  {{ subscription.name }}

                  <div class="d-flex gap-2 align-items-center">
                    <span
                      v-if="subscription.auto_renewal"
                      class="small text-uppercase fw-bold badge bg-success"
                      title="Auto renewal"
                    >
                      <i class="fa-fw fas fa-refresh"></i>
                    </span>

                    <span
                      v-if="!subscription.can_cancel"
                      class="small text-uppercase fw-bold badge bg-secondary"
                      title="Un-cancelable"
                    >
                      <i class="fa-fw fas fa-cancel"></i>
                    </span>


                    <span
                      v-if="!subscription.is_active"
                      class="small text-uppercase fw-bold badge bg-danger"
                      title="Un-cancelable"
                    >
                      <i class="fa-fw fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <span class="small text-muted">  
                  {{ subscription.auto_renewal ? 'Renewal' : "Expiration" }} date: {{ (subscription.expires_at) }}
                </span>
              </td>

              <td class="text-end">
                {{ money(subscription.amount) }}
              </td>

              <td width="1">
                <div class="dropdown">
                  <span role="button" data-bs-toggle="dropdown">
                    <i class="fa-fw fas fa-ellipsis-v"></i>
                  </span>

                  <ul
                    class="
                      dropdown-menu dropdown-menu-end dropdown-menu-custom
                      mx-0
                    "
                    style="width: 220px"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="onEdit(subscription)"
                      >
                        <span> Edit </span>
                      </a>
                    </li>
                    
                    <li>
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="onRenew(subscription)"
                      >
                        <span> Renew </span>
                      </a>
                    </li>

                    <li>
                      <hr class="dropdown-divider"/>
                    </li>

                    <li v-if="subscription.is_active">
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="onCancel(subscription)"
                      >
                        <span> Cancel </span>
                      </a>
                    </li>

                    <li v-if="!subscription.is_active">
                      <a
                        class="dropdown-item"
                        href=""
                        @click.prevent="onReactivate(subscription)"
                      >
                        <span> Reactivate </span>
                      </a>
                    </li>
                    
                    <li>
                      <a
                        class="dropdown-item text-danger"
                        href=""
                        @click.prevent="onDelete(subscription)"

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

