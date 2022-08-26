import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationComponent } from './components/registration/registration.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/reducer';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MessageComponent } from './components/message/message.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { HomeComponent } from './components/home/home.component';
import { postReducer } from './store/posts/reducer';
import { PostsEffects } from './store/posts/effects';
import { EffectsModule } from '@ngrx/effects';
import { CommentComponent } from './components/comment/comment.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    PostComponent,
    PostsComponent,
    NotFoundComponent,
    AddPostComponent,
    EditPostComponent,
    MessageComponent,
    PostsListComponent,
    HomeComponent,
    CommentComponent,
    UserProfileComponent,
    ChangePassowrdComponent,
    EditUserComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    CommonModule,
    MatGridListModule,
    StoreModule.forRoot({ auth: authReducer, posts: postReducer }),
    EffectsModule.forRoot([PostsEffects]),
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService, { provide: JsonPipe }],
  bootstrap: [AppComponent]
})
export class AppModule { }
