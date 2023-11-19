import {route, httpRequest} from "../helpers";

export const getNotifications = async () => {
  return await httpRequest(route("notifications.all"));
};

export const createProcess = async (id) => {
  return await httpRequest(route("notifications.makeAsRead", {params: {id}}));

}
