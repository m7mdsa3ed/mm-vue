import axios from "axios";
import { route } from '../helpers'

const caller = async (method, url, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({ method, url, data });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getRoles = async () => {
  const r = route('roles');

  return await caller(r.method(), r.url());
};

export const saveRoles = async (data) => {
  const r = route('roles.save');

  return await caller(r.method(), r.url(), data);
}
