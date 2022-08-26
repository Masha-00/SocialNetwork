import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { loadPost } from '../../store/posts/actions';
import { PostState } from '../../store/posts/reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

declare const feather: any;
export interface Comment {
  body: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [PostsService]
})
export class CommentComponent implements OnInit {
  @Input() id: string | null | undefined;
  @Output() newComment: EventEmitter<any> = new EventEmitter();
  public posts$!: Observable<PostState>;
  submitted = false;

  commentForm = new FormGroup({
    body: new FormControl('', [Validators.pattern('^[^\\s]{1,500}'), Validators.required]),
  })
  
  constructor(
    private postsService: PostsService, 
    private store: Store<{ posts: PostState }>, 
    private snackBar: MatSnackBar
  ) { }

  addComment(): void {
    if (this.commentForm.valid) {
      this.postsService.createComment(this.id, this.commentForm.value).subscribe({
        next: () => {
          const commnet = { ...this.commentForm.value };
          this.newComment.emit(commnet);
          this.commentForm.reset();
          this.store.dispatch(loadPost());
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          if (err) {
            this.snackBar.open(err.error.message, 'Undo', {
              duration: 2000
            });
          } else {
            this.snackBar.open('Something Went Wrong!', 'Undo', {
              duration: 2000
            });
          }
        }
      })
    } else {
      this.snackBar.open('Enter a correct values!', 'Undo');
    }
  }

  ngOnInit(): void {}

}
