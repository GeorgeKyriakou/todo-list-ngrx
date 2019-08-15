import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from "@angular/material";
import { ITodo } from "src/app/todos/entities/ITodo";
import { AddTodoModalComponent } from "../add-todo-modal/add-todo-modal.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @Input() todos: ITodo[] = [];

  displayedColumns = ["title", "description", "completed", "due_date"];
  dataSource = new MatTableDataSource<ITodo>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Output() addNewTask: EventEmitter<ITodo> = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.data = this.todos;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  onFilter(filter) {
    this.dataSource.filter = filter.trim().toLowerCase();
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

    dialogRef.afterClosed().subscribe(newTodo => {
      newTodo = { ...newTodo, due_date: Date.parse(newTodo.due_date) };
      this.dataSource.data = [...this.todos, newTodo];
      this.addNewTask.emit(newTodo);
    });
  }
}
