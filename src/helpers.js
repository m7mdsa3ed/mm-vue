import routes from "./api/routes.json";
import axios from "axios";
import { compile } from "path-to-regexp";

export const money = (number, suffix = "EGP") =>
  `${Number(number ?? 0)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${suffix}`;

export const JSON2FD = (json) => {
  const fd = new FormData();

  for (let key in json) {
    let value = json[key];

    if (value) {
      if (Array.isArray(value)) {
        value = Array.from(value);

        key = `${key}[]`;

        for (const item of value) {
          fd.append(key, item);
        }
      } else {
        fd.append(key, value);
      }
    }
  }

  return fd;
};

export const route = (name, configs) => {
  const { params, url } = configs || {};

  const route = routes[name] ?? name.split(".").reduce((a, c) => a[c], routes);

  return {
    url: () => url ?? compile(route.url ?? route)(params),
    method: () => route.method ?? "GET",
  };
};

export const httpRequest = async (route, configs) => {
  const response = await axios({
    method: route.method(),
    url: route.url(),
    ...configs,
  });

  return response.data;
};

export const errorParser = (error) => {
  return {
    error,
    isNetworkError: !(error.response || error.request),
    isServerError: !!(error.response || error.request),
    validationErrors: function() {
      if (error.response) {
        const { data } = error.response;

        if (data.errors || []) {
          return data.errors;
        }
      }

      return [];
    },
    toString: function() {
      const errors = this.validationErrors()

      const errorMessages = [];

      for(const key in errors) {
        errorMessages.push(...errors[key])
      }

      return errorMessages.join(', ') ?? this.error.error.message;
    }
  };
};

const findIndexByKey = (array, row, key) => {
  return array.findIndex(
    (r) => r[key] == row[key]
  )
}

export const mergeRow = ({ row, target, key }) => {
  const index = findIndexByKey(target, row, key);

  index != -1 ? (target[index] = row) : target.unshift(row);
};

export const removeRow = ({ row, target, key }) => {
  const index = findIndexByKey(target, row, key);

  console.log({ index });

  if (index != -1) {
    target.splice(index, 1);
  }
};
