import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TodosEffects } from "./todos/store/effects/todo.effects";

import { TodosModule } from "./todos/todos.module";
import { reducers } from "./todos/store/reducers";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TodosModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([TodosEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
