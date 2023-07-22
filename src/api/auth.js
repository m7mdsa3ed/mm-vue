import { route, httpRequest } from "../helpers";

export const login = async (data) => {
  const routeObject = route("authentication.login");

  return await httpRequest(routeObject, {
    data
  });
};

export const register = async (data) => {
  const routeObject = route("authentication.register");

  return await httpRequest(routeObject, {
    data
  });
}