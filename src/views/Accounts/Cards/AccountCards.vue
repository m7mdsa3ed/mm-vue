<script setup>
import {computed, onMounted, ref} from "vue";
import {checkPasskey} from "../../../plugins/passkey";
import {useStore} from "vuex";
import {deleteAccountCard, getAccountCard, getAccountCards, saveAccountCard} from "../../../api/accounts";
import {useRoute} from "vue-router";
import Card from './Components/Card.vue'
import CardForm from './Components/CardForm.vue'

const {state, commit} = useStore()

const route = useRoute();

const cards = ref([])

const isPasskeyChecked = computed(() => !!state.auth.credentials?.id)

const fetchCards = async () => {
  cards.value = await getAccountCards(route.params.id)
}

const showCredentials = async (cardId) => {
  const card = cards.value.find(card => card.id === cardId)

  try {
    if (!isPasskeyChecked.value) {
      const credentials = await checkPasskey();

      commit('auth/setCredentials', credentials)
    }

    const cardDetails = await getAccountCard(cardId);

    for (const [key, value] of Object.entries(cardDetails)) {
      card[key] = value
    }
  } catch (error) {
    alert(error.error.response.data.message ?? 'Something went wrong');
  }
}

const saveCard = async (data) => {
  try {
    const expirationDate = data.ccExp.split('-')

    await saveAccountCard({
      name: data.ccName,
      card_number: data.ccNumber,
      cvv: data.ccCsc,
      type: data.ccType,
      brand: data.ccBrand,
      expiration_year: expirationDate[0],
      expiration_month: expirationDate[1],
      account_id: route.params.id,
    })

    await fetchCards()
  } catch (error) {
    alert(error.error.response.data.message ?? 'Something went wrong');
  }
}

const deleteCard = async (cardId) => {
  try {
    await deleteAccountCard(cardId)

    await fetchCards()
  } catch (error) {
    alert(error.error.response.data.message ?? 'Something went wrong');
  }
}

onMounted(() => {
  fetchCards()
})
</script>

<template>
  <div>
    <div class="mb-3 d-flex gap-2 align-items-center justify-content-between">
      <p class="display-6 mb-0">Cards</p>

      <button class="btn btn-outline-danger" @click="fetchCards">
        <i class="fa-fw fas fa-refresh"></i>
      </button>
    </div>

    <div class="d-flex flex-column gap-3">
      <div class="box bg-main">
        <button class="btn btn-dark w-100" data-bs-target="#cardForm" data-bs-toggle="collapse">
          Add New Card
        </button>
      </div>

      <div class="collapse" id="cardForm">
        <div class="box bg-main d-flex flex-column gap-3">
          <CardForm
              @saveCard="data => saveCard(data)"
          />
        </div>
      </div>

      <div class="row g-3">
        <template v-for="card in cards">
          <Card
              :card="card"
              @showCredentials="cardId => showCredentials(cardId)"
              @deleteCard="cardId => deleteCard(cardId)"
          />
        </template>
      </div>
    </div>
  </div>
</template>