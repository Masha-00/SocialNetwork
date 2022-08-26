import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { Store } from '@ngrx/store';
import { SignOut } from '../../store/auth/actions'
import { IAuthState } from 'src/app/store/auth/interface';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {
  public auth$: Observable<IAuthState>;
  public authenticated = false;
  btnHide: boolean | undefined;

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private user: UserService, 
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { this.auth$ = store.select('auth') }

  goToLogin() {
    this.router.navigate([ '/login' ]);
  }

  goToMyProfile() {
    const token = JSON.parse(JSON.stringify(sessionStorage.getItem('Token') || '{}'));
    const decoded = this.jwtHelper.decodeToken(token);
    this.router.navigate([ `/users/${decoded.user.id}` ]);
  }

  logout() {
    this.store.dispatch(SignOut());
    sessionStorage.removeItem('Token');
    this.router.navigate([ '/login' ]);
  }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.btnHide = state.auth.isAuthenticated;
    })
  }
}
