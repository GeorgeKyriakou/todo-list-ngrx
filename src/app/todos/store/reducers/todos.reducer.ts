import { createReducer, on, createFeatureSelector } from "@ngrx/store";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import * as featureActions from "../actions/todo.actions";

import { ITodo } from "../../entities/ITodo";

export const todosAdapter = createEntityAdapter<ITodo>({});
export interface State extends EntityState<ITodo> {}

export const initialState: State = todosAdapter.getInitialState();

export const todosReducer = createReducer(
  initialState,
  on(featureActions.generateTodoSuccess, (state, action) =>
    todosAdapter.addAll(action.todos, state)
  ),
  on(featureActions.loadTodosSuccess, (state, action) =>
    todosAdapter.addAll(action.todos, state)
  ),
  on(featureActions.createTodosSuccess, (state, action) =>
    todosAdapter.addOne(action.todo, state)
  ),
  on(featureActions.updateTodosSuccess, (state, { changes, id }) =>
    todosAdapter.updateOne(
      {
        id,
        changes
      },
      state
    )
  ),
  on(featureActions.deleteTodosSuccess, (state, { todoId }) =>
    todosAdapter.removeOne(todoId, state)
  )
);

export const getTodosState = createFeatureSelector<State>("todos");

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todosAdapter.getSelectors(getTodosState);
