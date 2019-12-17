import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private _loggedIn: boolean;

  constructor(private httpClient: HttpClient) {
    this._loggedIn = false;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  login(user: string, password: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/api/authenticate?username=${user}&password=${password}`,
    { observe: "response" });
  }

}
