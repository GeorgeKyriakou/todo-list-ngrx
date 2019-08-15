import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { TodosEffects } from "./todo.effects";

describe("TodosEffects", () => {
  let actions$: Observable<any>;
  let effects: TodosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.get<TodosEffects>(TodosEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
