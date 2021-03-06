import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import RouterView from "@/components/RouterView";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "views-layout" */ "../views/Layout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "views-home" */ "../views/Home.vue"),
      },
      {
        path: "transactions",
        component: RouterView,
        children: [
          {
            path: "",
            name: "transactions",
            component: () =>
              import(
                /* webpackChunkName: "views-transactions-index" */ "../views/Transactions/Index.vue"
              ),
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
            component: () =>
              import(
                /* webpackChunkName: "views-accounts-index" */ "../views/Accounts/Index.vue"
              ),
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
            component: () =>
              import(
                /* webpackChunkName: "views-categories-Index" */ "../views/Categories/Index.vue"
              ),
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
            component: () =>
              import(
                /* webpackChunkName: "views-tags-index" */ "../views/Tags/Index.vue"
              ),
          },
        ],
      },
      {
        path: "subscriptions",
        component: RouterView,
        children: [
          {
            path: "",
            name: "subscriptions",
            component: () =>
              import(
                /* webpackChunkName: "views-subscriptions-index" */ "../views/Subscriptions/Index.vue"
              ),
          },
        ],
      },
      {
        path: "profile",
        name: "profile",
        component: () =>
          import(
            /* webpackChunkName: "views-profile" */ "../views/Profile.vue"
          ),
      },
      {
        path: "/backup",
        name: "backup",
        component: () =>
          import(
            /* webpackChunkName: "views-common-backup" */ "../views/Common/Backup.vue"
          ),
      },
    ],
  },
  {
    path: "/a",
    component: () =>
      import(
        /* webpackChunkName: "components-router" */ "../components/RouterView"
      ),
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
