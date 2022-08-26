import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Post from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';
import { PostState } from 'src/app/store/posts/reducer';
import { IAuthState } from 'src/app/store/auth/interface';
import { loadPost } from 'src/app/store/posts/actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() post: Post | undefined;
  @Output() updatePost: EventEmitter<any> = new EventEmitter();
  public posts$: Observable<PostState>;
  public auth$: Observable<IAuthState>;
  public commentsNumber: number | undefined = 0;
  public user: { name: any } | any;
  public authenticated = false;
  btnHide: boolean | undefined;
  
  constructor(
    private store: Store<{ auth: IAuthState }>,
    private storePost: Store<{ posts: PostState }>, 
    private postsService: PostsService, 
    private router: Router
  ) {
    this.posts$ = storePost.select('posts');
    this.auth$ = store.select('auth');
  }
  
  deletePost() {
    if (confirm("Do you really want to delete this post?") === true) {
      this.postsService.deletePost(this.post?._id).subscribe(() => {
      this.router.navigate([ '/posts' ]);
      this.store.dispatch(loadPost());
    })
  }}

  ngOnInit() {
    if (this.post?.user) {
      this.user = this.post?.user;
    };
    this.store.subscribe((state) => {
      this.btnHide = state.auth.isAuthenticated;
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.commentsNumber = this.post?.comments?.length;
  }
}
