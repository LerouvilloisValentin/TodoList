import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from '../todo.service';
import { PriorityPipe } from '../priority.pipe';

@Component({
  selector: 'digi-todo-item',
  standalone: true,
  imports: [CommonModule, PriorityPipe],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleCompletion = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() clicked = new EventEmitter<number>()

  onToggleCompletion() {
    this.toggleCompletion.emit(this.todo.id);
    // toggleBtn.textContent =this.todo.completed ?'invalider': 'Valider'
  }
  onClick(id:number){
    this.clicked.emit(id)
  }
  onRemove() {
    this.remove.emit(this.todo.id);
  }

}
