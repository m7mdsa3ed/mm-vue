import store from "../../store";

export default async ({ to, next }) => {
  if (!store.state.auth.user) {
    try {
      await store.dispatch("auth/getUser");
    } catch (error) {}
  }

  const isLoggedIn = !!store.state.auth.user;

  const authRequired = to.meta?.auth?.required ?? false;

  if (authRequired && !isLoggedIn) {
    return next({ name: "login" });
  }

  const authRoutes = ["login", "register"];

  if (isLoggedIn && authRoutes.includes(to.name)) {
    return next({ name: "home" });
  }

  return next();
}