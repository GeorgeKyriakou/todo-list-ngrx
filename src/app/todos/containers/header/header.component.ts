import { Component, OnInit } from "@angular/core";
import * as fromTodos from "../../store/reducers/todos.reducer";
import { Store, select } from "@ngrx/store";
import { loadTodos, createTodo } from "../../store/actions/todo.actions";
import { ITodo } from "../../entities/ITodo";
import { MatDialog } from "@angular/material";
import { AddTodoModalComponent } from "../../components/add-todo-modal/add-todo-modal.component";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  todos: ITodo[] = [];
  constructor(
    private store: Store<fromTodos.State>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.store
      .pipe(select(fromTodos.selectAllTodos))
      .subscribe(todos => (this.todos = todos));
  }

  onAddNewTask() {
    const data: ITodo = {
      title: "",
      description: "",
      due_date: null,
      completed: false
    };
    const dialogRef = this.dialog.open(AddTodoModalComponent, {
      width: "500px",
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTodo: ITodo = {
          ...result,
          due_date: Date.parse(result.due_date)
        };
        this.store.dispatch(createTodo(newTodo));
      }
    });
  }
}
