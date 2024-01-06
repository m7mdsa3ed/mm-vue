import { route, httpRequest } from "../helpers";

export const getContacts = async (url, filter) => {
  const routeObject = route("contacts.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveContact = async (data, id) => {
  const routeObject = id
    ? route("contacts.update", { params: { id } })
    : route("contacts.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const deleteContact = async (id) => {
  return await httpRequest(route("contacts.delete", { params: { id } }));
};
