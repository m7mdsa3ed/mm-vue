<template>
  <div>
    <h1 class="display-3">
      {{ message }}
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [
        {
          code: 401,
          message: 'Unauthorized'
        },
        {
          code: 404,
          message: 'Not Found'
        },
      ]
    }
  },

  computed: {
    message() {
      const { code } = this.$route.params;

      if (code) {
        const codeIndex =  this.errors.findIndex(error => error.code == code)

        if (codeIndex != -1) {
          return this.errors[codeIndex].message;
        }
      }

      return ''
    }
  }
};
</script>