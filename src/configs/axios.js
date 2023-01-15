import axios from "axios";
import store from "./../store";

const baseURL =
import.meta.env.MODE == "development"
  ? import.meta.env.VITE_API_BASEURL_LOCAL
  : import.meta.env.VITE_API_BASEURL;

// Axios configuration
axios.defaults.baseURL = baseURL + "/api";
axios.defaults.headers.Authorization = `Bearer ${store.state.auth.token}`;
