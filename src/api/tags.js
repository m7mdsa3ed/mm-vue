import { route, httpRequest } from "../helpers";

export const getTags = async (url, filter) => {
  const routeObject = route("tags.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveTag = async (data, id) => {
  const routeObject = id
    ? route("tags.update", { params: { id } })
    : route("tags.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const deleteTag = async (id) => {
  return await httpRequest(route("tags.delete", { params: { id } }));
};
