import store from '../../store'

export default (roles) => async ({ next }) => {
  const response = await store.dispatch("auth/getUser");

  const user = response.data

  const userRoles = user.roles.map((role) => role.name);

  const matchedRoles = userRoles.filter( role => roles.includes(role))

  if (!matchedRoles.length) {
    return next();
  }
  
  return next({ name: 'error', params: { code: 401 } })
}