import { async, TestBed } from "@angular/core/testing";
import * as fromTodos from "./todos.reducer";
import * as fromActions from "../actions/todo.actions";
import { State } from "@ngrx/store";
import { ITodo } from "../../entities/ITodo";

describe("TodosReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = fromTodos;
      const action = {
        type: ""
      };
      const state = fromTodos.todosReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe("generateTodoSuccess action", () => {
    it("should return a generated todo in the state", () => {
      const testTodo = {
        title: "Test",
        description: "Test description",
        due_date: new Date(),
        completed: false
      };
      const { initialState } = fromTodos;
      const action = fromActions.generateTodoSuccess({ todo: testTodo });
      const state = fromTodos.todosReducer(initialState, action);
      expect(state.ids.length).toBe(1);
      expect(state.entities[state.ids[0]]).toBe(testTodo);
    });
  });

  describe("loadTodosSuccess action", () => {
    it("should return an array of todos in the state", () => {
      const testTodos = [
        {
          title: "Test1",
          description: "Test description 1",
          due_date: new Date(),
          completed: false
        }
      ];
      const { initialState } = fromTodos;
      const action = fromActions.loadTodosSuccess({ todos: testTodos });
      const state = fromTodos.todosReducer(initialState, action);
      expect(state.entities[state.ids[0]]).toBe(testTodos[0]);
    });
  });

  describe("createTodosSuccess action", () => {
    it("should return the created todo in the state", () => {
      const testTodo = {
        title: "Test1",
        description: "Test description 1",
        due_date: new Date(),
        completed: false
      };
      const { initialState } = fromTodos;
      const action = fromActions.createTodosSuccess({ todo: testTodo });
      const state = fromTodos.todosReducer(initialState, action);
      expect(state.entities[state.ids[0]]).toBe(testTodo);
    });
  });

  describe("updateTodosSuccess action", () => {
    it("should return the previous state with the selected todo having updated values", () => {
      const testTodo = {
        title: "Test1",
        description: "Test description 1",
        due_date: new Date(),
        completed: false
      } as ITodo;
      const { initialState } = fromTodos;

      initialState["todos"].ids = ["1"];
      initialState["todos"].entities = [{ 1: testTodo }];

      const action = fromActions.updateTodosSuccess({
        id: 0,
        changes: { completed: true }
      });
      const state = fromTodos.todosReducer(initialState, action);

      expect(state.entities[1]).toBe({ ...testTodo, completed: true });
    });
  });
});
