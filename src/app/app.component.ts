import { AuthService } from './shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mypark-frontend';
  private _loggedIn: boolean;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this._loggedIn = this.authService.loggedIn;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }



}
