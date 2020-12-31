import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export type AlertStatus = "error" | "success" | "warning" | "info";

interface MessageProps {
  status: AlertStatus;
  message: string;
  setMessage: React.Dispatch<
    React.SetStateAction<{
      status: AlertStatus;
      message: string;
    }>
  >;
}

export const Message = ({ status, message, setMessage }: MessageProps) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setMessage({ status: "success", message: "" })}
      />
    </Alert>
  );
};
