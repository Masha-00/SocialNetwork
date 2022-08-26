import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { PostsService } from 'src/app/services/posts.service';
import { StoreModule } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPostComponent } from './add-post.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ AddPostComponent ],
      providers: [PostsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    // isAuthenticated = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid title and body', () => {
    component.addPostForm.setValue({
      "title": "title", 
      "body": "body"
    });
    expect(component.addPostForm.valid).toEqual(true);
  });

  it('should require invalid title', () => {
    component.addPostForm.setValue({
      "title": "", 
      "body": "body"
    });
    expect(component.addPostForm.valid).toEqual(false);
  });

  it('should require invalid body', () => {
    component.addPostForm.setValue({
      "title": "title", 
      "body": ""
    });
    expect(component.addPostForm.valid).toEqual(false);
  });

  it('should require invalid title and body', () => {
    component.addPostForm.setValue({
      "title": "", 
      "body": ""
    });
    expect(component.addPostForm.valid).toEqual(false);
  });

  it('should require invalid title and body', () => {
    component.addPostForm.setValue({
      "title": "1", 
      "body": "1"
    });
    expect(component.addPostForm.valid).toEqual(false);
  });
});
