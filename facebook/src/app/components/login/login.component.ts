import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/auth/interface';
import { SignIn, SignOut } from '../../store/auth/actions';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public auth$: Observable<IAuthState>;
  storeSubscription: any;
  btnHide: boolean | undefined;
  hide = true;

  loginForm: FormGroup = new FormGroup({
    "email": new FormControl('', [Validators.required, Validators.email, Validators.pattern('^\\w{3,24}@[a-z]{2,12}\\.[a-z]{2,5}$')]),
    "password": new FormControl('', [Validators.required, Validators.pattern('^[^\\s]{6,14}')])
  });

  constructor(
    private store: Store<{ auth: IAuthState }>, 
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private jwtHelper: JwtHelperService
  ) { this.auth$ = store.select('auth') }

  loginUser() {
    this.userService.userLogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        let token = data.token;
        sessionStorage.setItem('Token', token);
        this.store.dispatch(SignIn({ token }));
        const decoded = this.jwtHelper.decodeToken(token); 
        this.router.navigate([ `/users/${decoded.user.id}` ]);
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
  }

  SingOut() {
    this.store.dispatch(SignOut());
  }
  
  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.btnHide = state.auth.isAuthenticated;
    })
  }
}
