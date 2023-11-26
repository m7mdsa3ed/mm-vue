import {route, httpRequest} from "../helpers";

export const getSubscriptions = async (url, filter) => {
  const routeObject = route("subscriptions.index", {
    url,
  });

  return await httpRequest(routeObject, {
    params: {
      ...filter,
    },
  });
};

export const saveSubscription = async (data, id) => {
  const routeObject = id
    ? route("subscriptions.update", {params: {id}})
    : route("subscriptions.create");

  return await httpRequest(routeObject, {
    data,
  });
};

export const renewSubscription = async (id) => {
  const routeObject = route("subscriptions.renew", {params: {id}});
  
  return await httpRequest(routeObject);
};

export const cancelSubscription = async (id) => {
  const routeObject = route("subscriptions.cancel", {params: {id}});
  
  return await httpRequest(routeObject);
}

export const deleteSubscription = async (id) => {
  return await httpRequest(route("subscriptions.delete", {params: {id}}));
};
