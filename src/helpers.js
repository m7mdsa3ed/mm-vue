import routes from "./api/routes.json";
import axios from "axios";
import { compile } from "path-to-regexp";
import router from "./router";
import CryptoJS from "crypto-js";
import Cache from "./plugins/Cache/Cache";
import store from "./store/index.js";
import {GoogleGenerativeAI} from "@google/generative-ai";

export const money = (number, suffix) => {
  suffix ??= store.state?.auth?.user?.main_currency?.slug ?? 'EGP';
  
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
    body: function () {
      if (error.response) {
        const { data } = error.response;

        return data ?? {};
      }

      return;
    },

    getErrors: function () {
      const errorBody = this.body();

      let errors = {
        ...errorBody?.errors ?? {},
        message: errorBody?.message,
      }

      return errors
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

export const camelCaseToReadable = (camelCaseString) => {
  return camelCaseString
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export const generateIdempotentKey = (data) => {
  data ??= {};
  
  data.time = Date.now();

  return CryptoJS.SHA256(JSON.stringify(data));
};

export const formDataToJson = (formData) => {
  const update = (data, keys, value) => {
    if (keys.length === 0) {
      return value;
    }

    let key = keys.shift();

    if (!key) {
      data = data || [];

      if (Array.isArray(data)) {
        key = data.length;
      }
    }

    let index = +key;

    if (!isNaN(index)) {
      data = data || [];

      key = index;
    }

    data = data || {};

    let val = update(data[key], keys, value);

    data[key] = val;

    return data;
  };

  return Array.from(formData.entries()).reduce((data, [field, value]) => {
    let [_, prefix, keys] = field.match(/^([^\[]+)((?:\[[^\]]*\])*)/);

    if (keys) {
      keys = Array.from(keys.matchAll(/\[([^\]]*)\]/g), (m) => m[1]);

      value = update(data[prefix], keys, value);
    }

    data[prefix] = value;

    return data;
  }, {});
};

export const formToJson = (formElement) => {
  const fd = new FormData(formElement);

  return formDataToJson(fd);
};

export const cloneObject = (object) => {
  return Object.assign({}, object);
};

export const readableNumbers = (value) => {
  var length = (Math.abs(parseInt(value, 10)) + "").length,
    index = Math.ceil((length - 3) / 3),
    suffix = ["K", "M", "B", "T"];

  if (length < 4) return value;

  return (
    (value / Math.pow(1000, index)).toFixed(1).replace(/\\.0$/, "") +
    suffix[index - 1]
  );
};

export const cache = () => new Cache();

export const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export const ai = (prompt) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  
  return {
    generate: async (prompt) => {
      const results = await model.generateContent(prompt);

      const response = await results.response;

      return response.text();
    }
  }
}