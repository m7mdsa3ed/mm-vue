import { route, httpRequest } from "../helpers";

export const getTransactions = async (url, filter) => {
  const routeObject = route("transactions.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
    passkeyProtected: true
  });
};

export const saveTransaction = async (fd, id) => {
  const routeObject = id
    ? route("transactions.update", { params: { id } })
    : route("transactions.create");

  return await httpRequest(routeObject, {
    data: fd,
  });
};

export const deleteTransaction = async (id) => {
  const routeObject = route("transactions.delete", { params: { id } });

  return await httpRequest(routeObject);
};

export const getDescriptionSuggestions = async (categoryId) => {
  const routeObject = route("transactions.descriptionSuggestions");

  return await httpRequest(routeObject, {
    data: {
      category_id: categoryId,
    },
  });
}