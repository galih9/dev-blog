import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { UserFormsComponent } from './pages/users-management/user-forms/user-forms.component';
import { LearningPageComponent } from './pages/learning-page/learning-page.component';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { CreatePostMdComponent } from './pages/create-post-md/create-post-md.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'user-info', component: UserInfoComponent },
  {
    path: 'users-management',
    title: 'Users Management',
    canActivate: [AuthGuard],
    component: UsersManagementComponent,
  },
  {
    path: 'create-post',
    title: 'Create Post',
    canActivate: [AuthGuard],
    component: CreatePostMdComponent,
  },
  {
    path: 'post-list',
    title: 'Post List',
    canActivate: [AuthGuard],
    component: PostListComponent,
  },
  {
    path: 'learning-page',
    title: 'Learning Page',
    component: LearningPageComponent,
  },
  {
    path: 'login-page',
    title: 'Login Page',
    component: LoginPageComponent,
  },
  {
    path: 'form',
    component: UserFormsComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
