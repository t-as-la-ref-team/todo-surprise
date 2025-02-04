import { Routes } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [{
 path:'tasks', component:DragDropComponent,pathMatch:'full'

},{
  path:'todos',component:TodoComponent,pathMatch:'full'
}, { path: '', redirectTo: 'todos', pathMatch: 'full' }
];
