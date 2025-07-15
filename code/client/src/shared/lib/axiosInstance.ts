import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(newToken: string) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken && config.headers && !config.headers.authorization) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const prevRequest = error.config;

    if (error.response?.status === 403 && prevRequest) {
      try {
        const { data } = await axiosInstance.get("/auth/refreshTokens");
        if (
          data &&
          typeof data === "object" &&
          "data" in data &&
          data.data &&
          typeof data.data === "object" &&
          "accessToken" in data.data
        ) {
          setAccessToken(data.data.accessToken as string);
        }

        (prevRequest as InternalAxiosRequestConfig & { sent?: boolean }).sent =
          true;
        if (prevRequest.headers) {
          prevRequest.headers.authorization = `Bearer ${accessToken}`;
        }

        return axiosInstance(prevRequest);
      } catch (refreshError) {
        setAccessToken("");
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
