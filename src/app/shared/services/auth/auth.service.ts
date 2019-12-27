import { Authentication } from './../../models/mypark.models';
import { LOCALSTORAGE_KEY_TOKEN, LOCALSTORAGE_KEY_EXPIRATION } from './../../config/mypark.config';
import { LocalStorageService } from './../local-storage.service';
import { MyparkApiService } from './../api/mypark-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _loggedIn: boolean;

  constructor(
    private myparkApiService: MyparkApiService,
    private localStorageService: LocalStorageService) {
    this._loggedIn = false;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.myparkApiService.login(username, password).subscribe((auth: Authentication) => {
        if (auth && auth.token) {
          this.localStorageService.setItem(LOCALSTORAGE_KEY_TOKEN, auth.token);
          this.localStorageService.setItem(LOCALSTORAGE_KEY_EXPIRATION, `${auth.expiration}`);
          this._loggedIn = true;
          observer.next(true);
        } else {
          this._loggedIn = false;
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.localStorageService.clear();
      this.loggedIn = false;
      observer.next(true);
      observer.complete();
    });
  }

}
