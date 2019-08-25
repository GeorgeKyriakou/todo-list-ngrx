import { createAction, props, union } from "@ngrx/store";
import { ITodo } from "src/app/todos/entities/ITodo";

export const generateTodo = createAction("[Todo] Generate Default Todos");
export const generateTodoSuccess = createAction(
  "[Todo] Generate Default Todos Success",
  props<{ todo: ITodo }>()
);
export const generateTodoFailure = createAction(
  "[Todo] Generate Default Todos Failure"
);

export const loadTodos = createAction("[Todo] Load Todos");
export const loadTodosSuccess = createAction(
  "[Todo] Load Todos Success",
  props<{ todos: ITodo[] }>()
);
export const loadTodosFailure = createAction("[Todo] Load Todos Failure");

export const createTodo = createAction("[Todo] Create Todo", props<ITodo>());
export const createTodosSuccess = createAction(
  "[Todo] Create Todo Success",
  props<{ todo: ITodo }>()
);
export const createTodosFailure = createAction("[Todo] Create Todo Failure");

export const updateTodo = createAction(
  "[Todo] Update Todo",
  props<{ todo: ITodo }>()
);
export const updateTodosSuccess = createAction(
  "[Todo] Update Todo Success",
  props<{ id: number; changes: Partial<ITodo> }>()
);
export const updateTodosFailure = createAction("[Todo] Update Todo Failure");

export const deleteTodo = createAction(
  "[Todo] Delete Todo",
  props<{ todoId: string }>()
);
export const deleteTodosSuccess = createAction(
  "[Todo] Delete Todo Success",
  props<{ todoId: string }>()
);
export const deleteTodosFailure = createAction("[Todo] Delete Todo Failure");

const actions = union({
  generateTodo,
  generateTodoSuccess,
  generateTodoFailure,
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
