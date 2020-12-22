import { DefaultApi } from "../openapi/api";

export const getAllBlog = async () => {
  const api = new DefaultApi();
  const response = await api.listBlogBlogsGet();
  return response.data.map((d) => {
    return { params: { title: d.title } };
  });
};

export const getBlog = async (title: string) => {
  const api = new DefaultApi();
  const response = await api.getBlogBlogsBlogTitleGet(title);
  return response.data;
};
