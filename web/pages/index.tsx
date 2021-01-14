import React, { useEffect } from "react";
import Home from "../components/Home";
import { Message } from "../components/Message";
import { BlogListActionType } from "../reducers/blogList";
import { useApi } from "../hooks/useApi";
import { useRootContext } from "../contexts/root";
import { LoadingComponent } from "../components/Loading/index";
import { DataFetchActionType } from "../reducers/dataFetch";

const App = () => {
  const { api } = useApi();
  const { dispatchBlogList, dataFetch, dispatchDataFetch } = useRootContext();
  useEffect(() => {
    const dispatchBlogContext = async () => {
      dispatchDataFetch({
        type: DataFetchActionType.FETCH_INIT,
      });
      try {
        const response = await api.listBlogBlogsGet();
        dispatchBlogList({
          type: BlogListActionType.ADD,
          payload: response.data,
        });
      } catch (err) {
        dispatchDataFetch({
          type: DataFetchActionType.FETCH_ERROR,
          payload: { message: err },
        });
      } finally {
        dispatchDataFetch({
          type: DataFetchActionType.FETCH_DONE,
        });
      }
    };
    dispatchBlogContext();
  }, [api, dispatchBlogList, dispatchDataFetch]);

  if (dataFetch.isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <Message />
      <Home />
    </>
  );
};

export default App;
