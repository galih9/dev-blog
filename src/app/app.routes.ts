import { ResolveFn, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { UserFormsComponent } from './pages/users-management/user-forms/user-forms.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  {
    path: 'users-management',
    title: 'Users Management',
    component: UsersManagementComponent,
  },
  {
    path: 'form',
    component: UserFormsComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
