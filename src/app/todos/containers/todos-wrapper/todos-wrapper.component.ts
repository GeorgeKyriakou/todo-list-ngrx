import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ITodo } from "src/app/todos/entities/ITodo";
import {
  loadTodos,
  updateTodo,
  deleteTodo
} from "src/app/todos/store/actions/todo.actions";

import * as fromTodos from "../../store/reducers/todos.reducer";
import { Observable } from "rxjs";

@Component({
  selector: "app-todos-wrapper",
  templateUrl: "./todos-wrapper.component.html",
  styleUrls: ["./todos-wrapper.component.scss"]
})
export class TodosWrapperComponent implements OnInit {
  todos$: Observable<ITodo[]>;

  constructor(private store: Store<fromTodos.State>) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.todos$ = this.store.pipe(select(fromTodos.selectAll));
  }

  onToggleChecked(todo) {
    const updated = {
      ...todo,
      completed: !todo.completed
    };
    this.store.dispatch(updateTodo({ todo: updated }));
  }

  onRemoveTodo(todoId) {
    this.store.dispatch(deleteTodo({ todoId }));
  }
}
