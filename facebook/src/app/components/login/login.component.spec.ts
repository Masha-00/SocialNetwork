import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from 'src/app/services/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        UserService, 
        provideMockStore({}),
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
      ],
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid email and password', () => {
    component.loginForm.setValue({
      "email": "masha@gmail.com",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(true);
  });

  it('should require valid email and invalid password', () => {
    component.loginForm.setValue({
      "email": "masha@gmail.com",
      "password": "1234", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid email and invalid password', () => {
    component.loginForm.setValue({
      "email": "masha@gmail.com",
      "password": "", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "mashagmail.com",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "masha@.com",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "masha@gmailcom",
      "password": "123456",
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "masha@gmail",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "12@gmail.com",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require valid password and invalid email', () => {
    component.loginForm.setValue({
      "email": "masha@g.com",
      "password": "123456", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require invalid password and email', () => {
    component.loginForm.setValue({
      "email": "",
      "password": "", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });

  it('should require invalid password and email', () => {
    component.loginForm.setValue({
      "email": "masha@g.co",
      "password": "123", 
    });
    expect(component.loginForm.valid).toEqual(false);
  });
});
