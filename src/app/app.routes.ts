import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { FormCreateProjectComponent } from './pages/form-create-project/form-create-project.component';
import { CardComponent } from './component/card/card.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: "admin/projects/create", component: FormCreateProjectComponent },
  { path: "admin/users/:id", component: CardComponent },
  { path: 'projects/edit/:projectId', component: EditProjectComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: '**', component: NotFoundComponent },
];
