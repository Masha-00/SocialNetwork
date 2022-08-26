import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from 'src/app/services/users.service';
import { EditUserComponent } from './edit-user.component';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ EditUserComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid name and email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "masha@gmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(true);
  });

  it('should require invalid name and valid email', () => {
    component.updateUserForm.setValue({
      "name": "m", 
      "email": "masha@gmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require invalid name and valid email', () => {
    component.updateUserForm.setValue({
      "name": "", 
      "email": "masha@gmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require invalid name and valid email', () => {
    component.updateUserForm.setValue({
      "name": "Al", 
      "email": "masha@gmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "mashagmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "masha@.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "masha@gmailcom"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "masha@gmail"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "12@gmail.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });

  it('should require valid name and invalid email', () => {
    component.updateUserForm.setValue({
      "name": "Masha", 
      "email": "masha@g.com"
    });
    expect(component.updateUserForm.valid).toEqual(false);
  });
});
