import React, { useContext, useReducer } from "react";
import { DataFetchReducer, DataFetchAction } from "../reducers/dataFetch";

export interface dataFetchContextType {
  isLoading: boolean;
  status: "error" | "success" | "warning" | "info";
  message: string;
  dispatchDataFetch: React.Dispatch<DataFetchAction>;
}

export const initialDataFetchContext: dataFetchContextType = {
  isLoading: false,
  status: "success",
  message: "",
  dispatchDataFetch: () => {},
};

export const DataFetchContext = React.createContext<dataFetchContextType>(
  initialDataFetchContext
);

export const useDataFetchContext = () => {
  return useContext(DataFetchContext);
};

export const DataFetchProvider: React.FC = ({ children }) => {
  const [dataFetch, dispatchDataFetch] = useReducer(
    DataFetchReducer,
    initialDataFetchContext
  );

  return (
    <DataFetchContext.Provider
      value={{
        isLoading: dataFetch.isLoading,
        status: dataFetch.status,
        message: dataFetch.message,
        dispatchDataFetch: dispatchDataFetch,
      }}
    >
      {children}
    </DataFetchContext.Provider>
  );
};
