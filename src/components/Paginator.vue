<template>
  <ul class="list-unstyled btn-group mb-0">
    <li
      v-for="link in cLinks"
      :key="link"
      class="btn btn-dark btn-sm"
      :class="{ disabled: link.url === null, active: link.active }"
      v-html="link.label"
      @click.prevent="$emit('change', link.url)"
    ></li>
  </ul>
</template>

<script>
export default {
  props: ["data", "links"],

  computed: {
    cLinks() {
      if (this.links ?? false) {
        return this.links;
      } else if (this.data) {
        if (!this.data.links) {
          return [
            {
              active: false,
              label: `<i class="icon fas fa-chevron-left fa-sm"></i>`,
              url: this.data.prev_page_url,
            },
            {
              active: false,
              label: `<i class="icon fas fa-chevron-right fa-sm"></i>`,
              url: this.data.next_page_url,
            },
          ];
        }
        return this.data.links;
      }
    },
  },
};
</script>

s