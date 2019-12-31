import { Authentication } from './../../models/mypark.models';
import { LOCALSTORAGE_KEY_TOKEN, LOCALSTORAGE_KEY_EXPIRATION, LOCALSTORAGE_KEY_USERNAME, LOCALSTORAGE_KEY_ROLES } from './../../config/mypark.config';
import { LocalStorageService } from './../local-storage.service';
import { MyparkApiService } from './../api/mypark-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private myparkApiService: MyparkApiService,
    private localStorageService: LocalStorageService) {
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const body = new FormData();
      body.append('username', username);
      body.append('password', password);
      this.myparkApiService.login(body).subscribe((auth: Authentication) => {
        console.log('auth', auth);
        if (auth && auth.token) {
          this.localStorageService.setItem(LOCALSTORAGE_KEY_TOKEN, auth.token);
          this.localStorageService.setItem(LOCALSTORAGE_KEY_EXPIRATION, `${auth.expiration}`);
          this.localStorageService.setItem(LOCALSTORAGE_KEY_USERNAME, auth.username);
          this.localStorageService.setItem(LOCALSTORAGE_KEY_ROLES, auth.roles.toString());
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.localStorageService.clear();
      observer.next(true);
      observer.complete();
    });
  }

  get loggedIn(): boolean {
    const expirationInMillis = this.localStorageService.getItem(LOCALSTORAGE_KEY_EXPIRATION);
    const token = this.localStorageService.getItem(LOCALSTORAGE_KEY_TOKEN);
    const username = this.localStorageService.getItem(LOCALSTORAGE_KEY_USERNAME);
    if (expirationInMillis && token && username) {
      const expirationDate = new Date(+expirationInMillis);
      return expirationDate > new Date();
    }
    return false;
  }

  get username(): string {
    return this.localStorageService.getItem(LOCALSTORAGE_KEY_USERNAME);
  }

  get isAdmin(): boolean {
    return this.roles.indexOf('ADMIN') > -1;
  }

  get roles(): string[] {
    return this.localStorageService.getItem(LOCALSTORAGE_KEY_ROLES) ?
      this.localStorageService.getItem(LOCALSTORAGE_KEY_ROLES).split(',') : [];
  }

}
