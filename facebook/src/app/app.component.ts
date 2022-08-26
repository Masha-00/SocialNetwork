import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, PostsService]
})
export class AppComponent {
  title = 'facebook';
}
