<template>
  <div class="d-flex flex-column gap-3">
    <button class="btn btn-danger" @click="deploy">
      <i class="fas fa-fw fa-bars-progress"></i> Deploy
    </button>

    <pre
      class="white-space-pre-wrap bg-black box"
      v-if="output"
      v-html="output"
    ></pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: "",
    };
  },

  methods: {
    async deploy() {
      let lastResponseLength = false;

      this.output = "";

      await this.$store.dispatch("app/deploy", {
        requestConfig: {
          onDownloadProgress: (progressEvent) => {
            const response = progressEvent.event.currentTarget.response;

            let progressResponse = lastResponseLength
              ? response.substring(lastResponseLength)
              : response;

            lastResponseLength = response.length;

            try {
              const progressResponseAsJSON = JSON.parse(progressResponse);

              progressResponse = JSON.stringify(progressResponseAsJSON, null, 4);
            } catch (err) {}

            this.output += progressResponse;
          },
        },
      });
    },
  },
};
</script>
