import React, { useEffect } from "react";
import Home from "../components/Home";
import { Message } from "../components/Message";
import { BlogListActionType } from "../reducers/blogList";
import { useApi } from "../hooks/useApi";
import { useRootContext } from "../contexts/root";

const App = () => {
  const { api } = useApi();
  const { dispatchBlogList } = useRootContext();
  useEffect(() => {
    const dispatchBlogContext = async () => {
      const response = await api.listBlogBlogsGet();
      dispatchBlogList({
        type: BlogListActionType.ADD,
        payload: response.data,
      });
    };
    dispatchBlogContext();
  }, [api, dispatchBlogList]);

  return (
    <>
      <Message />
      <Home />
    </>
  );
};

export default App;
