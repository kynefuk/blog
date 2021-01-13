import React, { createContext, useContext, useReducer } from "react";
import { Blog } from "../openapi/api";
import { BlogListAction } from "../reducers/blogList";
import {
  dataFetchContextType,
  initialDataFetchContext,
} from "../contexts/dataFetch";
import { DataFetchAction } from "../reducers/dataFetch";
import { initialValue } from "../contexts/blog";
import { RootReducer } from "../reducers/root";

interface RootContextType {
  blogs: Blog[];
  dispatchBlogList: React.Dispatch<BlogListAction>;
  dataFetch: dataFetchContextType;
  dispatchDataFetch: React.Dispatch<DataFetchAction>;
}

export const RootContext = createContext<RootContextType>({
  blogs: [],
  dispatchBlogList: () => {},
  dataFetch: initialDataFetchContext,
  dispatchDataFetch: () => {},
});

export const useRootContext = () => {
  return useContext(RootContext);
};

export const AppContext: React.FC = ({ children }) => {
  const blogs = initialValue.blogs;
  const dataFetch = initialDataFetchContext;
  const [state, dispatch] = useReducer(RootReducer, { blogs, dataFetch });

  return (
    <RootContext.Provider
      value={{
        blogs: state.blogs,
        dataFetch: state.dataFetch,
        dispatchBlogList: dispatch,
        dispatchDataFetch: dispatch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
