import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { PostsService } from 'src/app/services/posts.service';
import { CommentComponent } from './comment.component';
import { StoreModule } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ], 
      declarations: [ CommentComponent ],
      providers: [PostsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid comment', () => {
    component.commentForm.setValue({
      "body": "comment"
    });
    expect(component.commentForm.valid).toEqual(true);
  });

  it('should require valid comment', () => {
    component.commentForm.setValue({
      "body": "c"
    });
    expect(component.commentForm.valid).toEqual(true);
  });

  it('should require invalid comment', () => {
    component.commentForm.setValue({
      "body": ""
    });
    expect(component.commentForm.valid).toEqual(false);
  });
});
