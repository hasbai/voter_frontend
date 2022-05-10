import axios from "axios";
import store from "@/plugins/store";

export const baseURL = "/api";

const getToken = () => {
  return store.state.user ? store.state.user.name : "";
};

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: getToken(),
  },
});

instance.setToken = (token) => {
  instance.defaults.headers["Authorization"] = token;
};

export default instance;
