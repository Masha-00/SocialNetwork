import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import Post from '../../models/posts.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [PostsService]
})

export class EditPostComponent implements OnInit {
  @Output() editPost: EventEmitter<any> = new EventEmitter();
  public user: { name: any } | any;
  message = '';
  submitted = false;
  
  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {  }

  updatePostForm = new FormGroup({
    "title": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{1,50}')]),
    "body": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{3,5000}')]),
  });
  currentPost: Post = {
    _id: '',
    title: '',
    body: ''
  };

  updatePost() {
    this.message = '';
    if (!this.updatePostForm.invalid) {
      let id = this.route.snapshot.params["id"];
      this.submitted = true;
      this.postsService.updatePost(id, this.updatePostForm.value).subscribe({
        next: () => {
          const post = {
            ...this.updatePostForm.value,
          };
          this.editPost.emit(post);
          this.router.navigate([ `/posts/${id}` ]);
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

  getPost(id: string): void {
    this.postsService.getPost(id)
      .subscribe({
        next: (data) => {
          return this.currentPost = data;
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit(): void {
    this.getPost(this.route.snapshot.params["id"]);
    this.message = '';
  }
}