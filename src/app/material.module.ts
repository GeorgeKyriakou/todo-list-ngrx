import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from "@angular/material";

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
