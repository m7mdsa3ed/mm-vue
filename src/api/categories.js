import { route, httpRequest } from "../helpers";

export const getCategories = async (url, filter) => {
  const routeObject = route("categories.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveCategory = async (fd, id) => {
  const routeObject = id
    ? route("categories.update", { params: { id } })
    : route("categories.create");

  return await httpRequest(routeObject, {
    data: fd,
  });
};

export const deleteCategory = async (id) => {
  return await httpRequest(route("categories.delete", { params: { id } }));
};

export const getCategoryDetails = async (categoryId) => {
  return await httpRequest(route("categories.details", { params: { id: categoryId } }));
}