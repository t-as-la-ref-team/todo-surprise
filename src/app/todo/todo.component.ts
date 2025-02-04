import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: { text: string; completed: boolean; editing: boolean }[] = [];
  newTask: string = '';

  ngOnInit() {
    // Load tasks from local storage on initialization
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.unshift({ text: this.newTask, completed: false, editing: false });
      this.newTask = '';
      this.saveToLocalStorage(); // Save tasks to local storage
    }
  }

  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveToLocalStorage(); // Save tasks to local storage
  }

  toggleEditTask(index: number) {
    if (this.tasks[index].editing) {
      // Save task
      this.tasks[index].editing = false;
      this.saveToLocalStorage(); // Save tasks to local storage
    } else {
      // Enable edit mode
      this.tasks[index].editing = true;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveToLocalStorage(); // Save tasks to local storage
  }

  get remainingTasks() {
    return this.tasks.filter(task => !task.completed).length;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }

  private saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
