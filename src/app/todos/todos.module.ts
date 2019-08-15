import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { todosReducer } from "./store/reducers/todos.reducer";
import { MaterialModule } from "../material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TodosWrapperComponent } from "./containers/todos-wrapper/todos-wrapper.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AddTodoModalComponent } from "./components/add-todo-modal/add-todo-modal.component";
import { HeaderComponent } from "./containers/header/header.component";

const COMPONENTS = [
  TodosWrapperComponent,
  TodoListComponent,
  AddTodoModalComponent,
  HeaderComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forFeature("todos", todosReducer)
  ],
  exports: COMPONENTS,
  entryComponents: [AddTodoModalComponent]
})
export class TodosModule {}
