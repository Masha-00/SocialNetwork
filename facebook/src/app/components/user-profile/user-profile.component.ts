import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/store/auth/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {
  public auth$: Observable<IAuthState>;
  public authenticated = false;
  btnHide: boolean | undefined;
  id: string | null | undefined;

  currentUser: User = {
    _id: '',
    name: '',
    email: ''
  };

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private store: Store<{ auth: IAuthState }>,
    private userService: UserService
  ) {this.auth$ = store.select('auth') }
  
  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
        },
        error: (e) => console.error(e)
      });
  }

  changePassword() {
    this.router.navigate([ `/users/${this.currentUser._id}/change-password` ]);
  }

  updateUser() {
    this.router.navigate([ `/users/${this.currentUser._id}/editUser` ]);
  }

  deleteUser() {
    if (confirm("Do you really want to delete Account?") === true) {
      this.userService.deleteUser(this.currentUser?._id).subscribe(() => {
      this.router.navigate([ '/login' ]);
    })
  }}

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params["id"]);
    this.store.subscribe((state) => {
      this.btnHide = state.auth.isAuthenticated;
    })
  }
}
