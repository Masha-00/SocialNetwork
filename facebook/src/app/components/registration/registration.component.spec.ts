import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/users.service';
import { StoreModule } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ RegistrationComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid name, email and password', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@gmail.com",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(true);
  });

  it('should require valid name, email and invalid password', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@gmail.com",
      "password": "1234", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, email and invalid password', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@gmail.com",
      "password": "", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "mashagmail.com",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@.com",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@gmailcom",
      "password": "123456",
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@gmail",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "12@gmail.com",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require valid name, password and invalid email', () => {
    component.signupForm.setValue({
      "name": "Masha",
      "email": "masha@g.com",
      "password": "123456", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require invalid name, password and email', () => {
    component.signupForm.setValue({
      "name": "",
      "email": "",
      "password": "", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });

  it('should require invalid name, password and email', () => {
    component.signupForm.setValue({
      "name": "Ma",
      "email": "masha@g.co",
      "password": "123", 
    });
    expect(component.signupForm.valid).toEqual(false);
  });
});
