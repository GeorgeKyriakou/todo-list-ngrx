import { ActionReducerMap } from "@ngrx/store";
import * as fromReducer from "./todos.reducer";

export const reducers: ActionReducerMap<any> = {
  todos: fromReducer.todosReducer
};
