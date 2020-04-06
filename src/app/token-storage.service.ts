import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'Trishapp.AuthToken';  
  constructor() { }

  setToken(token: string) {
    if(!token) {
      return;
    }

    this.removeToken();
    window.localStorage.setItem(this.TOKEN_KEY, token); 
  }

  getToken() {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    window.localStorage.removeItem(this.TOKEN_KEY);
  } 
}
