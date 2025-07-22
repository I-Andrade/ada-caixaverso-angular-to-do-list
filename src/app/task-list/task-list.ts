import { Component } from '@angular/core';
import { TaskType } from '../typing/taks';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks: TaskType[] = [{ id: uuidv4(), title: undefined, completed: false}];

  taskAdded(task: TaskType) {
    this.organizeTasks();
  }

  taskDeleted(idTask: string) {
    this.tasks = this.tasks.filter(t => t.id != idTask); 
    this.organizeTasks();
  }

  organizeTasks() {
    this.tasks = [{ id: uuidv4(), title: undefined, completed: false}, ...this.tasks
      .filter(t => t.title)];
    
  }
}
