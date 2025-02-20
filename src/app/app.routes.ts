import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormCreateProjectComponent } from './components/form-create-project/form-create-project.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [

    { path: "", pathMatch: 'full', redirectTo: 'login' },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "admin/projects/create", component: FormCreateProjectComponent },
    { path: "admin/users/:id", component: CardComponent },
    



];
