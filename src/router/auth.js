import store from "../store";

export default [
  {
    path: "",
    redirect: { name: 'login' },
  },
  {
    path: "login",
    name: "login",
    meta: {
      middleware: [
        
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
    path: "reset",
    name: "reset",
    component: () => import("../views/Auth/Reset.vue"),
  },
];
