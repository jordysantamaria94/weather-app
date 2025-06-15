import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent, pathMatch: 'full', canActivate: [noAuthGuard] },
    { path: 'auth/register', component: RegisterComponent, pathMatch: 'full', canActivate: [noAuthGuard] },

    { path: 'panel/dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [authGuard]  },
    { path: 'panel/users', component: UsersComponent, pathMatch: 'full', canActivate: [authGuard] },

    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
