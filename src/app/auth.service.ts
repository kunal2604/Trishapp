import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './models/User';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  private apiURL = '/api/auth/';
  constructor(private httpClient: HttpClient) { }

  // loginOld(email: string, password: string) {
  //   let loginCredentials = { email, password };
  //   console.log(loginCredentials);
  //   return of(loginCredentials);
  // }
  login(email: string, password: string) {
    let loginUser: User = {
      email: email,
      fullName: email,
      password: password,
      repeatPassword: password
    }
    this.user$.next(loginUser);
    return of(loginUser);
  }

  logout() {
    // cleanup subject; remove user from subject
    this.setUser(null);
    console.log('user has logged out successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  private setUser(user) {
    this.user$.next(user);
  }

  register(user: User) {
    return this.httpClient.post<User>(`${this.apiURL}register`, user).pipe
    (
        switchMap(savedUser => {
          this.setUser(savedUser);
          console.log('User registed UI side call', savedUser);
          return of(savedUser);
        }),
        catchError(err => {
          console.log('Server error occured ', err);
          return throwError('Registration failed. Please contact the administrator.') 
        })
    );
  }
}
