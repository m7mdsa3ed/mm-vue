import {route, httpRequest} from "../helpers";

export const getCreateArguments = async () => {
  return await httpRequest(route("passkeys.createArguments"));
};

export const getArguments = async () => {
  return await httpRequest(route('passkeys.getArguments'));
}

export const createProcess = async (data) => {
  return await httpRequest(route('passkeys.createProcess'), {
    data
  });
}

export const getProcess = async (data) => {
  return await httpRequest(route('passkeys.getProcess'), {
    data
  });
}

export const getPasskeys = async () => {
  return await httpRequest(route('passkeys.all'))
}

export const revokePasskey = async (id) => {
  return await httpRequest(route('passkeys.delete', {
    params: {
      id
    }
  }))
}