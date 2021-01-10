import {
  dataFetchContextType,
  initialDataFetchContext,
} from "../contexts/dataFetch";

export enum DataFetchActionType {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_DONE = "FETCH_DONE",
  DELET_MESSAGE = "DELETE_MESSAGE",
}

export interface DataFetchAction {
  type: DataFetchActionType;
  payload: dataFetchContextType;
}

export const DataFetchReducer = (
  state: dataFetchContextType = initialDataFetchContext,
  action: DataFetchAction
) => {
  switch (action.type) {
    case DataFetchActionType.FETCH_INIT: {
      return { ...action.payload } as dataFetchContextType;
    }
    case DataFetchActionType.FETCH_SUCCESS: {
      return { ...action.payload } as dataFetchContextType;
    }
    case DataFetchActionType.FETCH_ERROR: {
      return { ...action.payload } as dataFetchContextType;
    }
    case DataFetchActionType.FETCH_DONE: {
      return { ...action.payload } as dataFetchContextType;
    }
    case DataFetchActionType.DELET_MESSAGE: {
      return { ...action.payload } as dataFetchContextType;
    }
    default: {
      return state;
    }
  }
};
