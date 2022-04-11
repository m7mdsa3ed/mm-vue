import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import RouterView from "@/components/RouterView";

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
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
          {
            path: ":id/details",
            name: "accounts.detail",
            component: () => import("../views/Accounts/Details.vue"),
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
          {
            path: ":id/details",
            name: "categories.detail",
            component: () => import("../views/Categories/Details.vue"),
          },
        ],
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/Profile.vue"),
      },
      {
        path: "/backup",
        name: "backup",
        component: () => import("../views/Common/Backup.vue"),
      },
    ],
  },
  {
    path: "/a",
    component: () => import("../components/RouterView"),
    children: [...auth],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
