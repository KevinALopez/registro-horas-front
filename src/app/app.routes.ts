import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { FormCreateProjectComponent } from './pages/form-create-project/form-create-project.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { RegistroHorasProyectoComponent } from './pages/registro-horas-proyecto/registro-horas-proyecto.component';
import { HoursRecordedComponent } from './pages/hours-recorded/hours-recorded.component';
import { InsertUserComponent } from './pages/insert-user/insert-user.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'admin/projects/create',
    component: FormCreateProjectComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'projects',
    component: ProjectsListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'projects/edit/:projectId',
    component: EditProjectComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'edit-password',
    component: EditPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/hours/log',
    component: RegistroHorasProyectoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'projects',
    component: ProjectsListComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'projects/edit/:projectId',
    component: EditProjectComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'edit-password',
    component: EditPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'hours-registered',
    component: HoursRecordedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/create',
    component: InsertUserComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] },
];
