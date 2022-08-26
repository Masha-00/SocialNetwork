import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [UserService]
})
export class RegistrationComponent implements OnInit {
  hide = true;

  signupForm: FormGroup = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.pattern('^\\w{3,24}')]),
    "email": new FormControl('', [Validators.required, Validators.email, Validators.pattern('^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$')]),
    "password": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{6,14}')])
  });

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  createUser() {
    this.userService.createNewUser(this.signupForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login'])
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Undo', {
            duration: 2000
          });
        } else {
          this.snackBar.open('Something Went Wrong!', 'Undo', {
            duration: 2000
          });
        }
      }
    });
  }

  ngOnInit(): void {}
}
