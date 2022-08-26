import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import Post from '../models/post.model';

describe('PostsService', () => {
  let httpSpy: Spy<HttpClient>;
  let postService: PostsService;
  let fakePosts: Post[] = [
    {
      _id: "1",
      title: "Fake post 1",
      body: "it is face post 1",
      comments: [
        {
          _id: "1",
          body: "comment 1"
        },
        {
          _id: "2",
          body: "comment 2"
        }
      ]
    },
    {
      _id: "2",
      title: "Fake post 2",
      body: "it is face post 2",
      comments: [
        {
          _id: "1",
          body: "comment 1"
        },
        {
          _id: "2",
          body: "comment 2"
        }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        PostsService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
    });
    postService = TestBed.inject(PostsService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should create a new post', (done: DoneFn) => {
    let newPost = {
      title: "New Post",
      body: "It's new post",
    } as Post;
    httpSpy.post.and.nextWith(newPost);
    postService.createPost(newPost).subscribe(
      post => {
        expect(post).toEqual(newPost);
        done();
      },
      done.fail
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should return an expected list of posts', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakePosts);
    postService.getAll().subscribe(
      posts => {
        expect(posts).toHaveSize(fakePosts.length);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return an expected post by id', (done: DoneFn) => {
    let postId = "1";
    let expectedPost = fakePosts.find(c => c._id == postId);
    httpSpy.get.and.nextWith(expectedPost);
    postService.getPost(postId).subscribe(
      post => {
        expect(post).toEqual(
          {
            _id: "1",
            title: "Fake post 1",
            body: "it is face post 1",
            comments: [
              {
                _id: "1",
                body: "comment 1"
              },
              {
                _id: "2",
                body: "comment 2"
              }
            ]
          }
        );
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should update a post with given post id', (done: DoneFn) => {
    let post = fakePosts[0];
    post.title = "Update title",
    post.body = "update body";
    httpSpy.put.and.nextWith(post);
    postService.updatePost(1, post).subscribe(
      post => {
        expect(post).toEqual(
          {
            _id: "1",
            title: "Update title",
            body: "update body",
            comments: [
              {
                _id: "1",
                body: "comment 1"
              },
              {
                _id: "2",
                body: "comment 2"
              }
            ]
          });
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete post with given post id', (done: DoneFn) => {
    let post = fakePosts[0];
    httpSpy.delete.and.nextWith(post);
    postService.deletePost(1).subscribe(
      post => {
        expect(post).toEqual(
          {
            _id: "1",
            title: "Fake post 1",
            body: "it is face post 1",
            comments: [
              {
                _id: "1",
                body: "comment 1"
              },
              {
                _id: "2",
                body: "comment 2"
              }
            ]
          }
          );
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(0);
  });

  it('should create a new comment', (done: DoneFn) => {
    let newComment = {
      body: "It's new comment",
    } as Post;
    httpSpy.post.and.nextWith(newComment);
    postService.createPost(newComment).subscribe(
      comment => {
        expect(comment).toEqual(newComment);
        done();
      },
      done.fail
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should edit a comment', (done: DoneFn) => {
    let post = fakePosts[0];
    let commentUpd =  {
      body: "update body"
    }
    httpSpy.put.and.nextWith(post);
    postService.editComment('1', 1, commentUpd).subscribe(
      post => {
        expect(post.comments[0]).toEqual(
          {
            _id: "1",
            body: "update body"
          }
          );
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  // it('should delete a comment by id', (done: DoneFn) => {
  //   let post = fakePosts[0];
  //   httpSpy.put.and.nextWith(post);
  //   postService.deleteComment(1, '1').subscribe(
  //     post => {
  //       expect(post).toEqual(
  //         {
  //           _id: "1",
  //           title: "Fake post 1",
  //           body: "it is face post 1",
  //           comments: [
  //             {
  //               _id: "1",
  //               body: "comment 1"
  //             },
  //             {
  //               _id: "2",
  //               body: "comment 2"
  //             }
  //           ]
  //         }
  //         );
  //       done();
  //     },
  //     done.fail
  //   );
  //   expect(httpSpy.put.calls.count()).toBe(0);
  // });
});
