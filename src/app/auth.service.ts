import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { RegisterUser } from './models/RegisterUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<RegisterUser>();
  constructor() { }

  // loginOld(email: string, password: string) {
  //   let loginCredentials = { email, password };
  //   console.log(loginCredentials);
  //   return of(loginCredentials);
  // }
  login(email: string, password: string) {
    let loginUser: RegisterUser = {
      email: email,
      fullName: email,
      password: password,
      repeatPassword: password
    }
    this.user$.next(loginUser);
    return of(loginUser);
  }

  logout() {
    // cleanup subject; remove suer from subject
    this.setUser(null);
    console.log('user has logged out successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  private setUser(user) {
    this.user$.next(user);
  }

  register(user: RegisterUser) {
    // make api call to save user in DB
    //update the user subject
    this.user$.next(user);
    console.log('Method register() -> registered user successfully', user);
    return of(user);
  }
}
