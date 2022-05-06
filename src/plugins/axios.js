import axios from 'axios'
import store from "@/plugins/store";

export const baseURL = '/api'

const instance = axios.create({
  baseURL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const username = store.state.username;
    if (username) {
      config.headers.Authorization = username;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

export default instance
