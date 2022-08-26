import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import User from '../models/user.model';
import { StoreModule } from '@ngrx/store';

import { UserService } from './users.service';

let fakeUsers: User[] = [
  {
    _id: "1",
    name: "Fake User",
    email: "fake@fake.com",
    password: "123456"
  },
  {
    _id: "2",
    name: "Fake User Two",
    email: "fake-two@fake.com",
    password: "123456"
  }
];

describe('UsersService', () => {
  let httpSpy: Spy<HttpClient>;
  let userService: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        UserService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    userService = TestBed.inject(UserService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should create a new user', (done: DoneFn) => {
    let newUser = {
      name: "New Customer",
      email: "new@customer.com",
      password: '123456'
    } as User;
    httpSpy.post.and.nextWith(newUser);
    userService.createNewUser(newUser).subscribe(
      user => {
        expect(user).toEqual(newUser);
        done();
      },
      done.fail
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should return an expected user by id', (done: DoneFn) => {
    
    let userId = "1";
    let expectedPost = fakeUsers.find(c => c._id == userId);

    httpSpy.get.and.nextWith(expectedPost);

    userService.getUser(userId).subscribe(
      post => {
        expect(post).toEqual(
          {
            _id: "1",
            name: "Fake User",
            email: "fake@fake.com",
            password: "123456"
          }
        );
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should update user with given user id', (done: DoneFn) => {
    let user = fakeUsers[0];
    user.name = "Updated User";
    httpSpy.put.and.nextWith(user);
    userService.updateUser("1", user).subscribe(
      user => {
        expect(user.name).toEqual("Updated User");
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should update password with given user id', (done: DoneFn) => {
    let user = fakeUsers[0];
    user.password = "qwerty";
    httpSpy.put.and.nextWith(user);
    userService.changePassword(1, "qwerty").subscribe(
      user => {
        expect(user.password).toEqual("qwerty");
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete user with given user id', (done: DoneFn) => {
    let user = fakeUsers[0];
    httpSpy.delete.and.nextWith(user);
    userService.deleteUser(1).subscribe(
      user => {
        expect(user).toEqual(
          {
            _id: "1",
            name: "Fake User",
            email: "fake@fake.com",
            password: "123456"
          }
          );
        done();
      },
      done.fail
    );
    expect(httpSpy.put.calls.count()).toBe(0);
  });
});


function asyncData(expectedUsers: User[]): import("rxjs").Observable<unknown> {
  throw new Error('Function not implemented.');
}

function asyncError(errorResponse: HttpErrorResponse): import("rxjs").Observable<unknown> {
  throw new Error('Function not implemented.');
}

