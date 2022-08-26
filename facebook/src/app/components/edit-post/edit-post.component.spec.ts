import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { EditPostComponent } from './edit-post.component';
import { PostsService } from 'src/app/services/posts.service';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ EditPostComponent ],
      providers: [PostsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid title and body', () => {
    component.updatePostForm.setValue({
      "title": "title", 
      "body": "body"
    });
    expect(component.updatePostForm.valid).toEqual(true);
  });

  it('should require invalid title', () => {
    component.updatePostForm.setValue({
      "title": "", 
      "body": "body"
    });
    expect(component.updatePostForm.valid).toEqual(false);
  });

  it('should require invalid body', () => {
    component.updatePostForm.setValue({
      "title": "title", 
      "body": ""
    });
    expect(component.updatePostForm.valid).toEqual(false);
  });

  it('should require invalid title and body', () => {
    component.updatePostForm.setValue({
      "title": "", 
      "body": ""
    });
    expect(component.updatePostForm.valid).toEqual(false);
  });

  it('should require invalid title and body', () => {
    component.updatePostForm.setValue({
      "title": "1", 
      "body": "1"
    });
    expect(component.updatePostForm.valid).toEqual(false);
  });
});
