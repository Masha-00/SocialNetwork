import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Post from '../../models/post.model';
import Comment from 'src/app/models/comment.model';
import { EditComment } from 'src/app/models/comment.model';
import { PostsService } from '../../services/posts.service'; 
import { Observable } from 'rxjs';
import { PostState } from '../../store/posts/reducer';
import { Store } from '@ngrx/store';
import { loadPost } from '../../store/posts/actions';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostsService]
})

export class PostComponent implements OnInit {
  editComment: EditComment = {
    _id: '',
    body: '',
  }
  @Input()
  comment!: Comment;
  @ViewChild('heroEditInput')
  set commentEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  public posts$: Observable<PostState>;
  post: Post | undefined;
  id: string | null | undefined;
  postListIsFetching = true;
  deleting: boolean = true;
  postsList: Comment[] | undefined = [];
  user: any | undefined;
  controls!: FormArray;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ posts: PostState }>,
    private postsService: PostsService,
  ) {
    this.posts$ = store.select('posts');
  }

  public initComment() {
    this.store.dispatch(loadPost());
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.subscribe((state) => {
      this.post = state.posts.posts.docs.find(
        (post: Post) => post._id === this.id
      );
      this.postsList = this.post?.comments;
    });
    this.postListIsFetching = false;
  }

  edit(editComment: EditComment) {
    this.updComment(editComment);
  }

  updComment(editComment: EditComment) {
    const postId = String(this.route.snapshot.paramMap.get('id'));
    console.log(editComment);
    this.postsService.editComment(postId, editComment._id, this.editComment)
      .subscribe(comment => {
        const ix =  comment ? this.postsList?.findIndex(c => c._id === comment._id) : -1;
        console.log(ix);
        // if (ix > -1) {
        // this.postsList[ix] = comment;
        // }
      })
      console.log(editComment);
    // this.editComment = undefined;
  }

  deleteComment(commentId: string | undefined) {
    if (confirm("Do you really want to delete this comment?") === true) {
      this.deleting = true;
      this.id = this.route.snapshot.paramMap.get('id');
      this.postsService.deleteComment(this.id, commentId);
      this.initComment();
      this.deleting = false;
    }
  }

  static initComment() {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initComment();
    const toGroups = this.postsList?.map(comment => {
      return new FormGroup({
        name: new FormControl(comment.body, Validators.required),
      });
    });
    // this.controls = new FormArray(toGroups);
  }

  getControl(index: number, field: string) : FormControl {
    return this.controls?.at(index).get(field) as FormControl;
  }

  updateField(index: number, field: string) {
    const control = this.getControl(index, field);

    if (control.valid) {
      this.postsList = this.postsList?.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value
          }
        }
        return e;
      })
    }

  }
}