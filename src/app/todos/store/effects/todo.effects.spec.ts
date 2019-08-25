import "core-js/es7/reflect";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

import { Observable, of } from "rxjs";
import { cold } from "jasmine-marbles";

import * as fromTodoActions from "../actions/todo.actions";
import * as fromEffects from "./todo.effects";

import { ITodo } from "../../entities/ITodo";
import { TodoService } from "../../services/todo.service";
import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

describe("TodosEffects", () => {
  let actions$ = {} as Observable<Actions>;
  let effects = {} as fromEffects.TodosEffects;
  let todoService = {} as TodoService;

  beforeEach(() => {
    // Next two functions fix the following error:
    // TypeError: Cannot read property 'getComponentFromError' of null
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        fromEffects.TodosEffects,
        provideMockActions(() => actions$),
        {
          provide: TodoService,
          useValue: {
            createTodo: () => of({}),
            loadTodos: () => of([{}]),
            updateTodo: () => of({}),
            removeTodo: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(fromEffects.TodosEffects);
    todoService = TestBed.get(TodoService);
  });

  it("createTodo$", () => {
    const createdTodo = {
      id: 1,
      title: "Test",
      description: "test",
      due_date: new Date(),
      completed: false
    } as ITodo;
    spyOn(todoService, "createTodo").and.returnValue(
      cold("a", { a: createdTodo })
    );

    actions$ = cold("-a", {
      a: fromTodoActions.createTodo(createdTodo)
    });
    const expected$ = cold("-a-|", {
      a: fromTodoActions.createTodosSuccess({ todo: createdTodo })
    });

    expect(effects.createTodo$).toBeObservable(expected$);
  });

  it("loadTodos$", () => {
    const loadedTodos = [
      {
        id: 1,
        title: "Test",
        description: "test",
        due_date: new Date(),
        completed: false
      }
    ] as ITodo[];
    spyOn(todoService, "loadTodos").and.returnValue(
      cold("a", { a: loadedTodos })
    );

    actions$ = cold("-a", {
      a: fromTodoActions.loadTodos()
    });
    const expected$ = cold("-a-|", {
      a: fromTodoActions.loadTodosSuccess({ todos: loadedTodos })
    });

    expect(effects.loadTodos$).toBeObservable(expected$);
  });

  it("updateTodo$", () => {
    const todo = {
      id: 1,
      title: "Test",
      description: "test",
      due_date: new Date(),
      completed: false
    } as ITodo;
    spyOn(todoService, "updateTodo").and.returnValue(
      cold("a", { a: { ...todo, completed: true } })
    );

    actions$ = cold("-a", {
      a: fromTodoActions.updateTodo({ todo })
    });
    const expected$ = cold("-a-|", {
      a: fromTodoActions.updateTodosSuccess({
        id: 1,
        changes: { completed: true }
      })
    });

    expect(effects.updateTodo$).toBeObservable(expected$);
  });

  it("removeTodo$", () => {
    const todo = {
      id: 1,
      title: "Test",
      description: "test",
      due_date: new Date(),
      completed: false
    } as ITodo;

    spyOn(todoService, "removeTodo").and.callFake(() => {});

    actions$ = cold("-a", {
      a: fromTodoActions.deleteTodo({ todoId: `${todo.id}` })
    });
    const expected$ = cold("-a-|", {
      a: fromTodoActions.deleteTodosSuccess({ todoId: `${todo.id}` })
    });

    expect(effects.removeTodo$).toBeObservable(expected$);
  });
});
