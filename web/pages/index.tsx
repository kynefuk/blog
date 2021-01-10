import React, { useEffect } from "react";
import Home from "../components/Home";
import { Message } from "../components/Message";
import { useBlogListContext } from "../contexts/blog";
import { BlogListActionType } from "../reducers/root";
import { useApi } from "../hooks/useApi";

const App = () => {
  const { api } = useApi();
  const { dispatchBlogList } = useBlogListContext();
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
