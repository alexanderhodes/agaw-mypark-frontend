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

  constructor(
    private authService: AuthService,
    private router: Router) {
    this._dropdownOpened = false;

    this._subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('this.loggedIn before', this.loggedIn);
        this.loggedIn = this.authService.loggedIn;
        console.log('this.loggedIn', this.loggedIn);
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
      this.router.navigate(['login']);
    });
  }

  get dropdownOpened(): boolean {
    return this._dropdownOpened;
  }

}
