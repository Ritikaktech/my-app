import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TodoComponent },
  { path: '**', redirectTo: 'tasks' },
];
