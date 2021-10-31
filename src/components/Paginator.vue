<template>
  <ul class="pagination mb-0">
    <li
      v-for="link in cLinks"
      :key="link"
      class="page-item"
      :class="{ disabled: link.url === null, active: link.active }"
    >
      <a
        href=""
        class="page-link text-dark"
        v-html="link.label"
        @click.prevent="$emit('change', link.url)"
      >
      </a>
    </li>
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
              label: `<i class="fas fa-chevron-left fa-sm"></i>`,
              url: this.data.prev_page_url,
            },
            {
              active: false,
              label: `<i class="fas fa-chevron-right fa-sm"></i>`,
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