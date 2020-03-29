import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$ = new Subject<User>();
  constructor() { }

  login(email:string, password: string) {
    let loginCredentials = {email, password};
    console.log(loginCredentials);
    return of(loginCredentials);
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

  register(user: any){
    // make api call to save user in DB
    //update the user subject
    this.user$.next(user);
    console.log('Method register() -> registered user successfully', user);
    return of(user);
  }
}
