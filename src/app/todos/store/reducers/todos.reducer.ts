import { createReducer, on, createFeatureSelector } from "@ngrx/store";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import * as featureActions from "../actions/todo.actions";

import { ITodo } from "../../entities/ITodo";

export const todosAdapter = createEntityAdapter<ITodo>();
export interface State extends EntityState<ITodo> {}

const defaultState = {
  ids: [],
  entities: {}
};

export const initialState: State = todosAdapter.getInitialState(defaultState);

export const todosReducer = createReducer(
  initialState,
  on(featureActions.loadTodos, state => ({ ...state, isLoading: true })),
  on(featureActions.loadTodosSuccess, (state, action) => {
    return todosAdapter.addAll([...action.todos], state);
  })
);

export const getTodosState = createFeatureSelector<State>("todos");

export const {
  selectIds: selectTodosIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: articlesCount
} = todosAdapter.getSelectors(getTodosState);
