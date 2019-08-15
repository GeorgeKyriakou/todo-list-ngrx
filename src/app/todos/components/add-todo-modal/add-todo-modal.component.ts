import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ITodo } from "src/app/todos/entities/ITodo";

@Component({
  selector: "app-stop-training",
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `
  ],
  template: `
    <h1 mat-dialog-title>Add a new task</h1>

    <div mat-dialog-content>
      <h4>Give your task a title</h4>
      <mat-form-field>
        <input matInput [(ngModel)]="currentData.title" />
      </mat-form-field>

      <h4>Give your task a description</h4>
      <mat-form-field>
        <input matInput [(ngModel)]="currentData.description" />
      </mat-form-field>

      <h4>Is there a deadline for this task?</h4>
      <mat-form-field>
        <input
          matInput
          [(ngModel)]="currentData.due_date"
          [matDatepicker]="picker"
          placeholder="Choose a date"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">cancel</button>
      <button mat-button [mat-dialog-close]="currentData" cdkFocusInitial>
        OK
      </button>
    </div>
  `
})
export class AddTodoModalComponent {
  public dialogRef: MatDialogRef<AddTodoModalComponent>;
  constructor(@Inject(MAT_DIALOG_DATA) public currentData: ITodo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
