import { of, Observable } from "rxjs";
import { ITodo } from "../entities/ITodo";
import { Injectable } from "@angular/core";

const todoIdeas = [
  {
    title: "Add to library",
    description: "Buy a new book",
    due_date: new Date(),
    completed: false
  },
  {
    title: "Admire",
    description: "Go for a walk and admire nature",
    due_date: new Date(),
    completed: false
  },
  {
    title: "Communicate",
    description: "Call family or a friend",
    due_date: new Date(),
    completed: false
  },
  {
    title: "Get strong",
    description: "Go to the gym",
    due_date: new Date(),
    completed: false
  },
  {
    title: "Play",
    description: "Join a new hobby",
    due_date: new Date(),
    completed: false
  },
  {
    title: "Socialize",
    description: "Go out with a friend",
    due_date: new Date(),
    completed: false
  }
];

@Injectable()
export default class Generator {
  getRandom() {
    return todoIdeas[Math.floor(Math.random() * todoIdeas.length)];
  }
}
