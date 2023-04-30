import store from "../store";

export default [
  {
    path: "login",
    name: "login",
    meta: {
      middleware: [
        ({ next }) =>
          store.state.auth.token ? next({ name: "Home" }) : next(),
      ],
    },
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
  },
  {
    path: "forget",
    name: "forget",
    component: () => import("../views/Auth/Forget.vue"),
  },
  {
    path: "reset/:token",
    name: "reset",
    component: () => import("../views/Auth/Reset.vue"),
  },
];
