<script setup>

import {onMounted, ref} from "vue";
import {checkPasskey, createPasskey} from "../../../plugins/passkey";
import {getPasskeys, revokePasskey} from "../../../api/passkeys";
import {useStore} from "vuex";

const passkeys = ref([])

const { commit } = useStore()

const fetchPasskeys = async () => {
  passkeys.value = await getPasskeys()
}

const create = async () => {
  try {
    await createPasskey()

    await fetchPasskeys();

    alert('WE ARE IN, LET\'S KAM')
  } catch (_) {
    alert('TOO FAST')
  }
}

const validate = async () => {
  try {
    const credentials = await checkPasskey();

    commit('auth/setCredentials', credentials)
    
    alert('FUCK, YOU AGAIN, I KNOW YOU')
  } catch (error) {
    alert('FUCK OFF')
  }
}

const revoke = async (id) => {
  try {
    await revokePasskey(id)

    await fetchPasskeys()

    alert('OKAY, LET\'S GO')
  } catch (_) {
    console.log({_})
    alert('NAH')
  }
}

onMounted(() => {
  fetchPasskeys()
})

</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div class="d-flex flex-column gap-3">
      <template v-for="passkey in passkeys" :key="passkey.id">
        <div class="px-3 py-2 border rounded-2 d-flex justify-content-between align-items-center gap-3">
          <span>
            Passkey #{{ passkey.id }}
          </span>

          <button class="btn btn-sm border-0 btn-outline-danger" @click="revoke(passkey.id)">
            Revoke
          </button>
        </div>
      </template>
    </div>

    <button class="btn btn-dark" @click="create">
      Add New
    </button>

    <button class="btn btn-dark" @click="validate">
      Check
    </button>
  </div>
</template>