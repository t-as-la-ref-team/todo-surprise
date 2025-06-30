import { WeatherService } from './../service/weather.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: (Task & { editing?: boolean })[] = [];
  newTask: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loadTasksFromBackend();

    if ("Notification" in window) {
      Notification.requestPermission();
    }

    setInterval(() => {
      this.showTaskNotification();
    }, 3600000);
  }

  loadTasksFromBackend() {
    this.apiService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({ ...task, editing: false }));
    });
  }

  addTask() {
    if (!this.newTask.trim()) return;
    this.apiService.addTask({ name: this.newTask, completed: false }).subscribe(newTask => {
      this.tasks.push({ ...newTask, editing: false });
      this.newTask = '';
    });
  }

  toggleTaskCompletion(index: number) {
    const task = this.tasks[index];
    const updatedTask = { ...task, completed: !task.completed };
    this.apiService.updateTask(updatedTask).subscribe(updated => {
      this.tasks[index] = { ...updated, editing: false };
    });
  }

  toggleEditTask(index: number) {
    const task = this.tasks[index];
    if (task.editing) {
      // Save changes
      this.apiService.updateTask(task).subscribe(updated => {
        this.tasks[index] = { ...updated, editing: false };
      });
    } else {
      this.tasks[index].editing = true;
    }
  }

  onEditTaskName(index: number, event: any) {
    this.tasks[index].name = event.target.value;
  }

  deleteTask(index: number) {
    const task = this.tasks[index];
    this.apiService.deleteTask(task.id).subscribe(() => {
      this.tasks.splice(index, 1);
    });
  }

  private showTaskNotification() {
    const userName = localStorage.getItem('userName') || 'User';
    const appName = localStorage.getItem('appName') || 'Todo App';

    if (Notification.permission === "granted") {
      let notificationMessage = '';

      if (this.remainingTasks > 0) {
        notificationMessage = `Hey ${userName}, you have ${this.remainingTasks} tasks to complete! ✅`;
      } else {
        notificationMessage = `Hey ${userName}, you have no tasks! Add new tasks in "${appName}" to stay productive. 🚀`;
      }

      const notification = new Notification("🚀 Reminder!", {
        body: notificationMessage,
        icon: "/favicon.png"
      });

      notification.onclick = () => {
        window.focus();
        this.router.navigate(['/todos']);
      };
    } else {
      if ("Notification" in window) {
        Notification.requestPermission();
      }
    }
  }

  get remainingTasks() {
    return this.tasks.filter(task => !task.completed).length;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }
}
