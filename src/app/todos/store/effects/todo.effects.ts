import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { switchMap, catchError } from "rxjs/operators";

import * as fromTodoActions from "../actions/todo.actions";
import { TodoService } from "src/app/todos/services/todo.service";
import { of } from "rxjs";

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTodoActions.loadTodos),
      switchMap(() => {
        return this.todoService.loadTodos().pipe(
          switchMap(todos => {
            return [fromTodoActions.loadTodosSuccess(todos)];
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
          switchMap(() => {
            return [fromTodoActions.createTodosSuccess(todo)];
          }),
          catchError(error => of(error))
        );
      })
    )
  );

  constructor(
    private actions$: Actions<fromTodoActions.TodoActionsUnion>,
    private todoService: TodoService
  ) {}
}
