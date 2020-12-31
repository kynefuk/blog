import React, { createContext, useState, useContext } from "react";

export interface MessageContextType {
  status: "error" | "success" | "warning" | "info";
  message: string;
}

export const initialMessageContext: MessageContextType = {
  status: "success",
  message: "",
};

export const MessageContext = React.createContext<MessageContextType>(
  initialMessageContext
);

export const useMessageContext = () => {
  return useContext(MessageContext);
};

export const SetMessageContext = createContext<
  React.Dispatch<React.SetStateAction<MessageContextType>>
>(() => {});

export const useSetMessageContext = () => {
  return useContext(SetMessageContext);
};

export const MessageProvider: React.FC = ({ children }) => {
  const [messageState, setMessage] = useState(initialMessageContext);

  return (
    <MessageContext.Provider value={messageState}>
      <SetMessageContext.Provider value={setMessage}>
        {children}
      </SetMessageContext.Provider>
    </MessageContext.Provider>
  );
};
