import axios from "axios";
import { setToken, unsetToken } from "../redux/authSlice";
import { store } from "../redux/store";
import { baseHttpDomain } from "../utils/baseDomain";

const _axios = axios.create({
  baseURL: baseHttpDomain,
});

_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const response = await _axios.post(
          `refresh-token`,
          {},
          { withCredentials: true }
        );
        const token = response.data.access_token;
        if (token) {
          store.dispatch(setToken(token));
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } else {
          store.dispatch(unsetToken());
          let toRedirectTo = window.location.pathname;
          window.location.replace(`/login?next=${toRedirectTo}`);
        }
      } else {
        store.dispatch(unsetToken());
        let toRedirectTo = window.location.pathname;
        window.location.replace(`/login?next=${toRedirectTo}`);
      }
    }
    return Promise.reject(error);
  }
);

export default _axios;
