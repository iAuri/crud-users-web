import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UserDatailComponent } from './pages/user-datail/user-datail.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UptadeUserComponent } from './pages/uptade-user/uptade-user.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'user/:_id', component: UserDatailComponent},
  { path: 'newuser', component: NewUserComponent},
  { path: 'updateuser/:_id', component: UptadeUserComponent},
  { path: '**', redirectTo: '/home' }
];
