<template>
  <div class="container-lg">
    <div class="row g-4 mb-4">
      <!-- Balance Widget -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Balance</p>
          <p class="h3 fw-light">{{ $fn.money(52654) }}</p>
          <div class="d-flex flex-wrap gap-3">
            <div class="d-flex align-items-center" style="font-size: 12px">
              <i
                class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"
              ></i>
              <span class="fw-bold"> + {{ $fn.money(52654) }} </span>
            </div>
            <div class="d-flex align-items-center" style="font-size: 12px">
              <i
                class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"
              ></i>
              <span class="fw-bold"> - {{ $fn.money(52654) }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="lead fw-light">Balance</p>
          <p class="h3 fw-light">{{ $fn.money(52654) }}</p>
          <div class="d-flex flex-wrap gap-3">
            <div class="d-flex align-items-center" style="font-size: 12px">
              <i
                class="icon icon-bg-success fas fa-angle-double-up fa-sm me-2"
              ></i>
              <span class="fw-bold"> + {{ $fn.money(52654) }} </span>
            </div>
            <div class="d-flex align-items-center" style="font-size: 12px">
              <i
                class="icon icon-bg-danger fas fa-angle-double-down fa-sm me-2"
              ></i>
              <span class="fw-bold"> - {{ $fn.money(52654) }} </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction  -->
      <div class="col-12 col-lg-8">
        <div class="bg-main box">
          <p class="fs-4 fw-light mb-0">Transactions</p>

          <table class="table align-middle table-borderless mb-3">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="i in 10" :key="i">
                <td>
                  <span class="small">
                    <i class="icon icon-bg-success fas fa-arrow-up fa-sm"></i>
                  </span>
                </td>
                <td>AI Salary</td>
                <td>{{ $fn.money(5000) }}</td>
                <td>2021-10-01</td>
                <td width="1">
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-dark"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fa-fw fas fa-ellipsis-v"></i>
                    </button>

                    <ul
                      class="
                        dropdown-menu dropdown-menu-end dropdown-menu-custom
                        mx-0
                      "
                      style="width: 220px"
                    >
                      <li>
                        <a class="dropdown-item">
                          <span> Details </span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item">
                          <span> View </span>
                        </a>
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <a class="dropdown-item text-danger">
                          <span> Delete </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-dark">
              <i class="icon fas fa-plus"></i>
            </button>
            <nav>
              <ul class="pagination mb-0 justify-content-end">
                <li class="page-item">
                  <a class="page-link link-dark" href="#" aria-label="Previous">
                    <i class="fas fa-chevron-left fa-sm"></i>
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link link-dark" href="#" aria-label="Next">
                    <i class="fas fa-chevron-right fa-sm"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <!-- Accounts -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Accounts</p>

          <table class="table table-borderless mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Cash</td>
                <td>{{ $fn.money(5000) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Categories -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Categories</p>

          <table class="table table-borderless mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Foods</td>
                <td>{{ $fn.money(5000) }}</td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>{{ $fn.money(5000) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Creating Transaction -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Transaction</p>
          <form>
            <div
              class="btn-group mb-3 w-100"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-dark" for="btnradio1">Income</label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label class="btn btn-outline-dark" for="btnradio2"
                >Outcome</label
              >
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                placeholder="Amount"
                class="form-control mb-3"
              />
              <label> Amount</label>
            </div>
            <div class="form-floating mb-3">
              <textarea
                class="form-control mb-3"
                placeholder="Description"
                style="height: 100px"
              ></textarea>
              <label>Description</label>
            </div>
            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label for="floatingSelect">Category</label>
            </div>

            <div class="form-floating mb-3">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="1">Cash</option>
              </select>
              <label for="floatingSelect">Account</label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>

      <!-- Creating Account -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Account</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Account Name"
                class="form-control mb-3"
              />
              <label> Account Name </label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>

      <!-- Creating Category -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Category</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Category Name"
                class="form-control mb-3"
              />
              <label> Category Name </label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>

      <!-- Login -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Login</p>
          <form>
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

            <button class="btn btn-dark mb-2 w-100">Login</button>
            <p class="text-danger small">Forget Password</p>
            <p class="mb-0 small" role="button">
              <i class="icon icon-bg-dark fas fa-arrow-right fa-sm me-2"></i>
              Create your account
            </p>
          </form>
        </div>
      </div>

      <!-- Register -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
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
            <p class="mb-0 small" role="button">
              <i class="icon icon-bg-dark fas fa-arrow-left fa-sm me-2"></i>
              Already have an account?
            </p>
          </form>
        </div>
      </div>

      <!-- Reset Password -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Forget Password</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Email"
                class="form-control mb-3"
              />
              <label> Email </label>
            </div>

            <button class="btn btn-dark w-100">Reset</button>
          </form>
        </div>
      </div>

      <!-- Set New  Password -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Set New Password</p>
          <form>
            <div class="form-floating mb-3">
              <input
                type="text"
                placeholder="Password"
                class="form-control mb-3"
              />
              <label> Password </label>
            </div>

            <button class="btn btn-dark w-100">Save</button>
          </form>
        </div>
      </div>

      <!-- Modal  -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <button
            type="button"
            class="btn btn-dark w-100"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          >
            <div class="modal-content">
              <div class="bg-main box">
                <div class="d-flex justify-content-between">
                  <p class="fs-4 fw-light">Login</p>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form>
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

                  <button class="btn btn-dark mb-2 w-100">Login</button>
                  <p class="text-danger small">Forget Password</p>
                  <p class="mb-0 small" role="button">
                    <span
                      class="
                        alert alert-success
                        p-0
                        px-2
                        m-0
                        d-inline-block
                        me-2
                      "
                    >
                      <i class="fas fa-arrow-right fa-sm"></i>
                    </span>
                    Create your account
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Details -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Transaction Details</p>
          <div>
            <div class="mb-2">
              <span class="text-muted small"> Type </span>
              <p>Income</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Amount </span>
              <p>{{ $fn.money(1500) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Desciption </span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                omnis reprehenderit corrupti. Modi, laboriosam quae dicta
                laudantium rerum culpa! Nostrum id corrupti sapiente rem laborum
                nesciunt dolore ratione, omnis molestiae!
              </p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Date </span>
              <p>2021-10-01</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Time of Transaction </span>
              <p class="mb-0">12:01 PM</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Details -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Account Details</p>
          <div>
            <div class="mb-2">
              <span class="text-muted small"> Name </span>
              <p>Cash</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Balance </span>
              <p>{{ $fn.money(1500) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Income Rate </span>
              <p class="text-success">+ {{ $fn.money(1500) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Outcome Rate </span>
              <p class="text-danger mb-0">- {{ $fn.money(1500) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Details -->
      <div class="col-12 col-lg-4">
        <div class="bg-main box">
          <p class="fs-4 fw-light">Category Details</p>
          <div>
            <div class="mb-2">
              <span class="text-muted small"> Name </span>
              <p>Cash</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Balance </span>
              <p>{{ $fn.money(1500) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Transactions Count </span>
              <p>110</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Income Rate </span>
              <p class="text-success">+ {{ $fn.money(1500) }}</p>
            </div>

            <div class="mb-2">
              <span class="text-muted small"> Outcome Rate </span>
              <p class="text-danger mb-0">- {{ $fn.money(1500) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="col-12">
        <div class="bg-main box d-flex gap-3">
          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-pen"> </i> Save
          </button>

          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-sign-in-alt"> </i> Login
          </button>

          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-file-signature"> </i> Signup
          </button>

          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-sign-out-alt"> </i> Logout
          </button>

          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-redo"> </i> Reset
          </button>

          <button class="btn btn-dark btn-sm">
            <i class="icon fas fa-info"> </i> Details
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-4">
        <ul class="list-unstyled d-flex flex-column gap-3 c-sidebar">
          <li>
            <i class="icon fas fa-home"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Home </span>
          </li>
          <li>
            <i class="icon fas fa-dollar-sign"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Transactions </span>
          </li>
          <li>
            <i class="icon fas fa-file-alt"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Accounts </span>
          </li>
          <li>
            <i class="icon fas fa-th"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Categories </span>
          </li>
          <li></li>
          <li>
            <i class="icon fas fa-user"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Profile </span>
          </li>
          <li>
            <i class="icon fas fa-cog"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Settings </span>
          </li>
          <li></li>
          <li>
            <i class="icon fas fa-sign-out-alt"></i>
            <span class="ms-2 d-none d-lg-inline-block"> Logout </span>
          </li>
        </ul>
      </div>

      <div class="col-12 col-lg-4">
        <div>
          <ul
            class="dropdown-menu dropdown-menu-custom show mx-0"
            style="width: 220px"
          >
            <li>
              <a class="dropdown-item active">
                <span> Action </span>
              </a>
            </li>
            <li>
              <a class="dropdown-item">
                <span> Another action </span>
              </a>
            </li>
            <li>
              <a class="dropdown-item">
                <span> Something else here </span>
              </a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item">
                <span> Separated link </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
