<template>
  <div class="box bg-main">
    <h2>General Settings</h2>

    <template v-if="settings.length">
      <template v-for="setting in settings" :key="setting.key">
        <template v-if="setting.type_as_string == 'Bool'">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="setting.key"
              :checked="setting.value"
              @change="(e) => saveSettings(setting.key, e.target.checked)"
            />
            <label class="form-check-label" :for="setting.key">
              {{ setting.name }}
            </label>
          </div>
        </template>
      </template>
    </template>

    <hr />

    <DeployButton />
  </div>
</template>

<script>
import DeployButton from './DeployButton.vue'

export default {
  props: ["settings"],

  components: {
    DeployButton
  },

  methods: {
    async saveSettings(key, value) {
      await this.$store.dispatch("app/saveSettings", {
        key,
        value,
      });
    },
  }
};
</script>
