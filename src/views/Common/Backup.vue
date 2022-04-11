<template>
  <div class="d-flex flex-column gap-3">
    <div
      v-for="file in list"
      :key="file.name"
      class="
        d-flex
        justify-content-between
        align-content-center
        box
        bg-white
        shadow-sm
      "
    >
      <p class="lead mb-0">
        {{ file.name.replace("Laravel/", "") }}
      </p>

      <a :href="file.downloadLink" class="btn btn-sm btn-dark">
        <i class="fas fa-download"></i>
        Download
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },

  mounted() {
    this.getbackupList();
  },

  methods: {
    getbackupList() {
      this.$http.get("h/backup").then((res) => {
        this.list = res.data.data;
      });
    },
  },
};
</script>