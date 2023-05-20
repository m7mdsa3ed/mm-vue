<template>
  <div class="d-flex gap-3 align-items-center justify-content-start">
    <template v-for="provider in loginProviders" :key="provider">
      <button type="button" class="btn btn-sm btn-dark" @click="login(provider)">
        <i class="icon fa-fw" :class="getProviderIcon(provider)"></i>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { oauthLogin } from "../../../api/authentication";

export default {
  data() {
    return {
      providers: {}
    }
  },

  computed: {
    ...mapState({
      loginProviders: (state) => state.app.info?.services,
    }),
  },

  mounted() {
    this.addMessageListener();
  },

  methods: {
    async login(provider) {
      const { url } = await oauthLogin(provider);

      window.open(url, "blank");
    },

    handlePayload(payload) {
      this.$store.dispatch('auth/_login', payload).then(() => {
        this.$router.push({ name: "home" });
      })
    },

    addMessageListener() {
      window.addEventListener("message", (e) => {
        const { source, payload } = e.data || {};

        if (source === 'oauth-handler') {
          this.handlePayload(payload)
        }

      }, false);
    },

    getProviderIcon(provider) {
      return this.providers[provider]?.icon ?? `fab fa-${provider}`
    }
  },
};
</script>