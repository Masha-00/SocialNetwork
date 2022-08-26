import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostComponent } from './components/post/post.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'posts', component: HomeComponent },
  { path: 'posts/:id' , component: PostComponent },
  { path: 'create/post', component: AddPostComponent },
  { path: 'edit/posts/:id', component: EditPostComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users/:id/change-password', component: ChangePassowrdComponent },
  { path: 'users/:id/editUser', component: EditUserComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { 
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }