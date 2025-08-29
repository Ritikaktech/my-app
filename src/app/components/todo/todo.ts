import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTask: string = '';
  editIndex: number | null = null;
  filterIndex: number = 0; // 0 = all, 1 = active, 2 = completed

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (!this.newTask.trim()) return;

    if (this.editIndex !== null) {
      this.todos[this.editIndex].title = this.newTask;
      this.editIndex = null;
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTask,
        completed: false,
      };
      this.todos.push(newTodo);
    }
    this.newTask = '';
    this.todoService.saveTodos(this.todos);
  }

  editTodo(index: number): void {
    this.newTask = this.todos[index].title;
    this.editIndex = index;
  }

  deleteTodo(index: number): void {
    this.todos.splice(index, 1);
    this.todoService.saveTodos(this.todos);
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.saveTodos(this.todos);
  }

  changeFilter(index: number): void {
    this.filterIndex = index;
  }

  get filteredTodos(): Todo[] {
    if (this.filterIndex === 1) {
      return this.todos.filter((t) => !t.completed);
    } else if (this.filterIndex === 2) {
      return this.todos.filter((t) => t.completed);
    }
    return this.todos;
  }
}
