import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Post from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPost } from '../../store/posts/actions';
import { PostState } from '../../store/posts/reducer';
import { IAuthState } from '../../store/auth/interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
  providers: [PostsService]
})

export class PostsListComponent implements OnInit {
  @Input() postsList: Post[] | any;
  public posts$: Observable<PostState>;
  public auth$: Observable<IAuthState>;
  postPagination: any;
  listOfPosts = true;
  auth: boolean = false;
  posts: Post[] = [];

  constructor(
    private router: Router,
    private postsService: PostsService,
    private store: Store<{ posts: PostState; auth: IAuthState; }>
  ) { 
    this.posts$ = store.select('posts');
    this.auth$ = store.select('auth');
  }

  changePage(event?: any) {
    const { pageSize, pageIndex } = event;
    this.router.navigate(['/posts'], {
      queryParams: { limit: pageSize, page: pageIndex + 1 },
    });
    this.postsService.getAll(pageSize, pageIndex + 1).subscribe(() => {
      this.store.dispatch(loadPost());
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPost());
    this.store.subscribe((state) => {
      this.auth = state.auth.isAuthenticated;
      this.postPagination = state.posts.posts;
      this.posts = state.posts.posts.docs;
      this.listOfPosts = false;
    });
  }
}
