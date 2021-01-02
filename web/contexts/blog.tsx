import React, { createContext, useContext, useReducer } from "react";
import { Blog } from "../openapi/api";
import { BlogListAction, BlogListReducer } from "../reducers/root";

export type BlogListContextType = {
  blogs: Blog[];
  dispatchBlogList: React.Dispatch<BlogListAction>;
};

const BlogListContext = createContext<BlogListContextType>({
  blogs: localStorage.getItem("blogs")
    ? JSON.parse(localStorage.getItem("blogs")!)
    : [],
  dispatchBlogList: () => {},
});

export const useBlogListContext = () => {
  return useContext(BlogListContext);
};

export const BlogListProvider: React.FC = () => {
  const storedBlogList: Blog[] = localStorage.getItem("blogs")
    ? JSON.parse(localStorage.getItem("blogs")!)
    : [];
  const [blogs, dispatchBlogList] = useReducer(BlogListReducer, storedBlogList);
  return <></>;
};
