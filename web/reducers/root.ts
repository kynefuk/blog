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
      const message = action.payload;
      localStorage.setItem("message", message);
      return message;
    }
    case MessageActionType.DELETE: {
      localStorage.removeItem("message");
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
  payload: Blog[];
};

export const BlogListReducer = (state: Blog[] = [], action: BlogListAction) => {
  switch (action.type) {
    case BlogListActionType.ADD: {
      const blogs = JSON.stringify(action.payload);
      localStorage.setItem("blogs", blogs);
      return action.payload;
    }
    case BlogListActionType.DELETE: {
      const deletedBlog = action.payload[0];
      if (localStorage.getItem("blogs")) {
        const updatedBlogs = state.filter((b) => b.title !== deletedBlog.title);
        return updatedBlogs;
      }
      return [];
    }
    default: {
      return state;
    }
  }
};
