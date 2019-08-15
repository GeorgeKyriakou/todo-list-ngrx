import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-cofirm-modal",
  template: `
    <h1 mat-dialog-title>Remove {{ title }}?</h1>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>
        cancel
      </button>
      <button mat-button [mat-dialog-close]="true">
        OK
      </button>
    </div>
  `
})
export class ConfirmationModalComponent {
  public dialogRef: MatDialogRef<ConfirmationModalComponent>;
  constructor(@Inject(MAT_DIALOG_DATA) public title: string) {}
}
