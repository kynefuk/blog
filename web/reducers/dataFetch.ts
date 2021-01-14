import {
  dataFetchContextType,
  initialDataFetchContext,
} from "../contexts/dataFetch";

export enum DataFetchActionType {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_DONE = "FETCH_DONE",
  ADD_MESSAGE = "ADD_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
}

type DataFetchPayload = Omit<dataFetchContextType, "dispatchDataFetch">;

export interface DataFetchAction {
  type: DataFetchActionType;
  payload?: Partial<DataFetchPayload>;
}

export const DataFetchReducer = (
  state: dataFetchContextType = initialDataFetchContext,
  action: DataFetchAction
): dataFetchContextType => {
  switch (action.type) {
    case DataFetchActionType.FETCH_INIT: {
      return { ...state, isLoading: true };
    }
    case DataFetchActionType.FETCH_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case DataFetchActionType.FETCH_ERROR: {
      return {
        ...state,
        status: "error",
        message: action.payload?.message as string,
      };
    }
    case DataFetchActionType.FETCH_DONE: {
      return { ...state, isLoading: false };
    }
    case DataFetchActionType.ADD_MESSAGE: {
      return {
        ...state,
        status: "info",
        message: action.payload?.message as string,
      };
    }
    case DataFetchActionType.DELETE_MESSAGE: {
      return { ...state, message: "" };
    }
    default: {
      return state;
    }
  }
};
