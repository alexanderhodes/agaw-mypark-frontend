import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private _loggedIn: boolean;

  constructor() {
    this._loggedIn = false;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

}
