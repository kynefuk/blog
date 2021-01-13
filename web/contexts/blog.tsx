import React, { createContext, useContext, useReducer } from "react";
import { Blog } from "../openapi/api";
import { BlogListAction, BlogListReducer } from "../reducers/blogList";

export type BlogListContextType = {
  blogs: Blog[];
  dispatchBlogList: React.Dispatch<BlogListAction>;
};

export const initialValue = {
  blogs: [] as Blog[],
  dispatchBlogList: () => {},
};

const BlogListContext = createContext<BlogListContextType>(initialValue);

export const useBlogListContext = () => {
  return useContext(BlogListContext);
};

export const BlogListProvider: React.FC = ({ children }) => {
  const storedBlogList: Blog[] = initialValue.blogs;
  const [blogs, dispatchBlogList] = useReducer(BlogListReducer, storedBlogList);
  return (
    <BlogListContext.Provider value={{ blogs, dispatchBlogList }}>
      {children}
    </BlogListContext.Provider>
  );
};
