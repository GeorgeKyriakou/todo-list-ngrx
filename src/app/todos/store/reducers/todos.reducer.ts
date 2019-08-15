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
  on(featureActions.loadTodosSuccess, (state, action) => {
    return todosAdapter.addAll([...action.todos], state);
  }),
  on(featureActions.createTodosSuccess, (state, action) => {
    return todosAdapter.addOne(action.todo, state);
  }),
  on(featureActions.updateTodosSuccess, (state, { changes, id }) => {
    return todosAdapter.updateOne(
      {
        id,
        changes
      },
      state
    );
  }),
  on(featureActions.deleteTodosSuccess, (state, { todoId }) => {
    return todosAdapter.removeOne(todoId, state);
  })
);

export const getTodosState = createFeatureSelector<State>("todos");

export const {
  selectIds: selectTodosIds,
  selectEntities: selectTodosEntities,
  selectAll: selectAllTodos,
  selectTotal: articlesCount
} = todosAdapter.getSelectors(getTodosState);
