export default (roles) =>
  async ({ next, store }) => {
    const user = await store.getters["auth/user"];

    const userRoles = user.roles.map((role) => role.name);

    const matchedRoles = userRoles.filter((role) => roles.includes(role));

    if (!matchedRoles.length) {
      return next({ name: "error", params: { code: 401 } });
    }

    return next();
  };
