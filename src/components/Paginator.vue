<template>
  <div class="w-100">
    <ul class="list-unstyled btn-group mb-0" v-if="!infinityLoad">
      <li
        v-for="link in cLinks"
        :key="link"
        class="btn btn-dark btn-sm"
        :class="{ disabled: link.url === null, active: link.active }"
        v-html="link.label"
        @click.prevent="$emit('change', {
        url: link.url,
        append: infinityLoad
      })"
      ></li>
    </ul>

    <button
      class="btn btn-dark w-100"
      @click="$emit('change', {
        url: data.next_page_url, 
        append: infinityLoad,
      })"
      :class="{ disabled: !data.next_page_url }"
    >
      <template v-if="loading ?? false">
        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </template>

      <template v-else>
        Load More
      </template>
    </button>
  </div>
</template>

<script>
export default {
  props: ["data", "links", 'infinityLoad', 'loading'],

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