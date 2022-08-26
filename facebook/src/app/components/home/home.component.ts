import { Component, OnInit } from '@angular/core';
import Post  from '../../models/post.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPost } from '../../store/posts/actions';
import { PostState } from '../../store/posts/reducer';

interface Subscription {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public filterTerm!: string;
  public posts$: Observable<PostState>;
  postsList: Post[] = [];
  postArrayFromStore: object[] = [];

  postListIsFetching = true;

  subscriptions: Subscription[] = [
    { value: 'Subscriptions', viewValue: 'Subscriptions' },
    { value: 'Explore', viewValue: 'Explore' },
    { value: 'Favourite', viewValue: 'Favourite' }
  ];

  tags: Subscription[] = [
    { value: 'Tags', viewValue: 'Tags'},
    { value: 'Favourite tag 1', viewValue: 'Favourite tag 1' },
    { value: 'Favourite tag 2', viewValue: 'Favourite tag 2' }
  ];
  
  constructor(
    private store: Store<{ posts: PostState }>
  ) { this.posts$ = store.select('posts') }

  newPost(post: Post) {
    this.postsList.unshift(post);
  }

  ngOnInit() {
    this.store.dispatch(loadPost());
    this.store.subscribe((state) => {
      this.postsList = state.posts.posts.docs;
      this.postListIsFetching = false;
    });
  }
}
