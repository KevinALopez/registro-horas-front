import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'edit-user',
    component: EditUserComponent,
  },
  {
    path: 'projects',
    component: ProjectsListComponent,
  },
  { path: '**', redirectTo: 'login' },
];
