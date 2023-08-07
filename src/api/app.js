import { route, httpRequest } from "../helpers";

export const appInfo = async () => {
  const routeObject = route("app.info");

  return await httpRequest(routeObject);
};

export const getEstimate = async (data) => {
  const routeObject = route("app.estimate");

  return await httpRequest(routeObject, {
    data,
  });
};

export const getBalanceInfo = async (params) => {
  const routeObject = route("app.balanceDetails");

  return await httpRequest(routeObject, {
    params,
  });
};
