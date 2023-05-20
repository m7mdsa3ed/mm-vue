<template>
  <div>
    <div class="d-flex gap-3 align-items-center justify-content-start">
      <template v-for="provider in loginProviders" :key="provider">
        <button
          type="button"
          class="btn btn-sm btn-dark"
          @click="login(provider)"
        >
          <i class="icon fa-fw" :class="getProviderIcon(provider)"></i>
        </button>
      </template>
    </div>

    <p class="alert alert-dark mt-4 mb-0" v-if="message">
      {{ message }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { oauthLogin } from "../../../api/authentication";

export default {
  data() {
    return {
      providers: {},
      message: null
    };
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
      const { user, token, message } = payload || {};

      if (message) {
        this.message = message
      }

      if (user && token) {
        this.$store.dispatch("auth/_login", payload).then(() => {
          this.$router.push({ name: "home" });
        });
      }
    },

    addMessageListener() {
      window.addEventListener(
        "message",
        (e) => {
          const { source, payload } = e.data || {};

          if (source === "oauth-handler") {
            this.handlePayload(payload);
          }
        },
        false
      );
    },

    getProviderIcon(provider) {
      return this.providers[provider]?.icon ?? `fab fa-${provider}`;
    },
  },
};
</script>