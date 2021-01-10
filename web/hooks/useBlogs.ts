import { AxiosPromise } from "axios";
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { Blog } from "../openapi/api";

export const useBlogs = async () => {
  const { api } = useApi();
  let response: AxiosPromise<Blog[]>;
  useEffect(() => {
    const getBlogs = async () => {
      return await api.listBlogBlogsGet();
    };
    response = getBlogs();
  }, [api]);
  return (await response).data;
};
