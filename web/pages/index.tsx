import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import { Message } from "../components/Message";
import { useMessageContext, useSetMessageContext } from "../contexts/message";

const App = () => {
  const message = useMessageContext();
  const setMessage = useSetMessageContext();
  console.log(message);

  return (
    <>
      {message.message ? (
        <Message
          status={message.status}
          message={message.message}
          setMessage={setMessage}
        />
      ) : (
        <></>
      )}
      <Home />
    </>
  );
};

export default App;
