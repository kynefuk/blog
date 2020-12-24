import { useMemo } from "react";
import { DefaultApi } from "../openapi/api";

export const useApi = () => {
  const api = useMemo(() => {
    const options = {
      baseOptions: {
        timeout: 600000,
      },
    };
    return new DefaultApi(options);
  }, []);
  return { api };
};
