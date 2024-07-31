import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TodoService, Todo } from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoAddComponent } from '../todo-add/todo-add.component';

@Component({
  selector: 'digi-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TodoAddComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  newTodo:string = ''
  newTodoPriority: 'low' | 'medium' | 'high' = 'medium'; // Valeur par défaut

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodosByApi();
  }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(): void {
    this.todos$ = this.todoService.getTodosByApi();
    console.log("refresh")
  }

  onTaskAdded(): void {
    this.refreshTodos();
  }
  // addTask():void{
  //   if(this.newTodo.trim()){
  //   this.todoService.addTodosByApi(this.newTodo, this.newTodoPriority).subscribe(()=>{
  //     this.newTodo=''
  //     this.todos$=this.todoService.getTodosByApi()
  //   })
  // }
  // }

  // onToggleTodoCompletion(id: number) {
  //   this.todoService.toggleTodoCompletion(id);
  // }

  // onRemoveTodo(id: number) {
  //   this.todoService.removeTodo(id);
  // }

  // filter(filter: 'all' | 'active' | 'completed'){
  //   this.todoService.filterTodos(filter)
  // }

  // handleClick(id:number){
  //   console.log('child compo clicked with id:',id)
  // }
}
