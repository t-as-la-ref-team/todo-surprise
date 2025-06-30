import { Routes } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HangingGameComponent } from './hanging-game/hanging-game.component';
import { MemberComponent } from './member/member.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [{
 path:'tasks', component:DragDropComponent,pathMatch:'full'
},{
  path:'todos',component:TodoComponent,pathMatch:'full'
}, { path: '', redirectTo: 'todos', pathMatch: 'full' },{
  path:'weather',component:WeatherComponent,pathMatch:'full'
},{ path: 'guess-word', component:HangingGameComponent,pathMatch: 'full' },{
  path:'weather',component:WeatherComponent,pathMatch:'full'
},{ path: 'member', component:MemberComponent, pathMatch: 'full' },
{
    path: 'unauthorized',
    component: ErrorPageComponent,
    data: {
      imageSrc: '/assets/401.gif',
      title: '401 - Unauthorized',
      message: 'You are not authorized to access this page.'
    }
  },
  {
    path: '**',
    component: ErrorPageComponent,
    data: {
      imageSrc: '/assets/404.gif',
      title: '404 - Page Not Found',
      message: 'Sorry, the page you are looking for does not exist.'
    }
  }
];
