import { route, httpRequest } from '../helpers'

export const getRoles = async () => {
  return await httpRequest(route('roles.index'));
};

export const saveRoles = async (data) => {
  return await httpRequest(route('roles.save'), {
    data: data
  });
}
