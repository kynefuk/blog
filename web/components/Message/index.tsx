import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { dataFetchContextType } from "../../contexts/dataFetch";
import { DataFetchActionType } from "../../reducers/dataFetch";
import { useRootContext } from "../../contexts/root";

export const Message = () => {
  const { dataFetch, dispatchDataFetch } = useRootContext();
  return (
    <>
      {dataFetch.message ? (
        <Alert status={dataFetch.status}>
          <AlertIcon />
          <AlertTitle mr={2}>{dataFetch.status}</AlertTitle>
          <AlertDescription>{dataFetch.message}</AlertDescription>
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
