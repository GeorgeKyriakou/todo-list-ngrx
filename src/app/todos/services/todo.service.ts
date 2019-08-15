import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITodo } from "../entities/ITodo";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  loadTodos() {
    return this.http.get<ITodo[]>(`${this.baseUrl}/all`);
  }

  createTodo(todo: ITodo) {
    return this.http.post(`${this.baseUrl}/add`, { todo }) as Observable<ITodo>;
  }
}
