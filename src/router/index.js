import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import authentication from "./middlewares/authentication";
import roles from "./middlewares/roles";
import logger from "./middlewares/logger";
import store from "../store";

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    meta: {
      middleware: [authentication, logger],
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/Home/Home.vue"),
      },
      {
        path: "transactions",
        component: () => import('../components/RouterView.vue'),
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
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "accounts",
            component: () => import("../views/Accounts/Index.vue"),
          },
          {
            path: "types",
            name: "account-types",
            component: () => import("../views/Accounts/Types/AccountTypes.vue"),
          },
          {
            path: ":id/cards",
            name: "account-cards",
            component: () => import("../views/Accounts/Cards/AccountCards.vue"),
          }
        ],
      },
      {
        path: "categories",
        component: () => import('../components/RouterView.vue'),
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
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "tags",
            component: () => import("../views/Tags/Index.vue"),
          },
        ],
      },
      {
        path: "budget",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "budget",
            component: () => import("../views/Budgets/Index.vue"),
          },
        ],
      },
      {
        path: "subscriptions",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "subscriptions",
            component: () => import("../views/Subscriptions/Index.vue"),
          },
        ],
      },
      {
        path: "profile",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "profile",
            component: () => import("../views/Profile/Index.vue"),
          },
        ],
      },
      {
        path: 'contacts',
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: '',
            name: 'contacts',
            component: () => import('../views/Contacts/Index.vue'),
          },
        ],
      },
      {
        path: "settings",
        component: () => import('../components/RouterView.vue'),
        meta: {
          middleware: [roles("manager")],
        },
        children: [
          {
            path: "",
            name: "settings",
            component: () => import("../views/Settings/Index.vue"),
          },
        ],
      },
      {
        path: "notifications",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "notifications",
            component: () => import("../views/Notifications/Index.vue"),
          },
        ],
      },
      {
        path: "plans",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "plans",
            component: () => import("../views/Plans/Index.vue"),
          },
        ],
      },
      {
        path: "t",
        component: () => import('../components/RouterView.vue'),
        children: [
          {
            path: "",
            name: "plans",
            component: () => import("../views/Testing.vue"),
          },
        ],
      },
      {
        path: "error/:code",
        name: "error",
        component: () => import("../views/Error.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../components/RouterView.vue"),
    children: [...auth],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
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

function middlewarePipeline(middlewareParams, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return middlewareParams.next;
  }

  return (...parameters) => {
    if (parameters.length) {
      return parameters;
    }

    const nextPipeline = middlewarePipeline(
      middlewareParams,
      middleware,
      index + 1
    );

    nextMiddleware({ ...middlewareParams, next: nextPipeline });
  };
}

router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.matched
    .map((route) => route.meta.middleware)
    .filter((middleware) => middleware)
    .flat(1);

  if (middleware.length) {
    const middlewareParams = {
      to,
      from,
      store,
      router,
      next,
    };

    const ctx = await middleware[0]({
      ...middlewareParams,
      next: middlewarePipeline(middlewareParams, middleware, 1),
    });

    if (Array.isArray(ctx)) {
      return next(...ctx);
    }

    return ctx;
  }

  return next();
});

export default router;
