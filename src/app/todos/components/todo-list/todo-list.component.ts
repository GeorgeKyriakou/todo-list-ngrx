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
import { updateTodo } from "../../store/actions/todo.actions";
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @Input() todos: ITodo[] = [];

  displayedColumns = [
    "completed",
    "title",
    "description",
    "due_date",
    "remove"
  ];
  dataSource = new MatTableDataSource<ITodo>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @Output() toggleChecked = new EventEmitter<ITodo>();
  @Output() removeTodo = new EventEmitter<string>();

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
  onUpdateTodo(todo: ITodo) {
    this.toggleChecked.emit(todo);
  }

  onRemoveTodo(todo) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: "200px",
      data: todo.title
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.removeTodo.emit(todo.id);
      }
    });
  }
}
