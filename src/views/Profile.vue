<template>
  <div>
    <div class="mb-3">
      <p class="display-6">Profile</p>
    </div>

    <div class="box bg-main">
      {{ $store.state.auth.user }}
    </div>

    <template v-if="$store.state.auth.user?.id == 1">
      <hr />

      <div class="box bg-main">
        <button
          class="btn btn-dark"
          type="button"
          @click="$router.push({ name: 'backup' })"
        >
          Database Backup
        </button>
      </div>
    </template>
  </div>
</template>