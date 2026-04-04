import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// export const postRequest = async (
//   uri: string,
//   data: unknown,
// ): Promise<AxiosResponse<unknown>> => {
//   return axios.post(uri, data);
// };

export const postRequest = async <T, D = unknown>(
  uri: string,
  data: D,
): Promise<T> => {
  const res = await axios.post<T>(uri, data);
  return res.data;
};

export const getUri = async (uri?: string): Promise<any[]> => {
  if (!uri) return [];

  const response = await axios.get(uri);
  // Expected API shape: { fleets: [...] }
  return (response.data?.fleets ?? []) as any[];
};

export const deleteUri = async (
  uri: string,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse<unknown>> => {
  return axios.delete(uri, config);
};
