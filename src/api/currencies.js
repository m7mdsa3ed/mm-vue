import { route, httpRequest } from "../helpers";

export const getCurrencies = async () => {
  return await httpRequest(route("currencies.index"));
};

export const updateCurrency = async (data) => {
  const routeObject = route("currencies.update", { params: { id: data.id } });

  return await httpRequest(routeObject, {
    params: data,
  });
};
