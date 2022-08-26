import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.css'],
  providers: [UserService]
})

export class ChangePassowrdComponent implements OnInit {
  @Output() updatePassword: EventEmitter<any> = new EventEmitter();
  id: string | null | undefined;
  btnHide: boolean | undefined;
  hide1 = true;
  hide2 = true;
  submitted = false;

  changePasswordForm = new FormGroup({
    "password": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{6,14}')]),
    "newPassword": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{6,14}')]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  goToHome() {
    this.router.navigate([ '/posts' ]);
  }

  changePassword() {
    if(!this.changePasswordForm.invalid) {
      this.submitted = true;
      let id = this.route.snapshot.params["id"];
      this.userService.changePassword(id, this.changePasswordForm.value).subscribe({
        next: () => {
          const passowrd = {
            ...this.changePasswordForm.value
          };
          this.updatePassword.emit(passowrd);
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
      })
    } else {
      this.snackBar.open('Enter a correct values!', 'Undo', {
        duration: 2000
      });
    }
  }

  ngOnInit(): void {}
}
