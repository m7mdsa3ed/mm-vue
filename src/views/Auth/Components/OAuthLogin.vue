<template>
  <div class="d-flex gap-3 align-items-center justify-content-start">
    <template v-for="provider in loginProviders" :key="provider">
      <button type="button" class="btn btn-sm btn-dark" @click="login(provider)">
        <i class="icon fa-fw" :class="`${providers[provider].icon}`"></i>
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
      providers: {
        github: {
          icon: "fab fa-github"
        }
      }
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
      // Get token and user

      // login
    },

    addMessageListener() {
      window.addEventListener("message", (e) => {
        const { source, payload } = e.data || {};

        if (source === 'oauth-handler') {
          this.handlePayload(payload)
        }

      }, false);
    },
  },
};
</script>