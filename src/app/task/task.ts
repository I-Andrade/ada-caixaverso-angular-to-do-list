import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskType } from '../typing/taks';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  @Input() task: TaskType = { id: uuidv4(), title: undefined, completed: false};
  
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskEdited = new EventEmitter<TaskType>();
  @Output() taskAdded = new EventEmitter<TaskType>();
  @Output() taskToggledCompleted = new EventEmitter<TaskType>();

  editing: boolean = false;
  adding: boolean = false;

  newTitle: string = '';

  addTask(title: string) {
    this.task.title = title;
    this.adding = false;
    this.taskAdded.emit(this.task);
  }

  markAsAdding(newTaskInput: HTMLInputElement) {
    this.newTitle = '';
    this.adding = true;
    setTimeout(() => {
      newTaskInput.focus();
    }, 100);
  }

  toggleTask(id: string) {
    if (this.task && this.task.id === id) {
      this.task.completed = !this.task.completed;
      this.taskToggledCompleted.emit(this.task);
      this.editing = false;
    }
  }  

  editTask(id: string, title: string) {
    if (this.task && this.task.id === id) {
      this.task.title = title;
      this.taskEdited.emit(this.task);
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

  deleteTask(id: string) {
    if (this.task && this.task.id === id) {
      this.task.title = undefined;
      this.taskDeleted.emit(id);
    }
  }
}
