import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  @Input() task?: { id: number, title: string, completed: boolean };
  
  @Output() deleted = new EventEmitter<number>();
  @Output() edited = new EventEmitter<{ id: number, title: string }>();
  @Output() added = new EventEmitter<{ id: number, title: string, completed: boolean }>();
  @Output() toggledCompleted = new EventEmitter<number>();

  editing: boolean = false;
  adding: boolean = false;

  newTitle: string = '';

  addTask(title: string) {
    this.task = { id: Date.now(), title, completed: false };
    this.added.emit(this.task);
    this.adding = false;
  }

  markAsAdding(newTaskInput: HTMLInputElement) {
    this.newTitle = '';
    this.adding = true;
    setTimeout(() => {
      newTaskInput.focus();
    }, 100);
  }

  toggleTask(id: number) {
    if (this.task && this.task.id === id) {
      this.task.completed = !this.task.completed;
      this.toggledCompleted.emit(id);
      this.editing = false; // Stop editing when toggling completion
    }
  }  

  editTask(id: number, title: string) {
    if (this.task && this.task.id === id) {
      this.task.title = title;
      this.edited.emit({ id, title });
      this.editing = false;
    }
  }
  
  markAsEditing(inputTask: HTMLInputElement) {
    this.editing = true;
    this.newTitle = this.task?.title || '';
    setTimeout(() => {
      inputTask.focus();
    }, 100);
  }

  deleteTask(id: number) {
    if (this.task && this.task.id === id) {
      this.task = undefined;
      this.deleted.emit(id);
    }
  }
}
