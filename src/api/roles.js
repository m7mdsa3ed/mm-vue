import { route, caller } from '../helpers'

export const getRoles = async () => {
  const r = route('roles');

  return await caller(r.method(), r.url());
};

export const saveRoles = async (data) => {
  const r = route('roles.save');

  return await caller(r.method(), r.url(), data);
}
