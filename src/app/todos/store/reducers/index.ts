import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";
import * as fromReducer from "./todos.reducer";

export const reducers: ActionReducerMap<any> = {
  todos: fromReducer.todosReducer
};

export const getTodosState = createFeatureSelector<fromReducer.State>("todos");
export const selectAllTodos = createSelector(
  getTodosState,
  fromReducer.selectAllTodos
);
