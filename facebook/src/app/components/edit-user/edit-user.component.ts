import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
  @Output() editUser: EventEmitter<any> = new EventEmitter();
  public user: { name: any } | any;
  id: string | null | undefined;
  submitted = false;

  updateUserForm = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.pattern('^\\w{3,24}')]),
    "email": new FormControl('', [Validators.required, Validators.pattern('^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$')])
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  currentUser: User = {
    _id: '',
    name: '',
    email: ''
  };

  updateUser() {
    if (!this.updateUserForm.invalid) {
      this.submitted = true;
      let id = this.route.snapshot.params["id"];
      this.userService.updateUser(id, this.updateUserForm.value).subscribe({
        next: () => {
          const user = {
            ...this.updateUserForm.value,
          };
          this.editUser.emit(user);
          this.router.navigate([ `/users/${id}` ]);
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

  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe({
        next: (data) => {
          return this.currentUser = data;
        },
        error: (e) => console.error(e)
      });
  }

  goToHome() {
    this.router.navigate([ '/posts' ]);
  }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params["id"]);
  }
}
