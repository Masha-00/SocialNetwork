import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [PostsService]
})
export class AddPostComponent implements OnInit {
  @Output() newPost: EventEmitter<any> = new EventEmitter();

  addPostForm = new FormGroup({
    "title": new FormControl('', [Validators.minLength(1), Validators.required]),
    "body": new FormControl('', [Validators.minLength(3), Validators.required]),
  })
  
  submitted = false;

  constructor(
    private postsService: PostsService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) { }

  addPost() {
    if (!this.addPostForm.invalid) {
      this.submitted = true;
      this.postsService.createPost(this.addPostForm.value).subscribe({
        next: () => {
          const post = {
            ...this.addPostForm.value,
          };
          this.newPost.emit(post);
          this.router.navigate([ '/posts' ]);
          this.submitted = false;
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
      });
    } else {
      this.snackBar.open('Enter a correct values!', 'Undo', {
        duration: 2000
      });
    }
  }

  ngOnInit(): void {}

}
