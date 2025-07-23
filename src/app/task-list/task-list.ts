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
  protected tasks: TaskType[] = [{ id: uuidv4(), title: undefined, completed: false}];
  protected qtdTasks = 0;
  protected qtdTasksCompleted = 0;

  taskAdded(task: TaskType) {
    this.organizeTasks();
  }

  taskDeleted(idTask: string) {
    this.tasks = this.tasks.filter(t => t.id != idTask); 
    this.organizeTasks();
  }

  taskEdited(task: TaskType) {
    this.organizeTasks();
  }
  
  taskToggledCompleted(task: TaskType) {
    this.organizeTasks();
  }

  organizeTasks() {
    this.tasks = [{ id: uuidv4(), title: undefined, completed: false}, ...this.tasks
      .filter(t => t.title)
      .sort((a,b) => ( Number(a.completed) - Number(b.completed)))];

    this.countTasks();
  }

  countTasks() {
    this.qtdTasks = this.qtdTasksCompleted = 0;
    this.tasks.filter(t => t.title).forEach(t => {
      if(t.completed) this.qtdTasksCompleted++;
      this.qtdTasks++;
    })
  }
}
