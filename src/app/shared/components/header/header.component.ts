import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'mp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _dropdownOpened: boolean;
  private _subscription: any;

  loggedIn: boolean;
  username: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this._dropdownOpened = false;

    this._subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedIn = this.authService.loggedIn;
        this.username = this.authService.username;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  openDropdown() {
    this._dropdownOpened = !this._dropdownOpened;
  }

  logout() {
    this.authService.logout().subscribe(result => {
      this.router.navigateByUrl('login');
    });
  }

  get dropdownOpened(): boolean {
    return this._dropdownOpened;
  }

}
