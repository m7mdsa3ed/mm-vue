export default [
  {
    path: "login",
    name: "login",
    component: () => import("../views/Auth/Login.vue")
  },
  {
    path: "register",
    name: "register",
    component: () => import("../views/Auth/Register.vue")
  },
  {
    path: "forget",
    name: "forget",
    component: () => import("../views/Auth/Forget.vue")
  },
  {
    path: "reset/:token",
    name: "reset",
    component: () => import("../views/Auth/Reset.vue")
  }
];
