import {route, httpRequest} from "../helpers";

export const getBudgets = async (url, filter) => {
  const routeObject = route("budgets.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveBudget = async (data, id) => {
  const routeObject = id
    ? route("budgets.update", {params: {id}})
    : route("budgets.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const deleteBudget = async (id) => {
  return await httpRequest(route("budgets.delete", {params: {id}}));
};

export const getAverageAmountForBudget = async (data) => {
  const routeObject = route("budgets.averageAmount");

  return await httpRequest(routeObject, {
    data,
  });
}