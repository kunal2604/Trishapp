import { Injectable } from '@angular/core';
import { of, Subject, throwError, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './models/User';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

interface UserDto {
  user: User;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  private apiURL = '/api/auth/';
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService  
  ) { }

  login(email: string, password: string) {
    let loginCredentials = { email, password };
    console.log(loginCredentials);
    return this.httpClient.post<UserDto>(`${this.apiURL}login`, loginCredentials)
      .pipe(
        switchMap(({user, token}) => {
          this.setUser(user);
          console.log('User found ', user);
          this.tokenStorage.setToken(token);
          return of(user);
        }),
        catchError(err => {
          console.log(`Your login details couldn't be verified.`, err)
          return throwError(`Your login details couldn't be verified.`);
        })
      );
  }


  logout() {
    this.tokenStorage.removeToken();
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

  register(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiURL}register`, userToSave).pipe
    (
      switchMap(({user, token}) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log('User registed UI side call', user);
        return of(user);
      }),
      catchError(err => {
        console.log('Server error occured ', err);
        return throwError('Registration failed. Please contact the administrator.') 
      })
    );
  }

  findme() {
    const token = this.tokenStorage.getToken();
    if(!token) {
      return EMPTY;
    }
    return this.httpClient.get<any>(`${this.apiURL}findme`).pipe(
      switchMap(({ user }) => {
        console.log('User found', user);
        return of(user);
      }),
      catchError(err => {
        console.log(`Your login details couldn't be verified`, err);
        return throwError(`Your login details couldn't be verified`);
      })
    );
  }
}
