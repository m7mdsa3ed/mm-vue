<template>
  <div class="container-xxl">
    <div class="row vh-100 justify-content-center align-items-center">
      <div class="col-12 col-lg-6">
        <div class="bg-main box my-3">
          <p class="fs-4 fw-light">Signup</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Full Name"
                class="form-control mb-3"
              />
              <label> Full Name </label>
            </div>
            <hr />
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Email"
                class="form-control mb-3"
              />
              <label> Email </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                placeholder="Password"
                class="form-control mb-3"
              />
              <label> Password </label>
            </div>

            <button class="btn btn-dark mb-3 w-100">Signup</button>
            <p
              class="mb-0 small"
              role="button"
              @click="$router.push({ name: 'login' })"
            >
              <i class="icon icon-bg-dark fas fa-arrow-left fa-sm me-2"></i>
              Already have an account?
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
