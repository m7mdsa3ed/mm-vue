import { route, httpRequest } from "../helpers";

export const getAccounts = async (url, filter) => {
  const routeObject = route("accounts.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveAccount = async (data, id) => {
  const routeObject = id
    ? route("accounts.update", { params: { id } })
    : route("accounts.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const deleteAccount = async (id) => {
  return await httpRequest(route("accounts.delete", { params: { id } }));
};
