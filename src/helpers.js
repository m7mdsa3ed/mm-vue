import routes from "./api/routes.json";
import axios from "axios";
import { compile } from "path-to-regexp";
import router from "./router";
import CryptoJS from "crypto-js";

export const money = (number, suffix = "EGP") => {
  return `${Number(number ?? 0)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")} ${suffix}`;
};

export const removeSlashes = (string) => {
  return string.replace(/^\/|\/$/g, "");
};

export const isURL = (string) => {
  try {
    const url = new URL(string);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

export const parseRouteUrl = (url) => {
  if (typeof url == "object") {
    let { path, base } = url;

    if (!isURL(base)) {
      const { VITE_API_BASEURL } = import.meta.env;

      base = `${removeSlashes(VITE_API_BASEURL)}/${removeSlashes(base)}`;
    }

    return {
      path: removeSlashes(path),
      base: removeSlashes(base),
    };
  }

  return {
    path: url,
    base: null,
  };
};

export const route = (name, configs) => {
  const { params, url } = configs || {};

  const route = routes[name] ?? name.split(".").reduce((a, c) => a[c], routes);

  return {
    url: () => {
      let { path, base } = parseRouteUrl(route.url ?? route);

      path = compile(path)(params);

      return url ?? `${base ?? ""}/${path}`;
    },
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
    validationErrors: function () {
      if (error.response) {
        const { data } = error.response;

        if (data.errors || []) {
          return data.errors;
        }
      }

      return [];
    },
    toString: function () {
      const errors = this.validationErrors();

      const errorMessages = [];

      for (const key in errors) {
        errorMessages.push(...errors[key]);
      }

      return errorMessages.join(", ") ?? this.error.error.message;
    },
  };
};

const findIndexByKey = (array, row, key) => {
  return array.findIndex((r) => r[key] == row[key]);
};

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

export const getPath = (routeName) => {
  const routes = router.getRoutes().filter((route) => route.name == routeName);

  return routes[0]?.path;
};

export const url = (path) => {
  const { origin } = window.location;

  return `${origin}/${removeSlashes(path)}`;
};

export const ucfirst = (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export const notationToReadable = (notationString) => {
  return notationString
    .replace(".", " ")
    .toLowerCase()
    .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase());
};

export const generateIdempotentKey = (data) => {
  return CryptoJS.SHA256(data);
};

export const formDataToJson = (formData) => {
  return JSON.parse(JSON.stringify(Object.fromEntries(formData)));
}

export const formToJson = (formElement) => {
  const fd = new FormData(formElement)

  return formDataToJson(fd)
}

export const cloneObject = (object) => {
  return  Object.assign({}, object);
}