<template>
  <nav class="navbar navbar-expand-lg bg-body mb-3">
    <div class="container-xxl">
      <a
        class="navbar-brand d-flex gap-3 align-items-center"
        href="#"
        @click.prevent="router.push('/')"
      >
        Home
        <div v-if="loading.length" class="d-flex gap-2 align-items-center">
          <span class="badge bg-dark" v-if="loading.length > 1">
            {{ loading.length }}
          </span>

          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </a>

      <button
        class="navbar-toggler bg-main"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="fas fa-bars"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <template v-for="(link, index) in links" :key="index">
            <template
              v-if="link.roles?.length ? havePrivilege(link.roles) : true"
            >
              <li class="nav-item">
                <span
                  role="button"
                  class="nav-link"
                  aria-current="page"
                  @click="goto(link.routeName)"
                >
                  <span class="me-1" v-html="link.icon"></span>
                  <span>{{ link.name }}</span>
                </span>
              </li>
            </template>
          </template>

          <li class="nav-item">
            <span
              role="button"
              class="nav-link"
              aria-current="page"
              @click="dispatch('auth/logout')"
            >
              <span class="me-1">
                <i class="icon fas fa-sign-out-alt"></i>
              </span>
              <span>Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>