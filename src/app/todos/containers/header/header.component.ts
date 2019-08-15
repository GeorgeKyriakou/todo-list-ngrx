import { Component, OnInit } from "@angular/core";
import * as fromTodos from "../../store/reducers/todos.reducer";
import { Store, select } from "@ngrx/store";
import { loadTodos } from "../../store/actions/todo.actions";
import { ITodo } from "../../entities/ITodo";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  todos: ITodo[] = [];
  constructor(private store: Store<fromTodos.State>) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.store
      .pipe(select(fromTodos.selectAllTodos))
      .subscribe(todos => (this.todos = todos));
  }
}
