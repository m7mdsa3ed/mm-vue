<template>
  <div class="d-flex flex-column gap-3">
    <div>
      <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
        <p class="display-6 mb-0">Profile</p>

        <button class="btn btn-outline-danger" @click="load">
          <i class="fa-fw fas fa-refresh"></i>
        </button>
      </div>
    </div>

    <div>
      <h2>Currency Rates</h2>

      <div class="box bg-main">
        <CurrencyRates />
      </div>
    </div>

    <div>
      <h2>Passkeys</h2>

      <div class="box bg-main">
        <Passkeys />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { notationToReadable } from "../../helpers";
import EstimateCalculator from "../../components/EstimateCalculator.vue";
import Passkeys from "./Components/Passkeys.vue";
import CurrencyRates from "./Components/CurrencyRates.vue";

const { state, dispatch } = useStore();

const profile = computed(() => state.auth.user);

const roles = computed(() =>
  profile.value.roles?.map((role) => notationToReadable(role.name))
);

const load = () => {
  const names = [
    'currencies/fetchUserCurrenciesWithRates',
  ];
  
  names.forEach((name) => dispatch(name));
}
</script>