import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { FormCreateProjectComponent } from './pages/form-create-project/form-create-project.component';
import { CardComponent } from './component/card/card.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'edit-user', component: EditUserComponent},
  { path: "admin/projects/create", component: FormCreateProjectComponent },
  { path: "admin/users/:id", component: CardComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: '**', redirectTo: 'login' },

]

