import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { axiosPrivate } from "../service/axios.service";
import useRefreshToken from "./use-refresh-token";
import { useEffect } from "react";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = Cookie.get("token");

  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  /**
   * This uses as a flag if a request is sent for the first time or not.
   * Prevents from the interceptors to loop.
   */
  let sent = false;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      onRequest,
      onRequestError
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      onResponse,
      async (error: AxiosError): Promise<AxiosError> => {
        if (!error.config) {
          throw new Error("Config must be existing...");
        }

        const previousRequest = error.config;

        if (error.response?.status === 403 && !sent) {
          sent = true;
          const newToken = await refresh();
          Cookies.set("token", newToken);

          previousRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(previousRequest!);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
