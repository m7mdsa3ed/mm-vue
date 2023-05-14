import { route, httpRequest } from "../helpers";

export const forgetPassword = async (data) => {
  const routeObject = route("authentication.forgetPassword");

  return await httpRequest(routeObject, {
    data,
  });
};

export const resetPassword = async (data) => {
  const routeObject = route("authentication.resetPassword");

  return await httpRequest(routeObject, {
    data,
  });
};
