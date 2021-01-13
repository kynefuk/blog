import { combineReducers } from "redux";
import { BlogListReducer } from "./blogList";
import { DataFetchReducer } from "./dataFetch";

export const RootReducer = combineReducers({
  blogs: BlogListReducer,
  dataFetch: DataFetchReducer,
});
