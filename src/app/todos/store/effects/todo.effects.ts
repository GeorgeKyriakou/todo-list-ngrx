import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, catchError, exhaustMap } from "rxjs/operators";

import * as fromTodoActions from "../actions/todo.actions";
import { TodoService } from "src/app/todos/services/todo.service";
import { of } from "rxjs";
import { ITodo } from "../../entities/ITodo";
import { Update } from "@ngrx/entity";

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.loadTodos),
      exhaustMap(() => {
        return this.todoService.loadTodos().pipe(
          switchMap((todos: ITodo[]) => {
            return [fromTodoActions.loadTodosSuccess({ todos })];
          })
        );
      })
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.createTodo),
      switchMap(todo => {
        return this.todoService.createTodo(todo).pipe(
          switchMap(todo => {
            return [fromTodoActions.createTodosSuccess({ todo })];
          }),
          catchError(error => of(error))
        );
      })
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.updateTodo),
      switchMap(action => {
        return this.todoService.updateTodo(action.todo).pipe(
          switchMap(todo => {
            const todoUpdate: Update<ITodo> = {
              id: todo.id,
              changes: { completed: todo.completed }
            };
            return [fromTodoActions.updateTodosSuccess(todoUpdate)];
          })
        );
      })
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.deleteTodo),
      switchMap(({ todoId }) => {
        return this.todoService.removeTodo(todoId).pipe(
          switchMap(() => {
            return [fromTodoActions.deleteTodosSuccess({ todoId })];
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions<fromTodoActions.TodoActionsUnion>,
    private todoService: TodoService
  ) {}
}
