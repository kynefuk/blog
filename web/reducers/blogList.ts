import { Blog } from "../openapi/api";

export enum BlogListActionType {
  ADD = "blogs/add",
  DELETE = "blogs/delete",
}

export type BlogListAction = {
  type: BlogListActionType;
  payload: Blog[] | string;
};

export const BlogListReducer = (state: Blog[] = [], action: BlogListAction) => {
  switch (action.type) {
    case BlogListActionType.ADD: {
      return action.payload as Blog[];
    }
    case BlogListActionType.DELETE: {
      const deletedBlogTitle = action.payload as string;
      const updatedBlogs = state.filter((b) => b.title !== deletedBlogTitle);
      return updatedBlogs;
    }
    default: {
      return state;
    }
  }
};
