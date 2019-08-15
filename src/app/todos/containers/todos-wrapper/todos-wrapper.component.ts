import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ITodo } from "src/app/todos/entities/ITodo";
import {
  loadTodos,
  createTodo
} from "src/app/todos/store/actions/todo.actions";

import * as fromTodos from "../../store/reducers/todos.reducer";

@Component({
  selector: "app-todos-wrapper",
  templateUrl: "./todos-wrapper.component.html",
  styleUrls: ["./todos-wrapper.component.scss"]
})
export class TodosWrapperComponent implements OnInit {
  todos: ITodo[] = [];
  constructor(private store: Store<fromTodos.State>) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.store
      .pipe(select(fromTodos.selectAllTodos))
      .subscribe(todos => (this.todos = todos));
  }

  onAddNewTask(newTodo) {
    this.store.dispatch(createTodo(newTodo));
  }
}
