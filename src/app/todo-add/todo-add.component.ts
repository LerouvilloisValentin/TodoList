import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'digi-todo-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {
  newTodoTitle: string = '';
  newTodoPriority: 'low' | 'medium' | 'high' = 'medium'; // Valeur par défaut
  constructor(private todoService: TodoService) {}

  onAddTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle, this.newTodoPriority);
      this.newTodoTitle = '';
      this.newTodoPriority = 'medium'; // Réinitialiser la priorité après ajout
    }
  }
}
