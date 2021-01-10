import { Blog } from "../openapi/api";

export enum MessageActionType {
  ADD = "message/add",
  DELETE = "message/delete",
}

export type MessageAction = {
  type: MessageActionType;
  payload: string;
};

export const MessageReducer = (state = "", action: MessageAction) => {
  switch (action.type) {
    case MessageActionType.ADD: {
      return action.payload;
    }
    case MessageActionType.DELETE: {
      return "";
    }
    default: {
      return state;
    }
  }
};

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
      return action.payload;
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
