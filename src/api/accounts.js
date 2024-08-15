import {route, httpRequest} from "../helpers";

export const getAccounts = async (url, filters) => {
  const routeObject = route("accounts.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filters,
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

export const getAccountSummary = async (id) => {
  return await httpRequest(route('accounts.summary', {params: {id}}))
}

export const deleteAccountType = async (id) => {
  return await httpRequest(route("accounts.types.delete", {params: {id}}));
}

export const getAccountCards = async (accountId) => {
  return await httpRequest(route("accounts.cards.index", {params: {id: accountId}}));
}

export const getAccountCard = async (id) => {
  return await httpRequest(route("accounts.cards.getOne", {params: {id}}), {
    passkeyProtected: true
  });
}

export const saveAccountCard = async (data, id) => {
  const routeObject = route("accounts.cards.save", {params: {id}})

  return await httpRequest(routeObject, {
    data,
  });
}

export const deleteAccountCard = async (id) => {
  return await httpRequest(route("accounts.cards.delete", {params: {id}}));
}