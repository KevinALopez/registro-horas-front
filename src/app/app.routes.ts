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
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin/projects/create', component: FormCreateProjectComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/users/:id', component: CardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'projects/edit-project/:projectId', component: EditProjectComponent, canActivate: [authGuard, adminGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [authGuard, adminGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [authGuard, adminGuard] },
  { path: 'projects', component: ProjectsListComponent, canActivate: [authGuard, adminGuard] },
=======
  { path: 'home', component: HomeComponent },
  { path: "admin/projects/create", component: FormCreateProjectComponent },
  { path: "admin/users/:id", component: CardComponent },
  { path: 'projects/edit/:projectId', component: EditProjectComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'projects', component: ProjectsListComponent },
>>>>>>> c101472e641fda372bbacf7295ebdfee82f750f5
  { path: '**', component: NotFoundComponent },
];
