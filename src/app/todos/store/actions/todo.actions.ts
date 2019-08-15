import { createAction, props, union } from "@ngrx/store";
import { ITodo } from "src/app/todos/entities/ITodo";

export const loadTodos = createAction("[Todo] Load Todos");
export const loadTodosSuccess = createAction(
  "[Todo] Load Todos Success",
  props<ITodo[]>()
);
export const loadTodosFailure = createAction("[Todo] Load Todos Failure");

export const createTodo = createAction("[Todo] Create Todo", props<ITodo>());
export const createTodosSuccess = createAction(
  "[Todo] Create Todo Success",
  props<ITodo>()
);
export const createTodosFailure = createAction("[Todo] Create Todo Failure");

export const updateTodo = createAction("[Todo] Update Todo", props<ITodo>());
export const updateTodosSuccess = createAction("[Todo] Update Todo Success");
export const updateTodosFailure = createAction("[Todo] Update Todo Failure");

export const deleteTodo = createAction(
  "[Todo] Delete Todo",
  props<{ todoId: string }>()
);
export const deleteTodosSuccess = createAction("[Todo] Delete Todo Success");
export const deleteTodosFailure = createAction("[Todo] Delete Todo Failure");

const actions = union({
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  createTodosSuccess,
  createTodosFailure,
  updateTodo,
  updateTodosSuccess,
  updateTodosFailure,
  deleteTodo,
  deleteTodosSuccess,
  deleteTodosFailure
});

export type TodoActionsUnion = typeof actions;
