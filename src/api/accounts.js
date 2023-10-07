import {route, httpRequest} from "../helpers";

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
  const routeObject = id ? route("accounts.update", {params: {id}}) : route("accounts.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const deleteAccount = async (id) => {
  return await httpRequest(route("accounts.delete", {params: {id}}));
};

export const pinAccount = async (id) => {
  return await httpRequest(route("accounts.pin", {params: {id}}));
};

export const getAccountTypes = async () => {
  return await httpRequest(route("accounts.types.index"));
}

export const saveAccountType = async (data, id) => {
  const routeObject = route("accounts.types.save", {params: {id}})

  return await httpRequest(routeObject, {
    data,
  });
}

export const deleteAccountType = async (id) => {
  return await httpRequest(route("accounts.types.delete", {params: {id}}));
}