import useSWR, { ConfigInterface, responseInterface } from "swr";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Method,
} from "axios";
import { BASE_PATH } from "../openapi/base";

const AxiosClient = axios.create({
  baseURL: BASE_PATH,
});

type AxiosAllowedMethod = Extract<Method, "get" | "GET">;
interface AxiosReqConfig extends Omit<AxiosRequestConfig, "method"> {
  method: AxiosAllowedMethod;
}

export type RequestType = AxiosReqConfig | null;

// インターフェース内部でジェネリクスを使いたいのでReturn<Data, Error>と書いている
// responseInterfaceから"isValidating ~を抽出
export interface Return<Data, Error>
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
  // dataをresponseという変数で受け取る
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  >(request && JSON.stringify(request), () => AxiosClient(request!), config);
  return { response, error, isValidating, revalidate, mutate };
};
