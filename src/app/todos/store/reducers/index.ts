import { ActionReducerMap } from "@ngrx/store";
import { todosReducer } from "./todos.reducer";

export const reducers: ActionReducerMap<any> = {
  todos: todosReducer
};
