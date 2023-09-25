import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all users via GET', () => {
    const dummyUsers = [
      {
        _id: '5f9d5f3b9d3f2b1b1c9b4b1b',
        name: 'John Doe',
        email: 'john.doe@example.com',
        picture_url: 'http://example.com/john.jpg',
        password: 'password123',
        admin: false,
        plant_id: [101, 102]
      },
      {
        _id: '5f9d5f3b9d3f2b1b1c9b4b1c',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        picture_url: 'http://example.com/john.jpg',
        password: 'password123',
        admin: false,
        plant_id: [101, 102]
      }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const request = httpMock.expectOne(service['apiUrl']);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });

  it('should retrieve a user by id via GET', () => {
    const dummyUser = {
      _id: '5f9d5f3b9d3f2b1b1c9b4b1b',
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture_url: 'http://example.com/john.jpg',
      password: 'password123',
      admin: false,
      plant_id: [101, 102]
    };

    service.getUserById('5f9d5f3b9d3f2b1b1c9b4b1b').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const request = httpMock.expectOne(`${service['apiUrl']}/5f9d5f3b9d3f2b1b1c9b4b1b`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUser);
  });

  it('should handle error on getUsers', () => {
    service.getUsers().subscribe(
      () => fail('Should have failed with 500 server error'),
      (error: Error) => {
        expect(error.message).toContain('Something bad happened');
      }
    );

    const request = httpMock.expectOne(service['apiUrl']);
    request.flush('500 error', { status: 500, statusText: 'Server error' });
  });
});
