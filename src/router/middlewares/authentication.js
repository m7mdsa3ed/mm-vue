export default async ({ to, next, store }) => {
  if (!store.state.auth.user) {
    try {
      await store.dispatch("auth/getUser");
    } catch (error) {}
  }

  const isLoggedIn = !!store.state.auth.user;

  if (!isLoggedIn) {
    return next({ name: "login" });
  }

  const authRoutes = ["login", "register"];

  if (isLoggedIn && authRoutes.includes(to.name)) {
    return next({ name: "home" });
  }

  return next();
}