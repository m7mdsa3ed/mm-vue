import { createRouter, createWebHistory } from "vue-router";
import RouterView from "../components/RouterView.vue";
import auth from "./auth";
import authentication from "./middlewares/authentication";
import roles from "./middlewares/roles";

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    meta: {
      middleware: [authentication],
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
      {
        path: "settings",
        component: RouterView,
        meta: {
          middleware: [
            roles(['manager'])
          ],
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
        path: "error/:code",
        name: 'error',
        component: () => import("../views/Error.vue"),
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

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
