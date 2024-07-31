import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  priority: 'low' | 'medium' | 'high'; // Ajout de la propriété de priorité
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) {}

  getTodosByApi(): Observable<Todo[]>{
  return this.http.get<Todo[]>(this.apiURL)
  }

  addTodosByApi(title:string,  priority: 'low' | 'medium' | 'high'):Observable<Todo>{
    const newTodo = {
      title,
      priority,
      completed: false, // Par défaut, la tâche n'est pas terminée
    };

  return this.http.post<Todo>(this.apiURL, newTodo)
  }

  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  // constructor() {}

  getTodos() {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string, priority: 'low' | 'medium' | 'high') {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      priority // Définir la priorité lors de l'ajout d'une tâche
    };
    this.todos = [...this.todos, newTodo];
    this.todosSubject.next(this.todos);
  }

  toggleTodoCompletion(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(this.todos);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos);
  }

  filterTodos(filter: 'active' | 'completed' | 'all' ){
  let filteredTodos = this.todos;
  if(filter === 'active'){
    filteredTodos = this.todos.filter(todo => !todo.completed)
  }else if (filter === 'completed'){
    filteredTodos = this.todos.filter(todo => todo.completed)
  }
  this.todosSubject.next(filteredTodos)

  }
}
