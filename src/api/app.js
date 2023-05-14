import { route, httpRequest } from "../helpers";

export const appInfo = async () => {
  const routeObject = route("app.info");

  return await httpRequest(routeObject);
};
