import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/a",
    component: () => import("../components/RouterView"),
    children: [...auth]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
