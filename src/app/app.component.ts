import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  private _subscription: any;

  constructor(private authService: AuthService, private router: Router) {
    this._subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedIn = this.authService.loggedIn;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
