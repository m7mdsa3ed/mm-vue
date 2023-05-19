<template>
  <div class="d-flex">
    <template v-for="provider in loginProviders" :key="provider">
      <button type="button" class="p-3 box bg-dark" @click="login(provider)">
        {{ provider }}
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { oauthLogin } from "../../../api/authentication";

export default {
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