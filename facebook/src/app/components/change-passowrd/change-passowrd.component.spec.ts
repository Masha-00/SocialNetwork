import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { UserService } from 'src/app/services/users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePassowrdComponent } from './change-passowrd.component';
import { Router } from '@angular/router';
import { PostsListComponent } from '../posts-list/posts-list.component';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('ChangePassowrdComponent', () => {
  let component: ChangePassowrdComponent;
  let fixture: ComponentFixture<ChangePassowrdComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ ChangePassowrdComponent, PostsListComponent ],
      providers: [
        UserService,
        // { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(`should navigate to posts`, () => {
  //   component.goToHome();
  //   expect (routerSpy.navigate).toHaveBeenCalledWith(['/posts']);
  // });

  // it(`should navigate to 'posts' page'`, () => {
  //   expect(mockRouter.navigate).toHaveBeenCalledWith (['/posts']);
  // });

  // it(`should navigate to 'posts' page`, () => {
  //   component.goToHome(); // call router.navigate
  //   const spy = router.navigate as jasmine.Spy; // create the navigate spy
  //   const navArgs = spy.calls.first().args[0]; // get the spy values
  //   expect(navArgs[0]).toBe('/posts');
  // });

  it('should require valid password and newPassword', () => {
    component.changePasswordForm.setValue({
      "password": "123456", 
      "newPassword": "qwerty"
    });
    expect(component.changePasswordForm.valid).toEqual(true);
  });

  it('should require valid password and invalid newPassword', () => {
    component.changePasswordForm.setValue({
      "password": "123456", 
      "newPassword": "qwer"
    });
    expect(component.changePasswordForm.valid).toEqual(false);
  });

  it('should require invalid password and valid newPassword', () => {
    component.changePasswordForm.setValue({
      "password": "1", 
      "newPassword": "qwerty"
    });
    expect(component.changePasswordForm.valid).toEqual(false);
  });

  it('should require invalid password and newPassword', () => {
    component.changePasswordForm.setValue({
      "password": "1", 
      "newPassword": ""
    });
    expect(component.changePasswordForm.valid).toEqual(false);
  });
});
