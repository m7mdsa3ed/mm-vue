import { route, httpRequest } from "../helpers";

export const getSettings = async (keys) => {
  return await httpRequest(route("settings.get"), {
    params: {
      keys,
    },
  });
};

export const saveSettings = async (key, value) => {
  return await httpRequest(route("settings.save", {}), {
    data: {
      key,
      value,
    },
  });
};

export const deploy = async (configs) => {
  return await httpRequest(route("settings.deploy"), configs);
};
