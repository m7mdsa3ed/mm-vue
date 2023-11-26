<script setup>
import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import dayjs from "dayjs";

const props = defineProps({
  currentSubscription: {
    type: Object,
    default: ref({})
  }
})

const {state, dispatch} = useStore()

const emits = defineEmits(['afterSave'])

const defaultState = {
  auto_renewal: true,
  can_cancel: true,
  started_at: dayjs().format("YYYY-MM-DD HH:mm"),
}

const subscription = ref({
  ...defaultState
})

const intervalUnits = [
  {name: "Day", value: 4},
  {name: "Week", value: 5},
  {name: "Month", value: 6},
  {name: "Year", value: 7},
]

const accounts = computed(() => state.accounts.data)

const submitForm = async (e) => {
  await dispatch('subscriptions/save', {
    subscription: subscription.value,
  })

  emits('afterSave')

  subscription.value = {
    ...defaultState
  }
}

watch(props, (to) => {
  subscription.value = {
    ...to.currentSubscription ?? defaultState
  }
},)
</script>

<template>
  <form class="d-flex flex-column gap-3" @submit.prevent="submitForm">
    <div class="d-flex flex-wrap gap-3">
      <div class="form-floating flex-fill">
        <input name="name" v-model="subscription.name" class="form-control" id="subscriptionName" placeholder=""
               required>
        
        <label for="subscriptionName">Name</label>
      </div>

      <div class="form-floating flex-fill">
        <input type="number" step="any" v-model="subscription.amount" name="amount" class="form-control"
               id="subscriptionAmount" placeholder="" required>
        
        <label for="subscriptionAmount">Amount</label>
      </div>
    </div>

    <div class="d-flex flex-wrap gap-3">
      <div class="form-floating flex-fill">
        <select class="form-select" v-model="subscription.interval_unit" required>
          <option selected disabled value="undefined"> Select Unit</option>
          
          <template v-for="intervalUnit in intervalUnits" :key="intervalUnit.value">
            <option :value="intervalUnit.value">
              {{ intervalUnit.name }}
            </option>
          </template>
        </select>
        
        <label for="subscriptionIntervalUnit">Interval Unit</label>
      </div>

      <div class="form-floating flex-fill">
        <input type="number" v-model="subscription.interval_count" name="interval_count" class="form-control"
               id="subscriptionIntervalCount" placeholder="" required>
        
        <label for="subscriptionIntervalCount">Interval Count</label>
      </div>
    </div>

    <div class="d-flex flex-wrap gap-3">
      <div class="form-floating flex-fill">
        <select v-model="subscription.account_id" class="form-select" id="subscriptionAccount" required>
          <option selected disabled value="undefined"> Select Account</option>

          <template v-for="account in accounts" :key="account.id">
            <option :value="account.id">
              {{ account.name }}
            </option>
          </template>
        </select>

        <label for="subscriptionAccount">Account</label>
      </div>

      <div class="form-floating flex-fill">
        <input type="datetime-local" v-model="subscription.started_at" name="started_at" class="form-control"
               id="subscriptionStartedAt">
        
        <label for="subscriptionStartedAt">Started At</label>
      </div>
    </div>

    <div class="d-flex flex-wrap gap-3">
      <div class="form-check form-switch">
        <input type="checkbox" v-model="subscription.auto_renewal" class="form-check-input" role="switch"
               id="subscriptionAutoRenewal">
        
        <label class="form-check-label" for="subscriptionAutoRenewal">Auto Renewal (from expiration date if it's auto
          renewal)</label>
      </div>

      <div class="form-check form-switch">
        <input type="checkbox" v-model="subscription.can_cancel" class="form-check-input" role="switch"
               id="subscriptionCanCancel">
        
        <label class="form-check-label" for="subscriptionCanCancel">Can Cancel Anytime (No Refund, do it manually if
          there's any.)</label>
      </div>
    </div>

    <button class="btn btn-dark w-100">
      Save
    </button>
  </form>
</template>