import { createRouter, createWebHistory } from "vue-router";
import RouterView from "../components/RouterView.vue";
import auth from "./auth";
import store from '../store'

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    meta: {
      auth: {
        required: true
      }
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "transactions",
        component: RouterView,
        children: [
          {
            path: "",
            name: "transactions",
            component: () => import("../views/Transactions/Index.vue"),
          },
        ],
      },
      {
        path: "accounts",
        component: RouterView,
        children: [
          {
            path: "",
            name: "accounts",
            component: () => import("../views/Accounts/Index.vue"),
          },
        ],
      },
      {
        path: "categories",
        component: RouterView,
        children: [
          {
            path: "",
            name: "categories",
            component: () => import("../views/Categories/Index.vue"),
          },
        ],
      },
      {
        path: "tags",
        component: RouterView,
        children: [
          {
            path: "",
            name: "tags",
            component: () => import("../views/Tags/Index.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../components/RouterView.vue"),
    children: [...auth],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.auth.user) {
      try {
        await store.dispatch('auth/getUser')
      } catch (error) {}
  }

  const isLoggedIn = !! store.state.auth.user

  const authRequired = to.meta?.auth?.required ?? false

  if (authRequired && !isLoggedIn) {
    return next({ name: 'login' })
  }

  const authRoutes = [
    'login',
    'register'
  ];

  if (isLoggedIn && authRoutes.includes(to.name)) {
    return next({ name: "home" })
  }

  next()
})

export default router;
