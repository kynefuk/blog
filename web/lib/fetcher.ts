import useSWR, { ConfigInterface, responseInterface } from "swr";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { BASE_PATH } from "../openapi/base";

const AxiosClient = axios.create({
  baseURL: BASE_PATH,
});

export type RequestType = AxiosRequestConfig | null;

// インターフェース内部でジェネリクスを使いたいのでReturn<Data, Error>と書いている
// responseInterfaceから"isValidating ~を抽出
interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "revalidate" | "error" | "mutate"
  > {
  response: AxiosResponse<Data> | undefined;
}

// <ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>から''を除外した型
export type Config<Data = unknown, Error = unknown> = Omit<
  ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
  ""
>;

export const useRequest = <Data = unknown, Error = unknown>(
  request: RequestType,
  config: Config<Data, Error> = {}
): Return<Data, Error> => {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  >(request && JSON.stringify(request), () => AxiosClient(request!), config);
  return { response, error, isValidating, revalidate, mutate };
};
