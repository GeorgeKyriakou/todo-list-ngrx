import { Component, OnInit } from "@angular/core";
import * as fromTodos from "../../store/reducers/todos.reducer";
import { Store, select } from "@ngrx/store";
import {
  loadTodos,
  createTodo,
  generateTodo
} from "../../store/actions/todo.actions";
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
  toBeDone: number;
  headerText: string = null;

  constructor(
    private store: Store<fromTodos.State>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
    this.store.pipe(select(fromTodos.selectAll)).subscribe(todos => {
      this.todos = todos;
      this.toBeDone = this.todos.map(t => t.completed).filter(c => !c).length;
    });
  }

  onAddNewTask() {
    const data: ITodo = {
      title: "",
      description: "",
      due_date: new Date(),
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
  onAddDefaultTasks() {
    this.store.dispatch(generateTodo());
  }

  get getHeaderText() {
    if (this.todos.length && this.toBeDone) {
      return `${this.toBeDone} ${
        this.toBeDone === 1 ? "task" : "tasks"
      } remaining`;
    } else if (this.todos.length && !this.toBeDone) {
      return "You're all done! Fika is in order :)";
    } else {
      return "No tasks left to do!! Click new to add one";
    }
  }
}
