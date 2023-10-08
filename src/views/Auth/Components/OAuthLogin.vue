<script setup>
import {useStore} from "vuex";
import {oauthLogin} from "../../../api/authentication";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const providers = [
  {
    name: 'github',
    title: 'Github',
    icon: 'fab fa-github',
    background: '#333',
    color: '#fff'
  },
  {
    name: 'x',
    title: '',
    icon: 'fab fa-x-twitter',
    background: '#000',
    color: '#fff'
  },
  {
    name: 'google',
    title: 'Google',
    icon: 'fab fa-google',
    background: '#4285f4',
    color: '#fff'
  },
  {
    name: 'facebook',
    title: 'Facebook',
    icon: 'fab fa-facebook',
    background: '#3b5998',
    color: '#fff'
  },
]

const {state, commit} = useStore();

const router = useRouter();

const message = ref("");

const loginProviders = computed(() => state.app.info?.services)

const supportedProviders = computed(() => {
  return providers.filter((provider) => {
    return loginProviders.value.includes(provider.name);
  });
});

const getProviderIcon = (provider) => {
  return providers[provider]?.icon ?? `fab fa-${provider}`;
}

const login = async (provider) => {
  const {url} = await oauthLogin(provider);

  window.open(url, "blank");
}

window.addEventListener("message", (e) => {
  const {source, payload} = e.data || {};

  if (source === "oauth-handler") {
    handlePayload(payload);
  }
}, false);

const handlePayload = (payload) => {
  const {user, token, message} = payload || {};

  if (message) {
    message.value = message
  }

  if (user && token) {
    commit("auth/setAuthentication", payload)

    router.push({name: "home"});
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-column gap-3 align-items-center justify-content-start">
      <template v-for="provider in supportedProviders" :key="provider">
        <button
          type="button"
          class="btn w-100"
          :style="{ background: provider.background, color: provider.color }"
          @click="login(provider.name)"
        >
          <i class="icon fa-fw" :class="provider.icon"></i>

          <span class="fw-bold">
            {{ provider.title }}
          </span>
        </button>
      </template>
    </div>

    <p class="alert alert-dark mt-4 mb-0" v-if="message">
      {{ message }}
    </p>
  </div>
</template>
