import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import {
  useDataFetchContext,
  dataFetchContextType,
} from "../../contexts/dataFetch";
import { DataFetchActionType } from "../../reducers/dataFetch";

export const Message = () => {
  const { status, message, dispatchDataFetch } = useDataFetchContext();
  return (
    <>
      {message ? (
        <Alert status={status}>
          <AlertIcon />
          <AlertTitle mr={2}>{status}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() =>
              dispatchDataFetch({
                type: DataFetchActionType.DELET_MESSAGE,
                payload: {
                  isLoading: false,
                  status: "success",
                  message: "",
                } as dataFetchContextType,
              })
            }
          />
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};
