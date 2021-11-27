<template>
  <div class="box bg-main">
    <div class="d-flex justify-content-between">
      <h1 class="mb-0">
        Hi,
        <span class="text-danger">{{ $store.state.auth.user?.name }}</span>
      </h1>
      <div class="gap-3 d-flex align-items-center">
        <div class="small d-flex flex-column align-items-end d-none">
          <span role="button">
            Refresh
            <i class="ms-1 fas fa-sync"></i>
          </span>
          <span class="fst-italic">
            {{ $date().format("LLL") }}
          </span>
        </div>
        <button class="btn btn-danger btn-sm">
          <i class="icon fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>