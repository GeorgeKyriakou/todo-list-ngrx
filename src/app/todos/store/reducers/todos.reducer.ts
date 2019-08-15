import { createReducer, on, createFeatureSelector } from "@ngrx/store";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import * as featureActions from "../actions/todo.actions";

import { ITodo } from "../../entities/ITodo";

export const todosAdapter = createEntityAdapter<ITodo>();
export interface State extends EntityState<ITodo> {}

export const initialState: State = todosAdapter.getInitialState();

export const todosReducer = createReducer(
  initialState,
  on(featureActions.loadTodos, state => ({ ...state, isLoading: true })),
  on(featureActions.loadTodosSuccess, (state, todos) =>
    todosAdapter.addMany(todos, state)
  )
  // on(featureActions.loadTodosSuccess, (state, todos) => ({
  //   ...state,
  //   isLoading: false,
  //   todos
  // }))
);

export const getTodosState = createFeatureSelector<State>("todos");

export const {
  selectIds: selectTodosIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: articlesCount
} = todosAdapter.getSelectors(getTodosState);
